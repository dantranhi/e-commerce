import mongoose from 'mongoose';

const BrandSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

export default mongoose.model('Brand', BrandSchema)