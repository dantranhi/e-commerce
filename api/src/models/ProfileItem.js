import mongoose from 'mongoose'

const ProfileItemSchema = mongoose.Schema({
    name: { type: String, default: 'New Profile' },
    userId: { type: String, required: true },
    fullName: { type: String, required: true },
    userAddress: { type: String, required: true },
    userPhone: { type: String, required: true }
})

export default mongoose.model('ProfileItem', ProfileItemSchema)