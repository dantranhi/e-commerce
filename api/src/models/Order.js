import mongoose from 'mongoose'

const OrderSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    productList: [
        {
            productId: { type: String, required: true },
            quantity: { type: Number, required: true },
            currentPrice: { type: Number, required: true },
        }
    ],
    delivery: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    userAddress: { type: String, required: true },
    userPhone: { type: String, required: true },
    status: { type: String, default: 'Pending' }
}, { timestamps: true })

export default mongoose.model('Order', OrderSchema)