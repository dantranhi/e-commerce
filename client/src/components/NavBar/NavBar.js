import React from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faUser, faBars, faXmark } from '@fortawesome/free-solid-svg-icons'

import { toggleCart } from '../../store/actions'
import { useStore } from '../../store/UserContext'
import UserMenu from '../UserMenu'
import Cart from '../Cart'
import { LogoIcon } from '../Icons/Icons'
import styles from './NavBar.module.scss';
const cl = classNames.bind(styles);

function NavBar() {
  const [state, dispatch] = useStore()
  
  const handleOpenCart = () => {
    dispatch(toggleCart())
  }

  return (
    <div className="grid wide">
      <div className={cl('header')}>
        <div className={cl('nav')}>
          <Link to='/' className={cl('nav-item')}>Home</Link>
          <Link to='/product' className={cl('nav-item')}>Products</Link>
          <Link to='/login' className={cl('nav-item')}>About</Link>
        </div>
        <label htmlFor={cl('mobile')} className={cl('mobile-bars')}><FontAwesomeIcon className={cl('mobile-bars-icon')} icon={faBars} /></label>
        <input type="checkbox" id={cl('mobile')} hidden />
        <label htmlFor={cl('mobile')} className={cl('mobile-menu')}>
          <div className={cl('mobile-inner')}>
            <label htmlFor={cl('mobile')} className={cl('close')}>
              <FontAwesomeIcon className={cl('close-btn')} icon={faXmark}></FontAwesomeIcon>
            </label>
            <ul className={cl('mobile-list')}>
              <li>
                <Link className={cl('mobile-link')} to='/'>Home</Link>
              </li>
            </ul>
          </div>
        </label>
        <div className={cl('logo')}>
          <LogoIcon width='140px' height='80px' className={cl('logo-img')} ></LogoIcon>
        </div>
        <div className={cl('function')}>
          <div className={cl('cart')}>
            <FontAwesomeIcon onClick={handleOpenCart} className={cl('icon')} icon={faCartShopping} />
            <span className={cl('cart-number')}>3</span>
          </div>
          <UserMenu>
            <div className={cl('user')}>
              <FontAwesomeIcon className={cl('icon')} icon={faUser} />
            </div>
          </UserMenu>
        </div>
      </div>
      {state.cart.isOpen && <Cart onClose={handleOpenCart}></Cart>}
    </div>
  )
}

export default NavBar