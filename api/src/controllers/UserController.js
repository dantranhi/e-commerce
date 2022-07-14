import User from '../models/User.js'

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
        console.log(req.body.isAdmin)
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
}

export default new UserController()