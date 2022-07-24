import React from 'react'
import classNames from 'classnames/bind';
import {Link } from 'react-router-dom'

import formatDate from '../../utils/formatDate'
import productImg from '../../assets/img/box.png'
import infoImg from '../../assets/img/info.png'
import orderImg from '../../assets/img/shopping.png'
import promotionImg from '../../assets/img/tag.png'

import styles from './Notification.module.scss';
const cl = classNames.bind(styles);

function NotificationItem({ data, onRead }) {
    const user = JSON.parse(localStorage.getItem('user'))

    let iconImg = infoImg
    switch (data.type) {
        case 'product':
            iconImg = productImg
            break;
        case 'order':
            iconImg = orderImg
            break;
        case 'promotion':
            iconImg = promotionImg
            break;
        default:
            iconImg = infoImg
    }

    return (
        <Link to={data.link} onClick={()=>onRead(data.status[0]._id, data.status[0].isRead)} className={cl('item-wrapper', { read: data.status[0].isRead })}>
            <span className={cl('status', {hide:  data.status[0].isRead})}></span>
            <div className={cl('item-content')}>
                <div className={cl('item-main')}>{data.content}</div>
                <div className={cl('item-time')}>{formatDate(data.createdAt, 'DD-MM-YYYY, h:mm:ss a')}</div>
            </div>
            <div className={cl('icon-wrapper')}>
                <img src={iconImg} alt="icon" className={cl('icon')} />
            </div>
        </Link>
    )
}

export default NotificationItem