import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import formatCurrency from '../../utils/formatCurrency'
import { useStore } from '../../store/UserContext'
import CartItem from './CartItem'
import classNames from 'classnames/bind';
import styles from './Cart.module.scss';
const cl = classNames.bind(styles);

function Cart({ onClose }) {
  const [state] = useStore()
  const [totalPrice, setTotalPrice] = useState('')
  const user = JSON.parse(localStorage.getItem('user'))

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
          <div className={cl('total')}>Total: {formatCurrency(totalPrice)}</div>
          <Link to={user !== 'undefined' ? `/order/${user?.details._id}` : '/login'} className={cl('check-out')}>Check out</Link>
        </div>
      </div>
    </div>
  )
}

Cart.propTypes = {
  onClose: PropTypes.func
}

export default Cart