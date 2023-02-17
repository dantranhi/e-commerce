import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser'
import passport from 'passport'
import session from 'express-session'
import cloudinary from 'cloudinary'

import initializePassport from './configs/passport.js'
import router from './routes/index.js'

const __dirname = process.cwd();

import path from 'path'
const port = process.env.PORT || 3006

const app = express()

// Middleware
// console.log(path.resolve(__dirname, '/files'))
app.use(express.static(path.resolve('./files')))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE,PATCH",
    credentials: true,
}))
app.use(cookieParser())
app.set("trust proxy", 1);
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: false,
    cookie: {
        sameSite: "none",
        secure: true,
        // domain: "https://ornate-pixie-d08df6.netlify.app",
        httpOnly: true,
        maxAge: 4 * 3600 * 1000,
    }
    // cookie: {
    //     secure: false,
    //     maxAge: 4 * 3600 * 1000,
    // },
}))
initializePassport(passport)
app.use(passport.session());
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
    secure: true
});

mongoose.connect(process.env.MONGO, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('DB connected')
});


router(app)
app.use((err, req, res, next) => {
    const errStatus = err.status || 500
    const errMessage = err.message
    res.status(errStatus).json({
        success: false,
        status: errStatus,
        message: errMessage,
        stack: err.stack,
    })
})
app.listen(port, function () { console.log('listening on port ' + port) })