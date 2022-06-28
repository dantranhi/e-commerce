import express from 'express';
import passport from 'passport';

import AuthController from '../controllers/AuthController.js'
const CLIENT_URL = 'http://localhost:3000'


const router = express.Router();

router.post('/login', AuthController.login)
router.post('/register', AuthController.register)

router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email'],
}))
router.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
    // return res.redirect('/')
    // req.flash('success','Đăng nhập thành công'); 
    res.redirect(CLIENT_URL)
});

router.post('/logout', AuthController.logout)
router.get('/', AuthController.getAll)

export default router