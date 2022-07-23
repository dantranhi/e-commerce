import mongoose from 'mongoose';

const NotificationSchema = mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    type: { type: String, default: 'remind' },
    status: [
        {
            for: { type: String, required: true },
            isRead: { type: Boolean, default: false }
        }
    ],
    photo: { type: String },
    link: { type: String, required: true }
}, { timestamps: true })

export default mongoose.model('Notification', NotificationSchema)