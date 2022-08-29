import { validationResult } from 'express-validator'
import { vnpay } from '../configs/vnpay.js'
import moment from 'moment'
import querystring from 'qs'
import crypto from 'crypto'

import Order from '../models/Order.js'
import Product from '../models/Product.js'
import ProfileItem from '../models/ProfileItem.js'
import Status from '../models/Status.js'
import { orderCreation } from '../utils/createNotification.js'
import sortObject from '../utils/sortObject.js'


// Delete an order after a while not being paid
async function destroyZombieOrder(transactionId){
    await Order.findOneAndDelete({transactionId: transactionId})
}

class OrderController {
    // [POST] /order/:id/create
    async create(req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.json({ success: false, errors: errors.array() });
        }
        try {
            const order = new Order(req.body)
            const tgifts = req.body.productList.map(a => a.gifts).flat()
            const gifts = tgifts.map(g => ({
                productId: g.giftId,
                quantity: g.amount,
                currentPrice: 0
            }))
            order.productList.push(...gifts)
            await order.save()

            // Notification
            orderCreation(order)

            const isExistedProfile = await ProfileItem.findOne({
                fullName: req.body.fullName,
                userAddress: req.body.userAddress,
                userPhone: req.body.userPhone
            })
            if (!isExistedProfile) {
                const newProfile = new ProfileItem({
                    userId: req.params.id,
                    fullName: req.body.fullName,
                    userAddress: req.body.userAddress,
                    userPhone: req.body.userPhone
                })
                await newProfile.save()
            }
            res.json({ success: true, message: 'Order created successfully', data: order })
        } catch (error) {
            next(error)
        }
    }


    // [GET] /order
    async getAll(req, res, next) {
        try {
            const orders = await Order.find().sort({ createdAt: 'desc' })
            res.json({ success: true, data: orders })
        } catch (error) {
            next(error)
        }
    }

    // [GET] /order/user/:id
    async getUserOrders(req, res, next) {
        try {
            const orders = await Order.find({ userId: req.params.id }).sort({ createdAt: 'desc' })
            res.json({ success: true, data: orders })
        } catch (error) {
            next(error)
        }
    }

    // [GET] /order/status
    async getAllStatus(req, res, next) {
        try {
            const status = await Status.find()
            res.json({ success: true, data: status })
        } catch (error) {
            next(error)
        }
    }

    // [PATCH] /order/:id
    async updateStatus(req, res, next) {
        try {
            const order = await Order.findById(req.params.id)
            switch (order.status) {
                case 'Pending':
                    let isValidOrder = true
                    for (let i = 0; i < order.productList.length; i++) {
                        const product = await Product.findById(order.productList[i].productId)
                        if (product.stock < order.productList[i].quantity) {
                            isValidOrder = false
                            break
                        }
                    }
                    if (isValidOrder) {
                        await Order.findByIdAndUpdate(req.params.id, { status: 'Confirmed' })
                        for (let i = 0; i < order.productList.length; i++) {
                            const product = await Product.findById(order.productList[i].productId)
                            product.stock = product.stock - order.productList[i].quantity
                            await product.save()
                        }
                        return res.json({ success: true, message: 'Order status changed to Confirmed' })
                    }
                    return res.json({ success: false, message: 'Some item are out of stock!' })
                case 'Confirmed':
                    order.status='Delivering'
                    await order.save()
                    // await Order.findByIdAndUpdate(req.params.id, { status: 'Delivering' })
                    return res.json({ success: true, message: 'Order status changed to Delivering' })
                case 'Confirmed':
                    await Order.findByIdAndUpdate(req.params.id, { status: 'Delivering' })
                    return res.json({ success: true, message: 'Order status changed to Delivering' })
                case 'Paid':
                    await Order.findByIdAndUpdate(req.params.id, { status: 'Paid & Delivering' })
                    return res.json({ success: true, message: 'Order status changed to Paid & Delivering' })
                case 'Paid & Delivering':
                    await Order.findByIdAndUpdate(req.params.id, { status: 'Paid & Delivered' })
                    return res.json({ success: true, message: 'Order status changed to Paid & Delivered' })
                case 'Delivering':
                    await Order.findByIdAndUpdate(req.params.id, { status: 'Delivered' })
                    return res.json({ success: true, message: 'Order status changed to Delivered' })
            }

        } catch (error) {
            next(error)
        }
    }

    // [PATCH] /order/:id/cancel
    async cancelOrder(req, res, next) {
        try {
            const order = await Order.findById(req.params.id)
            if (order.status !== 'Pending') {
                for (let i = 0; i < order.productList.length; i++) {
                    const product = await Product.findById(order.productList[i].productId)
                    product.stock = product.stock + order.productList[i].quantity
                    await product.save()
                }
            }
            order.status = 'Cancelled'
            await order.save()
            res.json({ success: true, message: 'Order cancelled' })
        } catch (error) {
            next(error)
        }
    }


    // [DELETE] /order/:id
    async delete(req, res, next) {
        try {
            await Order.findByIdAndDelete(req.params.id)
            res.json({ success: true, message: 'Order deleted successfully' })
        } catch (error) {
            next(error)
        }
    }

    

    // [POST] /order/create_payment_url
    async createPaymentUrl(req, res, next) {
        var ipAddr = req.headers['x-forwarded-for'] || req.socket.remoteAddress

        var tmnCode = vnpay.vnp_TmnCode;
        var secretKey = vnpay.vnp_HashSecret;
        var vnpUrl = vnpay.vnp_Url;
        var returnUrl = vnpay.vnp_ReturnUrl;

        var createDate = moment().format('YYYYMMDDHHmmss')
        var orderId = moment().format('HHmmss')
        var amount = req.body.amount;
        var bankCode = req.body.bankCode;

        var orderInfo = req.body.orderDescription;
        var orderType = req.body.orderType;
        var locale = req.body.language;
        if (locale === null || locale === '') {
            locale = 'vn';
        }
        var currCode = 'VND';
        var vnp_Params = {};
        vnp_Params['vnp_Version'] = '2.1.0';
        vnp_Params['vnp_Command'] = 'pay';
        vnp_Params['vnp_TmnCode'] = tmnCode;
        // vnp_Params['vnp_Merchant'] = ''
        vnp_Params['vnp_Locale'] = locale;
        vnp_Params['vnp_CurrCode'] = currCode;
        vnp_Params['vnp_TxnRef'] = orderId;
        vnp_Params['vnp_OrderInfo'] = orderInfo;
        vnp_Params['vnp_OrderType'] = orderType;
        vnp_Params['vnp_Amount'] = amount * 100;
        vnp_Params['vnp_ReturnUrl'] = returnUrl;
        vnp_Params['vnp_IpAddr'] = ipAddr;
        vnp_Params['vnp_CreateDate'] = createDate;
        if (bankCode !== null && bankCode !== '') {
            vnp_Params['vnp_BankCode'] = bankCode;
        }

        vnp_Params = sortObject(vnp_Params);

        var signData = querystring.stringify(vnp_Params, { encode: false });
        var hmac = crypto.createHmac("sha512", secretKey);
        var signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");
        vnp_Params['vnp_SecureHash'] = signed;
        vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });

        const newOrder = new Order({ ...req.body, transactionId: orderId })
        await newOrder.save()

        setTimeout(()=>{
            destroyZombieOrder(orderId)
        }, 15*60000)


        res.json({ success: true, url: vnpUrl })
        // res.redirect(vnpUrl);
        // res.json({ success: true, message: 'Order created successfully', data: order })
    }

    // [GET] /order/vnpay_ipn
    async vnpayIpn(req, res, next) {
        var vnp_Params = req.query;
        var secureHash = vnp_Params['vnp_SecureHash'];

        delete vnp_Params['vnp_SecureHash'];
        delete vnp_Params['vnp_SecureHashType'];

        vnp_Params = sortObject(vnp_Params);
        var secretKey = vnpay.vnp_HashSecret;
        var signData = querystring.stringify(vnp_Params, { encode: false });
        var hmac = crypto.createHmac("sha512", secretKey);
        var signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");


        if (secureHash === signed) {
            var orderId = vnp_Params['vnp_TxnRef'];
            var rspCode = vnp_Params['vnp_ResponseCode'];
            //Kiem tra du lieu co hop le khong, cap nhat trang thai don hang va gui ket qua cho VNPAY theo dinh dang duoi
            const order = await Order.findOne({transactionId: orderId})
            if (!order) return res.json({success: false, message: 'Order not exist'})
            if (rspCode!=='00') return res.json({success: false, message: 'Transaction failed'})
            order.vnpayTransctionId = req.query.vnp_TransactionNo
            order.status='Paid'
            await order.save()
            res.status(200).json({ success: true, RspCode: '00', message: 'success', order: order })
        }
        else {
            res.status(200).json({ RspCode: '97', Message: 'Fail checksum' })
        }
    }

    // [GET] /order/vnpay_return
    vnpayReturn(req, res, next) {
        var vnp_Params = req.query;

        var secureHash = vnp_Params['vnp_SecureHash'];

        delete vnp_Params['vnp_SecureHash'];
        delete vnp_Params['vnp_SecureHashType'];

        vnp_Params = sortObject(vnp_Params);

        var tmnCode = vnpay.vnp_TmnCode;
        var secretKey = vnpay.vnp_HashSecret;

        var signData = querystring.stringify(vnp_Params, { encode: false });
        var hmac = crypto.createHmac("sha512", secretKey);
        var signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");

        if (secureHash === signed) {
            //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua
            res.json({ success: true, code: vnp_Params['vnp_ResponseCode'], data: req.query })
        } else {
            res.json({ success: true, code: '97' })
        }
    }


}

export default new OrderController()