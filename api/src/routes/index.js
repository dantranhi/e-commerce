import productRouter from './product.js'
import authRouter from './auth.js'
import userRouter from './user.js'
import orderRouter from './order.js'
import promotionRouter from './promotion.js'
import profileRouter from './profile.js'

const router = (app) => {
    app.use('/product', productRouter)
    app.use('/auth', authRouter)
    app.use('/promotion', promotionRouter)
    app.use('/user', userRouter)
    app.use('/order', orderRouter)
    app.use('/profile', profileRouter)


    

    // app.get('/api/login/success', (req, res, next) => {
    //     if (req.session.user) {
    //         const token = jwt.sign({ id: req.session.user.id, username: req.session.user.username, isAdmin: req.session.user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '1h' })
    //         const { password, ...otherDetails } = req.session.user;
    //         res.cookie("access_token", token).json({ details: { ...otherDetails }, token: token })
    //     }
    //     else next()
    // }, verifyToken, (req, res) => {
    //     const { password, ...otherDetails } = req.user;
    //     res.json({ details: { ...otherDetails } })
    // })

    app.use('/:error', (req, res, next) => {
        res.send('404 NOT FOUND')
    })
}

export default router