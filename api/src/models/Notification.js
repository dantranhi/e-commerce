import mongoose from 'mongoose';

const NotificationSchema = mongoose.Schema({
    isRead: { type: Boolean, default: false },
    content: {
        type: String,
        required: true
    },
    type: { type: String, default: 'remind' }, // remind, product, order
    for: { type: String, required: true }, // for: Admin, user, designate user
    photo: { type: String }
}, { timestamps: true })

export default mongoose.model('Notification', NotificationSchema)