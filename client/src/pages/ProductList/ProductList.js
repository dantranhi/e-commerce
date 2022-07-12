import React, { useEffect, useState } from 'react'
import { Space, Table, Popconfirm, Typography } from 'antd'
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom'

import { get } from '../../utils/httpRequest'

import classNames from 'classnames/bind';
import styles from './ProductList.module.scss';
import axios from 'axios';
const cl = classNames.bind(styles);
const { Title } = Typography;

function ProductList() {
    const [products, setProducts] = useState([])
    useEffect(() => {
        async function fetchFeaturedProduct() {
            const data = await get(`/product`)
            console.log(data)
            setProducts(data)
        }
        fetchFeaturedProduct()
    }, [])

    const confirm = async (e, id) => {
        try {
            const res = await axios.delete(`/product/${id}`)
            if (res.data.success) {
                toast.success('Deleted');
                setProducts(prev => prev.filter(item => item._id !== id))
            }
            else toast.error('Can not delete this product')
        } catch (err) {
            toast.error(err?.response?.data?.message || 'Undefined Error!')
        }
    };

    const cancel = (e) => {
        console.log(e);
        toast.error('Click on No');
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a href="/">{text}</a>,
        },
        {
            title: 'Brand',
            dataIndex: 'brand',
            key: 'brand',
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Price',
            key: 'price',
            dataIndex: 'price',
            render: (price) => new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(price),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Link to={`/admin/product/${record._id}`}>Edit</Link>
                    <Popconfirm
                        title="Are you sure to delete this product?"
                        onConfirm={(e) => confirm(e, record._id)}
                        onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                    >
                        <a href="/">Delete</a>
                    </Popconfirm>
                </Space>
            ),
        },

    ];

    return (
        <div className={cl('wrapper')}>
            <div className="grid ultrawide">
                <Title level={2}>Product List</Title>
                <Link className="redirect-link" to='/admin/product/create'>Add</Link>
                <Table columns={columns} dataSource={products} rowKey="_id" />
            </div>
        </div>
    )
}


export default ProductList