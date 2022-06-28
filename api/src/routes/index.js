import productRouter from './product.js'
import authRouter from './auth.js'

const router = (app) => {
    app.use('/api/product', productRouter)
    app.use('/api/auth', authRouter)

    app.use('/:error', (req, res, next) => {
        res.send('404 NOT FOUND')
    })
}

export default router