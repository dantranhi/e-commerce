import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

import { useStore } from '../../store/UserContext'
import CartItem from './CartItem'
import classNames from 'classnames/bind';
import styles from './Cart.module.scss';
const cl = classNames.bind(styles);

function Cart({ onClose }) {
  const [state, dispatch] = useStore()
  const [totalPrice, setTotalPrice] = useState('')

  const calculateTotal = () => {
    let total = state.cart.data.reduce((accumulate, curValue, curIndex) => {
      return accumulate += curValue.price * curValue.amount
    }, 0)

    setTotalPrice(total)
  }

  useEffect(() => {
    calculateTotal()
    localStorage.setItem('userCart', JSON.stringify(state.cart.data))
  }, [state.cart.data])

  return (
    <div className={cl('modal')} onClick={(e) => { onClose(); }}>
      <div onClick={(e) => { e.stopPropagation() }} className={cl('inner')}>
        <FontAwesomeIcon onClick={onClose} className={cl('close')} icon={faXmark}></FontAwesomeIcon>
        <div className={cl('title')}>Your Cart</div>
        <ul className={cl('list')}>
          {Object.keys(state.cart.data).map((key) => (
            <li key={key} className={'item'}>
              <CartItem data={state.cart.data[key]}></CartItem>
            </li>
          ))}
        </ul>
        <div className={cl('footer')}>
          <div className={cl('total')}>Total: {new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(totalPrice)}</div>
          <button className={cl('check-out')}>Check out</button>
        </div>
      </div>
    </div>
  )
}

export default Cart