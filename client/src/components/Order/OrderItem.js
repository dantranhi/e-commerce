import React from 'react'
import classNames from 'classnames/bind';

import formatCurrency from '../../utils/formatCurrency'
import styles from './Order.module.scss';


const cl = classNames.bind(styles);


function OrderItem({ data }) {
    return (
        <div className={cl('item-wrapper')}>
            <div className={cl('img-wrapper')}>
                <img src={data.photos[0].url} alt="" className={cl('img')} />
                <span className={cl('quantity')}>{data.amount}</span>
            </div>
            <div className={cl('name')}>{data.name}</div>
            <div className={cl('price')}>{formatCurrency(data.price)}</div>
        </div>
    )
}

export default OrderItem