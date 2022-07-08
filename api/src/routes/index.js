import passport from 'passport';
import jwt from 'jsonwebtoken'

import productRouter from './product.js'
import authRouter from './auth.js'
import { verifyToken } from '../utils/verifyToken.js';

const CLIENT_URL = 'http://localhost:3000'

const router = (app) => {
    app.use('/api/product', productRouter)
    app.use('/api/auth', authRouter)


    // Login Google
    app.get('/google', passport.authenticate('google', {
        scope: ['profile', 'email'],
    }))
    app.get('/auth/google/callback', passport.authenticate('google'), async (req, res, next) => {
        try {
            console.log(req.user)
            req.session.user = req.user
            res.redirect(CLIENT_URL)
        }
        catch (err) {

        }
    })
    // Login Facebook
    app.get('/facebook', passport.authenticate('facebook', {
        scope: 'email',
    }))
    app.get('/auth/facebook/callback', passport.authenticate('facebook'), async (req, res, next) => {
        try {
            req.session.user = req.user
            res.redirect(CLIENT_URL)
        }
        catch (err) {

        }
    })

    app.get('/api/login/success', (req, res, next) => {
        if (req.session.user) {
            const token = jwt.sign({ id: req.session.user.id, username: req.session.user.username, isAdmin: req.session.user.isAdmin }, process.env.JWT_SECRET)
            const { password, ...otherDetails } = req.session.user;
            res.cookie("access_token", token, {
                httpOnly: true,
                maxAge: 3600 * 4 * 1000
                // maxAge: 60 * 1000
            }).json({ details: { ...otherDetails } })
        }
        else next()
    }, verifyToken, (req, res) => {
        const { password, ...otherDetails } = req.user;
        res.json({ details: { ...otherDetails } })
    })

    app.use('/:error', (req, res, next) => {
        res.send('404 NOT FOUND')
    })
}

export default router