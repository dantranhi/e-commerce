import { useState, useEffect } from 'react'
import { Typography, Divider, Input, Space, Button, Select } from 'antd'
import classNames from 'classnames/bind';
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

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

    const [total, setTotal] = useState({
        temp: 0,
        delivery: 0,
        totalPrice: 0
    })

    const [info, setInfo] = useState({
        userAddress: '',
        userPhone: '',
        fullName: ''
    })

    const [{ cart: { data }, user }, dispatch] = useStore()

    const { data: allProfiles } = useFetch(`/profile/${params.id}`, params.id!=='undefined')

    useEffect(() => {
        if (!profile)
            navigate('/login')
        if (data.length === 0) {
            navigate('/')
            toast.info('Your cart is empty!')
        }
    }, [])

    useEffect(() => {
        let newTemp = data.reduce((accumulate, item) => {
            return accumulate + item.price * item.amount
        }, 0)
        let delivery = newTemp >= 500000 ? 0 : 30000
        let sum = newTemp + delivery
        setTotal({
            temp: newTemp,
            delivery: delivery,
            totalPrice: sum
        })
    }, [data])

    const handleChangeForm = ({ name, value }) => {
        setInfo(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleChangeProfile = (profile) => {
        const { _id, name, userId, ...obj } = JSON.parse(profile)
        setInfo(obj)
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
                    quantity: item.amount,
                    currentPrice: item.price,
                })),
                ...total
            }

            const res = await httpRequest.post(`/order/${profile.details._id}/create`, allData)
            if (res.data.success) {
                toast.success(res.data.message)
                dispatch(deleteCart())
                navigate('/')
            }
            if (res.data.errors) {
                setErrors(res.data.errors)
            }
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
                                        <Order.Item key={item._id} data={item}></Order.Item>
                                    ))
                                }
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