import { useState, useEffect, useCallback } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear, faUser, faArrowRightFromBracket, faArrowRightToBracket, faClipboardList, faHeartCircleCheck } from '@fortawesome/free-solid-svg-icons'
import decode from 'jwt-decode';

import defaultAvatar from '../../assets/img/default-avatar.png'
import httpRequest, { get } from '../../utils/httpRequest'
import { logout } from '../../store/actions'
import { useStore } from '../../store/UserContext'
import classNames from 'classnames/bind';
import styles from './UserMenu.module.scss';
const cl = classNames.bind(styles);

function Menu() {
  const [state, dispatch] = useStore()
  const navigate = useNavigate()
  const location = useLocation()

  const [profile, setProfile] = useState(JSON.parse(localStorage.getItem('user')))

  const handleLogout = async () => {
    try {
      const res = await httpRequest.post('/auth/logout')
      if (res.data.success) {
        dispatch(logout())
        setProfile(null)
        navigate('/')
        toast.info(res.data.message)
      }
      else {
        toast.error(res.data.message)
      }
    } catch (error) {

    }
  }


  useEffect(() => {
    const token = profile?.token;

    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 - new Date().getTime() < 0) dispatch(logout());
    }
    setProfile(JSON.parse(localStorage.getItem('user')));
  }, [state.userData]);

  return (
    <ul className={cl('wrapper')}>
      {profile &&
        <>
          <li className={cl('profile-wrapper')}>
            <div className={cl('avatar-wrapper')}>
              <img src={profile.details?.photos?.[0]?.url || profile.details?.image || defaultAvatar} alt="" className={cl('avatar')} />
            </div>
            <div className={cl('name')}>
              Hello {profile.details.username}
            </div>
          </li>
          <li>
            <Link to={`/profile/${profile?.details._id}`} className={cl('link')}>
              <span className={cl('icon-wrapper')}><FontAwesomeIcon className={cl('icon')} icon={faUser} /></span> Profile
            </Link>
          </li>
          <li>
            <Link to={`/wishlist/${profile?.details._id}`} className={cl('link')}>
              <span className={cl('icon-wrapper')}><FontAwesomeIcon className={cl('icon')} icon={faHeartCircleCheck} /></span> Wishlist
            </Link>
          </li>
        </>
      }
      {profile && profile.details.isAdmin && <li>
        <Link to='/admin' className={cl('link')}>
          <span className={cl('icon-wrapper')}><FontAwesomeIcon className={cl('icon')} icon={faGear} /></span> Admin
        </Link>
      </li>}
      {profile && <Link to={`/order/my-orders/${profile.details._id}`} className={cl('link')}>
        <span className={cl('icon-wrapper')}><FontAwesomeIcon className={cl('icon')} icon={faClipboardList} /></span> Orders
      </Link>}


      {profile ? <li>
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