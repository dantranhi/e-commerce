import mongoose from 'mongoose'

const PromotionSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    content: [
        {
            productId: { type: String, required: true },
            promotionPrice: { type: Number },
            freeAttachments: [String],
            discountValue: { type: Number }
        }
    ],
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
}, { timestamps: true })

export default mongoose.model('Promotion', PromotionSchema)