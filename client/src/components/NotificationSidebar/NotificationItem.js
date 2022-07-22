import React from 'react'
import classNames from 'classnames/bind';

import formatDate from '../../utils/formatDate'
import productImg from '../../assets/img/box.png'
import infoImg from '../../assets/img/info.png'
import orderImg from '../../assets/img/shopping.png'
import httpRequest from '../../utils/httpRequest'

import styles from './Notification.module.scss';
const cl = classNames.bind(styles);

function NotificationItem({ data }) {
    const user = JSON.parse(localStorage.getItem('user'))

    let iconImg = infoImg
    switch (data.type) {
        case 'product':
            iconImg = productImg
            break;
        case 'order':
            iconImg = orderImg
            break;
        default:
            iconImg = infoImg
    }

    const handleReadNotification = async () => {
        const res = await httpRequest.patch(`/notification/${user.details._id}/${data._id}`)
        console.log(res)
    }


    return (
        <div onClick={handleReadNotification} className={cl('item-wrapper', { read: data.isRead })}>
            <span className={cl('status', {hide: data.isRead})}></span>
            <div className={cl('item-content')}>
                <div className={cl('item-main')}>{data.content}</div>
                <div className={cl('item-time')}>{formatDate(data.createdAt, 'DD-MM-YYYY, h:mm:ss a')}</div>
            </div>
            <div className={cl('icon-wrapper')}>
                <img src={iconImg} alt="icon" className={cl('icon')} />
            </div>
        </div>
    )
}

export default NotificationItem