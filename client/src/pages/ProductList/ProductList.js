import React from 'react'
import { Space, Table, Popconfirm, Typography, Button } from 'antd'
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom'

import useFetch from '../../hooks/useFetch'
import formatCurrency from '../../utils/formatCurrency'
import classNames from 'classnames/bind';
import styles from './ProductList.module.scss';
import httpRequest from '../../utils/httpRequest'
const cl = classNames.bind(styles);
const { Title } = Typography;

function ProductList() {
    const { data: products, loading, reFetch } = useFetch('/product')
    const { data: allBrands } = useFetch('/product/brand')
    const { data: allTypes } = useFetch('/product/type')

    const confirm = async (e, id) => {
        try {
            const res = await httpRequest.delete(`/product/${id}`)
            if (res.data.success) {
                toast.success(res.data.message);
                reFetch()
            }
            else toast.error('Can not delete this product')
        } catch (err) {
            toast.error(err?.response?.data?.message || 'Undefined Error!')
        }
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
            filters: allBrands.map(i => ({
                text: i.name,
                value: i.name,
            })
            ),
            onFilter: (value, record) => record.brand.indexOf(value) === 0,


        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            filters: allTypes.map(i => ({
                text: i.name,
                value: i.name,
            })
            ),
            onFilter: (value, record) => record.type.indexOf(value) === 0,
        },
        {
            title: 'Price',
            key: 'price',
            dataIndex: 'price',
            render: (price) => formatCurrency(price),
            sorter: (a, b) => a.price - b.price,
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
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button danger>Delete</Button>
                    </Popconfirm>
                </Space>
            ),
        },

    ];

    return (
        <div className={cl('wrapper')}>
            <div className="grid ultrawide">
                <Title level={2}>Product List</Title>
                <Link className={`redirect-link ${cl('link')}`} to='/admin/product/create'>Add</Link>
                {loading ? 'LOADING' : (<Table columns={columns} dataSource={products} rowKey="_id" />)}
            </div>
        </div>
    )
}


export default ProductList