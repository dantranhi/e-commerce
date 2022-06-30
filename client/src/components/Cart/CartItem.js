import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons'

import { useStore } from '../../store/UserContext'
import { removeFromCart, addOne, subOne } from '../../store/actions'
import classNames from 'classnames/bind';
import styles from './Cart.module.scss';
const cl = classNames.bind(styles);

function CartItem({ data }) {
    const [, dispatch] = useStore()
    return (
        <div className={cl('wrapper')}>
            <img src={data?.photos[0] || "https://dl.airtable.com/.attachments/14ac9e946e1a02eb9ce7d632c83f742f/4fd98e64/product-1.jpeg"} alt="product" className={cl('img')} />
            <div className={cl('info')}>
                <div className={cl('name')}>{data?.name || 'High-Back Bench'}</div>
                <div className={cl('price')}>{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(data?.price)}</div>
                <button onClick={()=>dispatch(removeFromCart(data?.id))} className={cl('remove')}>remove</button>
            </div>
            <div className={cl('quantity')}>
                <button onClick={()=>dispatch(addOne(data?._id))} className={cl('adjust')}>
                    <FontAwesomeIcon className={cl('icon')} icon={faChevronUp} />
                </button>
                <span className={cl('amount')}>{data?.amount || 1}</span>
                <button onClick={()=>dispatch(subOne(data?._id))} className={cl('adjust')}>
                    <FontAwesomeIcon className={cl('icon')} icon={faChevronDown} />
                </button>
            </div>
        </div>
    )
}

export default CartItem