import { useState } from 'react'
import { Divider, Typography, Button, Popconfirm } from 'antd'
import { toast } from 'react-toastify'

import AnimatedLoading from '../../components/Icons/AnimatedLoading'
import Order from '../../components/Order'
import useFetch from '../../hooks/useFetch'
import formatCurrency from '../../utils/formatCurrency'
import formatDate from '../../utils/formatDate'
import httpRequest from '../../utils/httpRequest'

import classNames from 'classnames/bind';
import styles from './MyOrders.module.scss';

const { Title } = Typography
const cl = classNames.bind(styles);

function MyOrders() {
    const [cancelLoading, setCancelLoading] = useState([])
    const [profile, setProfile] = useState(JSON.parse(localStorage.getItem('user')) ?? null)
    const { data: myOrders, loading, reFetch } = useFetch(`/order/user/${profile.details._id}`)
    const { data: products, loading: productsLoading } = useFetch('/product')

    const handleCancelOrder = async (index, orderId) => {
        try {
            setCancelLoading(prev => {
                let newState = [...prev]
                newState[index] = true
                return newState
            })

            const res = await httpRequest.put(`/order/${profile.details._id}/${orderId}`, { status: 'Cancelled' })
            console.log(res)
            if (res.data.success) {
                toast.success(res.data.message)
                setCancelLoading(prev => {
                    let newState = [...prev]
                    newState[index] = false
                    return newState
                })
                reFetch()
            }


        } catch (error) {

        }

    }

    return (
        <div className={cl('wrapper')}>
            <div className="grid wide">
                <Title>My Orders</Title>
                {!loading && myOrders.map((orderList, index) => (
                    <Order key={orderList._id}>
                        <div className={cl('date')}>{formatDate(orderList.createdAt, 'DD-MM-YYYY')}</div>
                        <div className={cl('code')}>Order ID: {orderList._id}</div>
                        <Order.List>
                            {!productsLoading && orderList.productList.map(item => {
                                const thisProduct = products.find(p => p._id === item.productId)

                                return (
                                    <Order.Item key={item._id} data={{
                                        photos: thisProduct.photos,
                                        name: thisProduct.name,
                                        amount: item.quantity,
                                        price: item.currentPrice
                                    }}></Order.Item>
                                )
                            })}
                            <Divider />

                            <Order.Summary title='Vận chuyển'>{formatCurrency(orderList.delivery)}</Order.Summary>
                            <Divider />
                            <Order.Summary primary title='Tổng'>{formatCurrency(orderList.totalPrice)}</Order.Summary>
                            <div className={cl('status')}>Status: <span>{orderList.status}</span></div>
                            {orderList.status === 'Pending' &&
                                <Popconfirm
                                    title="Are you sure to cancel this order? This can not be undone"
                                    onConfirm={() => handleCancelOrder(index, orderList._id)}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <Button type="primary" loading={cancelLoading[index]}>
                                        Cancel this order
                                    </Button>
                                </Popconfirm>}


                            {index !== myOrders.length - 1 && <Divider>+++++</Divider>}
                        </Order.List>
                    </Order>
                ))}
                {loading && <div className="full center"><AnimatedLoading width='140px' height='140px' /></div>}
            </div>
        </div>
    )
}

export default MyOrders