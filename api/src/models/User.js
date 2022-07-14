import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    email: {
        type: String,
        // required: true
    },
    googleId: {
        type: String
    },
    facebookId: {
        type: String
    },
    image: { type: String },
    address: { type: String },
    point: { type: Number, default: 0 }
}, { timestamps: true })

export default mongoose.model('User', UserSchema);