import express from 'express';

import OrderController from '../controllers/OrderController.js'
import { verifyUser, verifyAdmin } from '../utils/verifyToken.js'
import { orderValidator } from '../utils/dataValidator.js';

const router = express.Router();

router.get('/user/:id', OrderController.getUserOrders)
router.post('/:id/create', ...orderValidator, OrderController.create)
router.put('/:id/:orderId', verifyUser, OrderController.cancelOrder)
router.patch('/:id', verifyAdmin, OrderController.updateStatus)
router.patch('/:id/cancel', verifyAdmin, OrderController.cancelOrder)
router.patch('/:id/user-cancel', verifyUser, OrderController.cancelOrder)
router.delete('/:id', verifyAdmin, OrderController.delete)
router.get('/status', OrderController.getAllStatus)


router.post('/create_payment_url', OrderController.createPaymentUrl);
router.get('/vnpay_ipn', OrderController.vnpayIpn);
router.get('/vnpay_return', OrderController.vnpayReturn);

// router.get('/vnpay_ipn', function (req, res, next) {
//     var vnp_Params = req.query;
//     var secureHash = vnp_Params['vnp_SecureHash'];

//     delete vnp_Params['vnp_SecureHash'];
//     delete vnp_Params['vnp_SecureHashType'];

//     vnp_Params = sortObject(vnp_Params);
//     var config = require('config');
//     var secretKey = config.get('vnp_HashSecret');
//     var querystring = require('qs');
//     var signData = querystring.stringify(vnp_Params, { encode: false });
//     var crypto = require("crypto");     
//     var hmac = crypto.createHmac("sha512", secretKey);
//     var signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");     
     

//     if(secureHash === signed){
//         var orderId = vnp_Params['vnp_TxnRef'];
//         var rspCode = vnp_Params['vnp_ResponseCode'];
//         //Kiem tra du lieu co hop le khong, cap nhat trang thai don hang va gui ket qua cho VNPAY theo dinh dang duoi
//         res.status(200).json({RspCode: '00', Message: 'success'})
//     }
//     else {
//         res.status(200).json({RspCode: '97', Message: 'Fail checksum'})
//     }
// });

// function sortObject(obj) {
// 	var sorted = {};
// 	var str = [];
// 	var key;
// 	for (key in obj){
// 		if (obj.hasOwnProperty(key)) {
// 		str.push(encodeURIComponent(key));
// 		}
// 	}
// 	str.sort();
//     for (key = 0; key < str.length; key++) {
//         sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
//     }
//     return sorted;
// }
router.get('/', OrderController.getAll)



export default router