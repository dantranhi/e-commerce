import React from 'react'
import classNames from 'classnames/bind';

import formatCurrency from '../../utils/formatCurrency'
import styles from './Order.module.scss';


const cl = classNames.bind(styles);

function GiftOrderItem({data}) {
    return (
        <div className={cl('item-wrapper')}>
            <div className={cl('img-wrapper')}>
                <img src={data.giftPhoto} alt="" className={cl('img')} />
                <span className={cl('quantity')}>{data.amount}</span>
            </div>
            <div className={cl('name')}>{data.giftName}</div>
            <div className={cl('price')}>{formatCurrency(0)}</div>
        </div>
    )
}

export default GiftOrderItem