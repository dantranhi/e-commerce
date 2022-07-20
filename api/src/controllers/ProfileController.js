import { validationResult } from 'express-validator'

import ProfileItem from '../models/ProfileItem.js'

class ProfileController {
    // [GET] /profile/:id
    async getAllProfileItems(req, res, next) {
        try {
            const profileItems = await ProfileItem.find({ userId: req.params.id })
            res.json({ success: true, data: profileItems })
        } catch (error) {
            next(error)
        }
    }


    // [GET] /profile/:id/:profileId
    async getProfileItem(req, res, next) {
        try {
            const profileItem = await ProfileItem.findOne({ userId: req.params.id, _id: req.params.profileId })
            res.json({ success: true, data: profileItem })
        } catch (error) {
            next(error)
        }
    }

    // [POST] /profile/:id
    async createProfileItem(req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.json({ errors: errors.array() });
        }
        try {
            const newProfileItem = new ProfileItem({...req.body, userId: req.params.id})
            await newProfileItem.save()
            res.json({ success: true, message: 'New profile added successfully' })
        } catch (error) {
            next(error)
        }
    }


    // [PUT] /profile/:id/:profileId
    async updateProfileItem(req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.json({ errors: errors.array() });
        }
        try {
            await ProfileItem.findByIdAndUpdate(req.params.profileId, req.body)
            res.json({ success: true, message: 'Profile updated successfully' })
        } catch (error) {
            next(error)
        }
    }

    // [DELETE] /profile/:id/:profileId
    async deleteProfileItem(req, res, next) {
        try {
            await ProfileItem.findByIdAndDelete(req.params.profileId)
            res.json({ success: true, message: 'Profile deleted successfully' })
        } catch (error) {
            next(error)
        }
    }
}

export default new ProfileController()