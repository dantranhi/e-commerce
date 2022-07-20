import React from 'react'
import { Typography, Divider, Popconfirm } from 'antd'
import { DeleteOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'


import ProfileItemRow from './ProfileItemRow'


import classNames from 'classnames/bind';
import styles from './ProfileItem.module.scss';
const cl = classNames.bind(styles);

const { Title } = Typography

function ProfileItem({ data, index, onDeleteProfile }) {

    return (
        <div className={cl('wrapper')}>
            <div className={cl('top')}>
                <Title level={4}>{data.name}</Title>
                <Divider type="vertical" />
                <Link to={`/profile/${data.userId}/${data._id}`}>Edit profile</Link>
                <Divider type="vertical" />
                <Popconfirm
                    className={cl('delete-wrapper')}
                    title="Are you sure to delete this profile?"
                    onConfirm={() => onDeleteProfile(data._id)}
                    okText="Yes"
                    cancelText="No"
                >
                    <div className={cl('delete')}><DeleteOutlined className={cl('delete-icon')} /></div>
                </Popconfirm>

            </div>
            <div className={cl('body')}>
                <ProfileItemRow title="Full name" value={data.fullName}></ProfileItemRow>
                <ProfileItemRow title="Address" value={data.userAddress}></ProfileItemRow>
                <ProfileItemRow title="Phone" value={data.userPhone}></ProfileItemRow>
            </div>
        </div>
    )
}

export default ProfileItem