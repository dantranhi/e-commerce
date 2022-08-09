import mongoose from 'mongoose';

const WishlistSchema = mongoose.Schema({
    userId: {type: String, required: true},
    productId: {type: String, required: true},
}, {timestamps: true})

export default mongoose.model('Wishlist', WishlistSchema);