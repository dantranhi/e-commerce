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

const port = process.env.PORT || 3006

const app = express()

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
}))
app.use(cookieParser())
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        maxAge: 4 * 3600 * 1000,
    },
}))
initializePassport(passport)
app.use(passport.session());
cloudinary.config({
    cloud_name: 'dauu0vpgc',
    api_key: '778177312327272',
    api_secret: 'IG_zmRjj8rJ7xTjo-cF1cAzSd7Q',
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