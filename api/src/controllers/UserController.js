import User from '../models/User.js'
import Wishlist from '../models/Wishlist.js'
import Product from '../models/Product.js'

class UserController {
    // [GET] /user
    async getAll(req, res, next) {
        try {
            const users = await User.find()
            return res.json({
                success: true, data: users.map(item => {
                    const { password, createdAt, updatedAt, ...otherData } = item
                    return otherData._doc
                })
            })
        } catch (error) {
            next(error)
        }
    }

    // [PATCH] /user/:id
    async editRole(req, res, next) {
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: { isAdmin: req.body.isAdmin } })
            res.json({ success: true, message: "User's role changed successfully", updatedUser })
        } catch (error) {
            next(error)
        }
    }

    // [DELETE] /user/:id
    async delete(req, res, next) {
        try {
            const updatedUser = await User.findByIdAndDelete(req.params.id)
            res.json({ success: true, message: "User deleted successfully" })
        } catch (error) {
            next(error)
        }
    }

    // [POST] /user/:id/add-to-wishlist
    async addToWishlist(req, res, next) {
        try {
            const isAlreadyInWishlist = await Wishlist.findOne({ userId: req.params.id, productId: req.body.productId })
            if (!!isAlreadyInWishlist) {
                await Wishlist.findByIdAndRemove(isAlreadyInWishlist._id)
                return res.json({ success: true, message: "Product removed from wishlist successfully" })
            }
            const newWishlistItem = new Wishlist({
                productId: req.body.productId,
                userId: req.params.id
            })
            await newWishlistItem.save()
            return res.json({ success: true, message: 'Product added to wishlist successfully' })

        } catch (error) {
            next(error)
        }
    }

    // [GET] /user/:id/wishlist
    async getWishlist(req, res, next) {
        try {
            const wishlist = await Wishlist.find({ userId: req.params.id })
            const wishlistIds = wishlist.map(w => w.productId)
            const products = await Product.find({ _id: { $in: wishlistIds } })
            res.json({ success: true, data: products })
        } catch (error) {
            next(error)
        }
    }

    // [DELETE] /user/:id/wishlist/:productId
    async removeWishlist(req, res, next) {
        try {
            await Wishlist.findOneAndDelete({productId: req.params.productId})
            res.json({ success: true, message: 'Item removed from wishlist successfully' })
        } catch (error) {
            next(error)
        }
    }
}

export default new UserController()