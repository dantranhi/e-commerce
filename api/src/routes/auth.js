import express from 'express';
import passport from 'passport';

import AuthController from '../controllers/AuthController.js'
import { userValidator } from '../utils/dataValidator.js'


const router = express.Router();
// const CLIENT_URL = "https://ornate-pixie-d08df6.netlify.app/";
const CLIENT_URL = "http://localhost:3000";

// Login Google
router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email'],
}))

router.get('/google/callback', passport.authenticate('google', {
    successRedirect: CLIENT_URL,
    failureRedirect: "auth/login/failed",
}))

router.get('/facebook', passport.authenticate('facebook', { scope: 'email' }))

router.get('/facebook/callback', passport.authenticate('facebook', {
    successRedirect: CLIENT_URL,
    failureRedirect: "auth/login/failed",
}))

router.get("/login/success", (req, res) => {
    if (req.user) {
        res.status(200).json({
            success: true,
            message: "successfull",
            user: req.user,
            //   cookies: req.cookies
        });
    }
    else res.json({msg: 'NO USER'})
});

router.get("/login/failed", (req, res) => {
    res.status(401).json({
        success: false,
        message: "failure",
    });
});


router.post('/login', AuthController.login)
router.post('/register', ...userValidator, AuthController.register)
router.post('/logout', AuthController.logout)
router.get('/', AuthController.getAll)

export default router