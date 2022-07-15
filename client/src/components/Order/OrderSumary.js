import React from 'react'
import classNames from 'classnames/bind';
import styles from './Order.module.scss';
const cl = classNames.bind(styles);

function OrderSumary({ title, children, primary }) {
    return (
        <div className={cl('list-temp-row', { primary: primary })}>
            <span>{title}</span>
            <span>{children}</span>
        </div>
    )
}

export default OrderSumary