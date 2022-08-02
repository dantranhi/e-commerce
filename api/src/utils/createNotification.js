import User from '../models/User.js'
import Notification from '../models/Notification.js'

/*
    Order: 1. Order creation (for admin)
            2. Order confirmation (for user who buy)
            3. Order diliverd (for admin, user who buy)
    Product: 1. Product creation (for admin)
            2. Product out of stock (for admin)
    Promotion: 1. Promotion creation (for all)
            2. Promotion start (for all)
            2. Promotion end (for all)

*/

async function getAllUserId(){
    const users = await User.find()
    const userIds = users.map(u=>({
        for: u._id,
        isRead: false
    }))
    return userIds
}

/**
 * 
 * @param {Order} order order object recently created
 */
async function orderCreation(order) {
    const orderCreation = new Notification({
        content: `User ${order.fullName} has created an order. Check it out!`,
        status: [
            { for: 'Admin' }
        ],
        type: 'order',
        link: `/admin/order`
    })
    await orderCreation.save()
}


/**
 * 
 * @param {Order} order order object recently confirmed
 */
async function orderConfirmation(order) {
    const orderConfirmation = new Notification({
        content: `Your order has been confirmed!`,
        status: [
            { for: order.userId }
        ],
        type: 'order',
        link: `/order/my-orders`
    })
    await orderConfirmation.save()
}

/**
 * 
 * @param {Order} order order that has been deliverd
 */
async function orderDeliverd(order) {
    const orderDeliverd = new Notification({
        content: `Your order has been delivered! May you take some time to rate the products!`,
        status: [
            { for: order.userId }
        ],
        type: 'order',
        link: `/order/my-orders`
    })
    await orderDeliverd.save()
}


/**
 * 
 * @param {Product} order Product model
 */
async function productCreation(product) {
    const productCreation = new Notification({
        content: `You have recently added a new product: ${product.name} !`,
        status: [
            { for: 'Admin' }
        ],
        type: 'product',
        link: `/admin/product`
    })
    await productCreation.save()
}

/**
 * 
 * @param {Promotion} promotion Promotion model
 */
async function promotionCreation(promotion) {
    const promotionCreation = new Notification({
        content: `You have recently added a new promotion event: ${promotion.name} !`,
        status: [
            { for: 'Admin' }
        ],
        type: 'promotion',
        link: `/admin/promotion`
    })
    await promotionCreation.save()
}

/**
 * 
 * @param {Promotion} promotion Promotion model
 */
async function promotionPublication(promotion) {
    const userIds = getAllUserId()
    const promotionPublication = new Notification({
        content: `A new promotion event upcoming: ${promotion.name}. Check out!`,
        status: userIds,
        type: 'promotion',
        link: `/promotion`
    })
    await promotionPublication.save()
}

/**
 * 
 * @param {Promotion} promotion Promotion model
 */
 async function promotionStart(promotion) {
    const userIds = getAllUserId()
    const promotionStart = new Notification({
        content: `A sale promotion started!. Buy now!`,
        status: userIds,
        type: 'promotion',
        link: `/promotion`
    })
    await promotionStart.save()
}

export { orderCreation, orderConfirmation, orderDeliverd, productCreation, promotionCreation, promotionPublication, promotionStart }