import React from 'react'
import { Space, Table, Popconfirm, Typography, Button } from 'antd'
import { toast } from 'react-toastify'
import axios from 'axios'


import { Link } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import formatDate from '../../utils/formatDate'
import classNames from 'classnames/bind';
import styles from '../ProductList/ProductList.module.scss'


const cl = classNames.bind(styles);
const { Title } = Typography

function PromotionList() {
    const { data: promotionData, loading, reFetch } = useFetch('/promotion')

    const confirm = async (e, id) => {
        try {
            const res = await axios.delete(`/promotion/${id}`)
            if (res.data.success) {
                toast.success(res.data.message);
                reFetch()
            }
            else toast.error('Can not delete this promotion')
        } catch (err) {
            toast.error(err?.response?.data?.message || 'Undefined Error!')
        }
    };


    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => <Link to={`/admin/promotion/${record._id}`}>{text}</Link>,
        },
        {
            title: 'Start - end date',
            dataIndex: 'startEndDate',
            key: 'startEndDate',
            render: (date, record) => formatDate(record.startEndDate[0], 'DD-MM-YYYY') + ' --> ' + formatDate(record.startEndDate[1], 'DD-MM-YYYY')
        },
        {
            title: 'Stack with other promotions?',
            dataIndex: 'comeWithOtherPromotion',
            key: 'comeWithOtherPromotion',
            render : (text) => String(text),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Link to={`/admin/promotion/${record._id}`}>Edit</Link>
                    <Popconfirm
                        title="Are you sure to delete this promotion?"
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
                <Title level={2}>Promotion List</Title>
                <Link className="redirect-link" to='/admin/promotion/create'>Add</Link>
                {loading ? 'LOADING' : (
                    <Table columns={columns} dataSource={promotionData} rowKey="_id" />
                )}
            </div>
        </div>
    )
}


export default PromotionList