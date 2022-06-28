import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear, faCartShopping, faUser } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

import { useAuth } from '../../store/UserContext'
import classNames from 'classnames/bind';
import styles from './UserMenu.module.scss';
const cl = classNames.bind(styles);

function Menu() {
  const [account, setAccount] = useAuth()
  // console.log(account)

  const handleLogout = async () => {
    try {
      const res = await axios.post('http://localhost:3006/api/auth/logout', {}, { withCredentials: true })
      if (res.msg)
        console.log(res.msg)
      else {
        localStorage.removeItem('user')
        setAccount({})
      }
    } catch (error) {

    }
  }

  return (
    <ul className={cl('wrapper')}>
      <li>Hello {account.username}</li>
      {account.isAdmin && <li>
        <Link to='/products/create' className={cl('link')}>
          <span className={cl('icon-wrapper')}><FontAwesomeIcon className={cl('icon')} icon={faGear} /></span> Admin {account.username}
        </Link>
      </li>}
      <li>
        <Link to='/' className={cl('link')}>
          <span className={cl('icon-wrapper')}><FontAwesomeIcon className={cl('icon')} icon={faCartShopping} /></span> Cart
        </Link>
      </li>
      <li>
        <Link to='/' className={cl('link')}>
          <span className={cl('icon-wrapper')}><FontAwesomeIcon className={cl('icon')} icon={faUser} /></span> Profile
        </Link>
      </li>
      <li>
        <div onClick={handleLogout} className={cl('link')}>
          <span className={cl('icon-wrapper')}><FontAwesomeIcon className={cl('icon')} icon={faUser} /></span> Logout
        </div>
      </li>
    </ul>
  )
}

export default Menu