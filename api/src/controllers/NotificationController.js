import Notification from '../models/Notification.js'
import User from '../models/User.js'


class NotificationController {

    // [GET] /notification/:id
    async getNotification(req, res, next) {
        try {
            const user = await User.findById(req.params.id)
            const notifications = await Notification.find({
                $or: [{ for: user.isAdmin ? 'Admin' : user._id }, { for: 'User' }]
            })
            res.json({ success: true, data: notifications })
        } catch (error) {
            next(error)
        }
    }

    // [PATCH] /notification/:id/:notificationId
    async updateStatus(req, res, next) {
        try {
            const user = await User.findById(req.params.id)
            const notification = await Notification.findById(req.params.notificationId)
            if ((user.isAdmin && notification.for === 'Admin') || (!user.isAdmin && notification.for !== 'Admin')) {
                await Notification.findByIdAndUpdate(req.params.notificationId, { isRead: true })
                res.json({ success: true, message: 'Readed' })
            }
            else res.json({ success: false, message: 'Something went wrong!' })
        } catch (error) {
            next(error)
        }
    }
}

export default new NotificationController()
