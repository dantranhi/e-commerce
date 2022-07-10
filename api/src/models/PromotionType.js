import mongoose from 'mongoose'

const PromotionTypeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

export default mongoose.model('PromotionType', PromotionTypeSchema)