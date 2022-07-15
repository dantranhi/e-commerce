import React from 'react'
import classNames from 'classnames/bind';
import styles from './Order.module.scss';
const cl = classNames.bind(styles);

function OrderList({ children }) {
    return (
        <div className={cl('list')}>
            {children}
        </div>
    )
}

export default OrderList