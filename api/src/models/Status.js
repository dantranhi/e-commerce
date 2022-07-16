import mongoose from 'mongoose'

const StatusSchema = mongoose.Schema({
    name: { type: String, required: true }
})

export default mongoose.model('Status', StatusSchema)