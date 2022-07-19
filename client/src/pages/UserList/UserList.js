import React, { useState } from 'react'
import { Space, Table, Popconfirm, Typography, Switch } from 'antd'
import { toast } from 'react-toastify';

import useFetch from '../../hooks/useFetch'
import httpRequest from '../../utils/httpRequest'

import classNames from 'classnames/bind';
import styles from './UserList.module.scss';

const cl = classNames.bind(styles);
const { Title } = Typography;

function UserList() {
    const [currentUser] = useState(()=>JSON.parse(localStorage.getItem('user')))
    const { data: users, reFetch } = useFetch('/user')

    console.log(currentUser)


    const handleChangeRole = async (userId, value) => {
        const res = await httpRequest.patch(`/user/${userId}`, { isAdmin: value })
        if (res.data.success) {
            toast.success(res.data.message)
            reFetch()
        }
    }

    const confirmDeleteUser = async (e, userId) => {
        const res = await httpRequest.delete(`/user/${userId}`)
        if (res.data.success) {
            toast.success(res.data.message)
            reFetch()
        }
    }

    const columns = [
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
            // render: (text) => <a href="/">{text}</a>,
        },
        {
            title: 'Role',
            dataIndex: 'isAdmin',
            key: 'isAdmin',
            render: (text, record) => <Switch disabled={currentUser.details._id === record._id} onChange={() => handleChangeRole(record._id, !text)} checkedChildren="ADM" unCheckedChildren="USER" defaultChecked={text} />
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    {currentUser.details._id !== record._id && <Popconfirm
                        title="Are you sure to delete this user?"
                        onConfirm={(e) => confirmDeleteUser(e, record._id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <a href="/">Delete</a>
                    </Popconfirm>}
                </Space>
            ),
        },

    ];

    return (
        <div className={cl('wrapper')}>
            <div className="grid ultrawide">
                <Title level={2}>Users</Title>
                <Table columns={columns} dataSource={users} rowKey="_id" />
            </div>
        </div>
    )
}

export default UserList