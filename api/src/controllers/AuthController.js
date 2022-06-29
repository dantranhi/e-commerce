import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import User from '../models/User.js'

class AuthController {
    // [POST] /auth/login
    async login(req, res, next) {
        try {
            const user = await User.findOne({ username: req.body.username })
            console.log(user)
            if (!user)
                return res.json({ msg: 'User not found' })
            const isCorrectPassword = await bcrypt.compare(req.body.password, user.password)
            if (!isCorrectPassword)
                return res.json({ msg: 'Password is incorrect' })

            const token = jwt.sign({ id: user._id, username: user.username, isAdmin: user.isAdmin }, process.env.JWT_SECRET)
            const { password, ...otherDetails } = user._doc;
            res.cookie("access_token", token, {
                httpOnly: true,
                maxAge: 3600 * 4 * 1000
            }).status(200).json({ details: { ...otherDetails }});
        }
        catch (err) {
            next(err)
        }
    }

    // [POST] /auth/register
    async register(req, res, next) {
        try {
            const hashedPassword = await bcrypt.hash(req.body.password, 10)
            const savedUser = new User({
                username: req.body.username,
                password: hashedPassword,
                email: req.body.email
            })
            await savedUser.save()
            res.json(savedUser)
        } catch (error) {
            next(error)
        }
    }

    // [POST] /auth/logout
    logout(req, res, next) {
        try {
            req.user = null
            res.clearCookie('access_token')
            res.json({})

        } catch (error) {
            res.json({ msg: 'Can not log out' })
        }
    }

    async getAll(req, res, next) {
        const users = await User.find()
        res.json(users)
    }


}

export default new AuthController();