import { useState } from 'react'
import classNames from 'classnames/bind';
import { Typography, Table, Select, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Order from '../../components/Order'

import styles from './Revenue.module.scss';
import useFetch from '../../hooks/useFetch'
import { get } from '../../utils/httpRequest';
import formatCurrency from '../../utils/formatCurrency'
import formatDate from '../../utils/formatDate'

const cl = classNames.bind(styles);
const { Title } = Typography
const { Option } = Select

function Revenue() {
    const [loading, setLoading] = useState(false)
    const [orders, setOrders] = useState([])
    const [total, setTotal] = useState(0)
    const [filterForm, setFilterForm] = useState({ time: '24h' })

    const { data: products, loading: productsLoading } = useFetch('/product')
    const { data: allTypes, loading: typeLoading } = useFetch('/product/type')
    const { data: allBrands, loading: brandLoading } = useFetch('/product/brand')


    const handleSelectTypes = (value) => {
        setFilterForm(prev => ({
            ...prev,
            type: value
        }))
    }

    const handleSelectBrands = (value) => {
        setFilterForm(prev => ({
            ...prev,
            brand: value
        }))
    }

    const handleSelectTime = (value) => {
        setFilterForm(prev => ({
            ...prev,
            time: value
        }))
    }

    const handleCalculateRevenue = async () => {
        try {
            setLoading(true)
            const res = await get('/revenue', {
                params: {
                    ...filterForm
                }
            })
            setTotal(res.data.reduce((accumulator, item) => accumulator += item.filterTotal, 0))
            setOrders(res.data)
            setLoading(false)
        } catch (error) {

        }
    }

    const columns = [
        {
            title: 'Order ID',
            dataIndex: '_id',
            key: '_id',
        },
        {
            title: 'Order date',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (date) => formatDate(date, 'DD-MM-YYYY')
        },
        {
            title: 'Match revenue',
            key: 'filterTotal',
            dataIndex: 'filterTotal',
            render: (price) => formatCurrency(price),
        },

    ];

    return (
        <div className={cl('wrapper')}>
            <div className="grid wide">
                <Title level={2}>Revenue</Title>
                <div className={cl('filters')}>
                    <div className={cl('type')}>
                        <Select
                            style={{ width: '100%' }}
                            placeholder="Please select"
                            defaultValue={''}
                            value={filterForm.type}
                            onChange={handleSelectTypes}
                        >
                            {!typeLoading && allTypes.map(t => (
                                <Option key={t._id} value={t.name}>{t.name}</Option>
                            ))}
                            <Option value="">All types</Option>
                        </Select>
                    </div>
                    <div className={cl('brand')}>
                        <Select
                            style={{ width: '100%' }}
                            placeholder="Please select brands"
                            defaultValue={''}
                            value={filterForm.brand}
                            onChange={handleSelectBrands}
                        >
                            {!brandLoading && allBrands.map(b => (
                                <Option key={b._id} value={b.name}>{b.name}</Option>
                            ))}
                            <Option value="">All brands</Option>
                        </Select>
                    </div>
                    <div className={cl('time')}>
                        <Select
                            value={filterForm.time}
                            style={{ width: '100%' }}
                            onChange={handleSelectTime}
                            placeholder="Select time period"
                        >
                            <Option value="24h">24h</Option>
                            <Option value="1w">1 Week</Option>
                            <Option value="1M">1 Month</Option>
                            <Option value="1Q">1 Quarter</Option>
                            <Option value="1y">1 Year</Option>
                            <Option value="50y">All time</Option>
                        </Select>
                    </div>
                    <Button onClick={handleCalculateRevenue} type="primary" icon={<SearchOutlined />}>
                        Calculate
                    </Button>
                </div>
                <div className={cl('table')}>
                    {loading ? 'LOADING' : (
                        <Table
                            columns={columns}
                            dataSource={orders}
                            rowKey="_id"
                            expandable={{
                                expandedRowRender: (record) => (
                                    <Order>
                                        <Order.List>
                                            {!productsLoading && record.productList.map(item => {
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
                                        </Order.List>
                                    </Order>
                                ),
                                rowExpandable: (record) => record.productList.length > 0,
                            }}
                        />)}
                    <div className={cl('total-revenue')}>
                        Total: {formatCurrency(total)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Revenue