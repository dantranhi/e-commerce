import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons'


import classNames from 'classnames/bind';
import styles from './Cart.module.scss';
const cl = classNames.bind(styles);

function CartItem({ data }) {
    console.log(data)
    return (
        <div className={cl('wrapper')}>
            <img src={data?.photo || "https://dl.airtable.com/.attachments/14ac9e946e1a02eb9ce7d632c83f742f/4fd98e64/product-1.jpeg"} alt="product" className={cl('img')} />
            <div className={cl('info')}>
                <div className={cl('name')}>{data?.name || 'High-Back Bench'}</div>
                <div className={cl('price')}>{data?.price || 'Price'}</div>
                <button className={cl('remove')}>remove</button>
            </div>
            <div className={cl('quantity')}>
                <button className={cl('adjust')}>
                    <FontAwesomeIcon className={cl('icon')} icon={faChevronUp} />
                </button>
                <span className={cl('amount')}>{data?.amount || 1}</span>
                <button className={cl('adjust')}>
                    <FontAwesomeIcon className={cl('icon')} icon={faChevronDown} />
                </button>
            </div>
        </div>
    )
}

export default CartItem