import React from 'react'
import { Space, Table, Popconfirm, Typography, Button } from 'antd'
import { toast } from 'react-toastify'
import httpRequest from '../../utils/httpRequest'
import moment from 'moment'


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
            const res = await httpRequest.delete(`/promotion/${id}`)
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
            title: 'Start',
            dataIndex: 'startDate',
            key: 'startDate',
            render: (date) => formatDate(date, 'DD-MM-YYYY')
        },
        {
            title: 'End',
            dataIndex: 'endDate',
            key: 'endDate',
            render: (date) => formatDate(date, 'DD-MM-YYYY')
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (_, record) => {
                if (moment().isBetween(record.startDate, record.endDate))
                    return 'Activating'
                if (moment().diff(record.startDate)<0) return 'Upcoming'
                return 'Expired'
            }
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