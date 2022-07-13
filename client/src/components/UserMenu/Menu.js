import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear, faCartShopping, faUser, faArrowRightFromBracket, faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons'

import httpRequest from '../../utils/httpRequest'
import { logout } from '../../store/actions'
import { useStore } from '../../store/UserContext'
import classNames from 'classnames/bind';
import styles from './UserMenu.module.scss';
const cl = classNames.bind(styles);

function Menu() {
  const [state, dispatch] = useStore()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      const res = await httpRequest.post('/auth/logout')
      if (res.data.success) {
        dispatch(logout())
        localStorage.removeItem('user')
        navigate('/')
        toast.info(res.data.message)
    }
    else {
        toast.error(res.data.message)
    }
    } catch (error) {

    }
  }

  return (
    <ul className={cl('wrapper')}>
      <li>Hello {state.user.info.username}</li>
      {state.user.info.isAdmin && <li>
        <Link to='/admin' className={cl('link')}>
          <span className={cl('icon-wrapper')}><FontAwesomeIcon className={cl('icon')} icon={faGear} /></span> Admin
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
      {state.user.info.username ? <li>
        <div onClick={handleLogout} className={cl('link')}>
          <span className={cl('icon-wrapper')}><FontAwesomeIcon className={cl('icon')} icon={faArrowRightFromBracket} /></span> Logout
        </div>
      </li> : <li>
        <Link to='/login' className={cl('link')}>
          <span className={cl('icon-wrapper')}><FontAwesomeIcon className={cl('icon')} icon={faArrowRightToBracket} /></span> Login
        </Link>
      </li>}
    </ul>
  )
}

export default Menu