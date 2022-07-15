import { validationResult } from 'express-validator'

import Order from '../models/Order.js'

class OrderController {
    // [POST] /order/:id/create
    async create(req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.json({ success: false, errors: errors.array() });
        }
        try {
            const order = new Order(req.body)
            await order.save()
            res.json({ success: true, message: 'Order created successfully', data: order})
        } catch (error) {
            next(error)
        }
    }

}

export default new OrderController()