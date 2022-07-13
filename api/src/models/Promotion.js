import mongoose from 'mongoose'

const PromotionSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    content: [
        {
            productId: { type: String, required: true },
            promotionType: { type: String, required: true },
            promotionValue: { type: Number },
            relateProductId: [String]
        }
    ],
    comeWithOtherPromotion: { type: Boolean, required: true },
    startEndDate: [{
        type: Date
    }]
}, { timestamps: true })

export default mongoose.model('Promotion', PromotionSchema)