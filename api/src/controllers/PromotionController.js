import Promotion from '../models/Promotion.js'
import User from '../models/User.js'
import Notification from '../models/Notification.js'
import { validationResult } from 'express-validator'

import PromotionType from '../models/PromotionType.js'
import { createError } from '../utils/error.js'

class PromotionController {
    // [GET] /promotion
    async getAll(req, res, next) {
        try {
            const promotions = await Promotion.find()
            res.status(200).json({ success: true, data: promotions })
        } catch (e) {
            next(createError(500, 'Promotions not found'))
        }
    }

    // [GET] /promotion/:id
    async get(req, res, next) {
        try {
            const promotion = await Promotion.findById(req.params.id)
            res.status(200).json({ success: true, data: promotion })
        } catch (e) {
            next(createError(500, 'Promotions not found'))
        }
    }

    // [GET] /promotion/type
    async getAllTypes(req, res, next) {
        const types = await PromotionType.find()
        res.status(200).json(types)
    }

    // [GET] /promotion/periods/:id
    async getAllPeriodsWithoutSelf(req, res, next) {
        const promotions = await Promotion.find({ _id: { $ne: req.params.id } })
        const periods = promotions.map(p => p.startEndDate)
        res.status(200).json(periods)
    }

    // [GET] /promotion/periods
    async getAllPeriods(req, res, next) {
        const promotions = await Promotion.find()
        const periods = promotions.map(p => p.startEndDate)
        res.status(200).json(periods)
    }


    // [POST] /promotion/create
    async create(req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.json({ success: false, errors: errors.array() });
        }
        try {
            const isDuplicate = !!(await Promotion.findOne({ name: req.body.name }))
            if (isDuplicate) {
                return res.json({
                    success: false, errors: [{
                        "msg": "Promotion with this name is already existed",
                        "param": "name",
                        "value": req.body.name,
                        "location": "body",
                    }]
                })
            }
            const promotion = new Promotion(req.body)
            await promotion.save()

            const temp = await User.find()
            const users = temp.map(t=>({
                for: t._id,
                isRead: false
            }))
            const newNotification = new Notification({
                content: `A new promotion coming soon. Check out now!`,
                status: users,
                type: 'promotion',
                // photo: buyer.photos?.[0]?.url,
                link: '/promotion'
            })
            await newNotification.save()

            res.status(200).json({ success: true, message: 'Promotion created successfully' })
        } catch (e) {
            next(e)
        }
    }


    // [PUT] /promotion/:id
    async update(req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.json({ success: false, errors: errors.array() });
        }
        try {
            await Promotion.findByIdAndUpdate(req.params.id, req.body)
            res.json({ success: true, message: 'Promotion updated successfully' })
        } catch (error) {
            next(error)
        }
    }

    // [DELETE] /promotion/:id
    async delete(req, res, next) {
        try {
            await Promotion.findByIdAndDelete(req.params.id)
            res.json({ success: true, message: 'Promotion deleted successfully' })
        } catch (error) {
            next(error)
        }
    }
}

export default new PromotionController()
