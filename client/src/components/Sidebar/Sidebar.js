import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faArrowRightFromBracket, faChevronRight, faHouse } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify'

import { useStore } from '../../store/UserContext'
import { logout } from '../../store/actions'
import httpRequest from '../../utils/httpRequest'
import exampleAvatar from '../../assets/img/example-avatar.jpg'
import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
const cl = classNames.bind(styles);

function Sidebar({ children }) {
    const [show, setShow] = useState(false)
    const [, dispatch] = useStore()
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
        <aside onClick={() => setShow(prev => !prev)} className={cl('wrapper', { minimized: !show })}>
            <div className={cl('background')}>
            </div >
            <div onClick={(e) => e.stopPropagation()} className={cl('panel')}>
                <div className={cl('top')}>
                    <div className={cl('info')}>
                        <img src={exampleAvatar} alt="" className={cl('avatar')} />
                        <div className={cl('user')}>
                            <div className={cl('name')}>Dantocthang</div>
                            <div className={cl('role')}>Admin</div>
                        </div>
                    </div>
                    <button onClick={(e) => { e.stopPropagation(); setShow(prev => !prev) }} className={cl('minimize')}><FontAwesomeIcon icon={faChevronLeft} /></button>
                </div>

                <div className={cl('mid')}>
                    {children}
                </div>

                <div className={cl('bot')}>
                    <button onClick={handleLogout} className={cl('bot-btn')}>
                        <FontAwesomeIcon icon={faArrowRightFromBracket} className={cl('bot-icon')} />
                        Logout
                    </button>
                    <Link to='/' className={cl('bot-btn')}>
                        <FontAwesomeIcon icon={faHouse} className={cl('bot-icon')} />
                        Home
                    </Link>
                </div>
                <div className={cl('copyright')}>@ Copyright 2022</div>
            </div>
            <button onClick={(e) => {
                e.stopPropagation()
                setShow(prev => !prev)
            }} className={cl('expand-btn', { hidden: show })}><FontAwesomeIcon icon={faChevronRight} /></button>

        </aside>
    )

}

export default Sidebar