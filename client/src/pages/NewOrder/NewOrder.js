import { useState, useEffect } from 'react'
import { Typography, Divider, Input, Space, Button, Select } from 'antd'
import classNames from 'classnames/bind';
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faPlus } from '@fortawesome/free-solid-svg-icons'

import useFetch from '../../hooks/useFetch'
import ValidateMessage from '../../components/ValidateMessage'
import httpRequest from '../../utils/httpRequest'
import Cart from '../../components/Cart'
import { useStore } from '../../store/UserContext'
import { deleteCart } from '../../store/actions'
import Order from '../../components/Order'
import formatCurrency from '../../utils/formatCurrency'
import styles from './NewOrder.module.scss';
const cl = classNames.bind(styles);

const { Title } = Typography
const { Option } = Select

function NewOrder() {
    const navigate = useNavigate()
    const params = useParams()

    const [profile, setProfile] = useState(JSON.parse(localStorage.getItem('user')) ?? null)
    const [showCart, setShowCart] = useState(false)
    const [errors, setErrors] = useState([])
    const [isShowPayMethod, setIsShowPayMethod] = useState(false)

    const [total, setTotal] = useState({
        temp: 0,
        delivery: 0,
        totalPrice: 0
    })

    const [info, setInfo] = useState({
        userAddress: '',
        userPhone: '',
        fullName: '',
        payMethod: 'Cash on delivery (COD)'
    })

    const [{ cart: { data } }, dispatch] = useStore()

    const { data: allProfiles } = useFetch(`/profile/${params.id}`, params.id !== 'undefined' && params.id === profile.details._id)

    useEffect(() => {
        if (!profile) {
            navigate('/login')
            return
        }
        if (params.id !== profile.details._id) {
            navigate('/ERROR')
            return
        }
        if (data.length === 0) {
            navigate('/')
            toast.info('Your cart is empty!')
            return
        }
    }, [])

    useEffect(() => {
        let newTemp = data.reduce((accumulate, item) => {
            return accumulate + item.price * item.amount
        }, 0)
        let delivery = (newTemp >= 500000 || info.payMethod !== 'Cash on delivery (COD)') ? 0 : 30000
        let sum = newTemp + delivery
        setTotal({
            temp: newTemp,
            delivery: delivery,
            totalPrice: sum
        })
    }, [data, info.payMethod])

    const handleChangeForm = ({ name, value }) => {
        setInfo(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleChangeProfile = (profile) => {
        const { _id, name, userId, ...obj } = JSON.parse(profile)
        setInfo({ ...obj, payMethod: 'Cash on delivery (COD)' })
    }

    const handleChangePaymentMethod = (method) => {
        setInfo(prev => ({
            ...prev,
            payMethod: method
        }))
        setIsShowPayMethod(false)
    }

    const handleOpenCart = () => {
        setShowCart(prev => !prev)
    }

    const handleSubmitOrder = async (e) => {
        e.preventDefault()
        try {
            let allData = {
                userId: profile.details._id,
                ...info,
                productList: data.map(item => ({
                    productId: item._id,
                    type: item.type,
                    brand: item.brand,
                    quantity: item.amount,
                    currentPrice: item.price,
                    gifts: item.gifts.map(i => ({
                        ...i,
                        amount: item.amount
                    }))
                })),
                ...total
            }
            console.log(allData)

            if (allData.payMethod === 'E-Wallet') {
                const res = await httpRequest.post(`/order/create_payment_url`, {
                    ...allData,
                    amount: 10000,
                    bankCode: 'NCB',
                    orderDescription: 'fdasfasfdasfsafasfdsa',
                    orderType: 'billpayment',
                    language: 'vn'
                })
                if (res.data.success) {
                    console.log(res.data)
                    window.open(res.data.url, '_self')
                }
            }
            // else {
            //     const res = await httpRequest.post(`/order/${profile.details._id}/create`, allData)
            //     if (res.data.success) {
            //         toast.success(res.data.message)
            //         dispatch(deleteCart())
            //         navigate('/')
            //     }
            //     if (res.data.errors) {
            //         setErrors(res.data.errors)
            //     }
            // }
        } catch (error) {

        }
    }

    return (
        <div className={cl('wrapper')}>
            <div className="grid wide">
                <Title style={{ paddingInline: '1rem' }}>Thanh toán đơn hàng</Title>
                <div className="row">
                    <div className="col l-6 m-12 c-12">
                        <form onSubmit={handleSubmitOrder} className={cl('form')}>
                            <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                                <Input name="fullName" size="large" placeholder="Tên người nhận" value={info.fullName} onChange={(e) => handleChangeForm(e.target)} />
                                <ValidateMessage name="fullName" errors={errors}></ValidateMessage>
                                <Input name="userAddress" size="large" placeholder="Địa chỉ" value={info.userAddress} onChange={(e) => handleChangeForm(e.target)} />
                                <ValidateMessage name="userAddress" errors={errors}></ValidateMessage>
                                <Input name="userPhone" size="large" placeholder="Số điện thoại" value={info.userPhone} onChange={(e) => handleChangeForm(e.target)} />
                                <ValidateMessage name="userPhone" errors={errors}></ValidateMessage>
                                <div>
                                    <Select
                                        showSearch
                                        placeholder="Or select a profile"
                                        optionFilterProp="children"
                                        onChange={handleChangeProfile}
                                        filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                                    >
                                        {
                                            allProfiles && allProfiles.map(item => (
                                                <Option key={item._id} value={JSON.stringify(item)}>{item.name}</Option>
                                            ))
                                        }
                                    </Select>
                                </div>
                                <div className={cl('nav-links')}>
                                    <Button onClick={handleOpenCart}>Giỏ hàng</Button>
                                    <Button type="primary" htmlType="submit">
                                        Thanh toán
                                    </Button>
                                </div>

                            </Space>
                        </form>
                    </div>
                    <div className="col l-6 m-12 c-12">
                        <Order>
                            <Order.List>
                                {
                                    data.map(item => (
                                        <div key={item._id} className={cl('order-item-wrapper')}>
                                            <Order.Item data={item}></Order.Item>
                                            {item?.gifts.length > 0 && (<>
                                                <FontAwesomeIcon icon={faPlus} className={cl('plus')} />
                                                {item?.gifts.map(g => (
                                                    <Order.GiftItem key={g._id} data={{ ...g, amount: item.amount }}></Order.GiftItem>
                                                ))}
                                            </>)}
                                        </div>
                                    ))
                                }
                                <Divider />
                                <div className={cl('payment-method')}>
                                    <span>Payment method: {info.payMethod} </span>
                                    {info.payMethod === 'Cash on delivery (COD)' && <span className={cl('payment-sign')}>Default</span>}
                                    <Button type='link' onClick={() => setIsShowPayMethod(prev => !prev)}>Change</Button>
                                </div>
                                <div className={cl('payment-advance', { show: isShowPayMethod })}>
                                    <Button onClick={() => handleChangePaymentMethod('Credit Card')}>Credit Card</Button>
                                    <Button onClick={() => handleChangePaymentMethod('E-Wallet')}>E-Wallet</Button>
                                    <Button onClick={() => handleChangePaymentMethod('Cash on delivery (COD)')}>Cash on delivery (COD)</Button>
                                </div>
                                <Divider />
                                <Order.Summary title='Tạm tính'>{formatCurrency(total.temp)}</Order.Summary>
                                +
                                <Order.Summary title='Vận chuyển'>{formatCurrency(total.delivery)}</Order.Summary>
                                <Divider />
                                <Order.Summary primary title='Tổng'>{formatCurrency(total.totalPrice)}</Order.Summary>
                            </Order.List>

                        </Order>
                    </div>
                </div>
            </div>
            {showCart && <Cart onClose={handleOpenCart}></Cart>}
        </div>
    )
}

export default NewOrder