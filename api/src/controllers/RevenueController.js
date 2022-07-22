import Order from '../models/Order.js'
import moment from 'moment'

class RevenueController {
    // [GET] /revenue? type=_ &brand=? &time=_ (default: all-time, option: 24h, 1w, 1M, 1Q, 1y, 2y,...)
    async getRevenue(req, res, next) {
        try {
            const timeUnit = req.query.time.slice(req.query.time.length - 1)
            const timeNumber = req.query.time.slice(0, req.query.time.length - 1)
            const filter = {}
            if (req.query?.type) filter.type = req.query?.type
            if (req.query?.brand) filter.brand = req.query?.brand
            const orders = await Order.find({
                createdAt: { $gte: moment().subtract(timeNumber, timeUnit) }, productList: {
                    $elemMatch: {
                        ...filter
                    }
                }
            })

            const filteredOrders = orders.map(order => {
                let newOrder = {
                    ...order._doc,
                    productList: [...order._doc.productList].filter(p => (filter?.type ? p.type === filter.type : true) && (filter?.brand ? p.brand === filter.brand : true))
                }
                newOrder.filterTotal = newOrder.productList.reduce((accumulator, item, index) => {
                    return accumulator += item.currentPrice * item.quantity
                }, 0)
                return newOrder
            })
            res.json({ success: true, data: filteredOrders })
        } catch (error) {
            next(error)
        }
    }
}

export default new RevenueController()