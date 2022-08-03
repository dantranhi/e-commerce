import { validationResult } from 'express-validator'

import Order from '../models/Order.js'
import Product from '../models/Product.js'
import ProfileItem from '../models/ProfileItem.js'
import Status from '../models/Status.js'
import { orderCreation } from '../utils/createNotification.js'

class OrderController {
    // [POST] /order/:id/create
    async create(req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.json({ success: false, errors: errors.array() });
        }
        try {
            const order = new Order(req.body)
            const tgifts = req.body.productList.map(a=>a.gifts).flat()
            const gifts = tgifts.map(g=>({
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
            await Order.findByIdAndUpdate(req.params.id, req.body)
            // if (req.body.status === 'Confirmed') {
            //     const order = await Order.findById(req.params.id)
            //     order.productList.forEach(async (p) => {
            //         await Product.updateOne({_id: p.productId}, {stock: })
                    
            //     })
            // }
            res.json({ success: true, message: 'Order status updated successfully' })
        } catch (error) {
            next(error)
        }
    }

    // [PUT] /order/:id
    async cancelOrder(req, res, next) {
        try {
            await Order.findByIdAndUpdate(req.params.orderId, req.body)
            res.json({ success: true, message: 'Order cancelled successfully' })
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
}

export default new OrderController()