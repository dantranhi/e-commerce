import React from 'react'
import { Space, Table, Popconfirm } from 'antd'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom'

import useFetch from '../../hooks/useFetch'

import classNames from 'classnames/bind';
import styles from '../ProductList/ProductList.module.scss';
import axios from 'axios';
const cl = classNames.bind(styles);

function PromotionList() {
    const { data: promotionData, loading, reFetch } = useFetch('/promotion')
    console.log(promotionData)

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
                        <a href="/">Delete</a>
                    </Popconfirm>
                </Space>
            ),
        },

    ];

    return (
        <div className={cl('wrapper')}>
            <div className="grid wide">
                {loading ? 'LOADING' : (
                    <Table columns={columns} dataSource={promotionData} rowKey="_id" />
                )}
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </div>
        </div>
    )
}


export default PromotionList