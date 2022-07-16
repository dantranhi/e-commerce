import { validationResult } from 'express-validator'

import Order from '../models/Order.js'
import Status from '../models/Status.js'

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
            res.json({ success: true, message: 'Order created successfully', data: order })
        } catch (error) {
            next(error)
        }
    }


    // [GET] /order
    async getAll(req, res, next) {
        try {
            const orders = await Order.find()
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

    // [PUT] /order/:id
    async updateStatus(req, res, next) {
        try {
            await Order.findByIdAndUpdate(req.params.id, req.body)
            res.json({ success: true, message: 'Order status updated successfully' })
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