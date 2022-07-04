import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faArrowRightFromBracket, faChevronRight } from '@fortawesome/free-solid-svg-icons'

import exampleAvatar from '../../assets/img/example-avatar.jpg'
import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
const cl = classNames.bind(styles);

function Sidebar({ children }) {
    const [show, setShow] = useState(false)
    return (
        <aside className={cl('wrapper', { minimized: show })}>
            <div className={cl('panel')}>
                <div className={cl('top')}>
                    <div className={cl('info')}>
                        <img src={exampleAvatar} alt="" className={cl('avatar')} />
                        <div className={cl('user')}>
                            <div className={cl('name')}>Dantocthang</div>
                            <div className={cl('role')}>Admin</div>
                        </div>
                    </div>
                    <button onClick={() => setShow(prev => !prev)} className={cl('minimize')}><FontAwesomeIcon icon={faChevronLeft} /></button>
                </div>

                <div className={cl('mid')}>
                    {children}
                </div>

                <div className={cl('bot')}>
                    <button className={cl('logout-btn')}>
                        <FontAwesomeIcon icon={faArrowRightFromBracket} className={cl('logout-icon')} />
                        Logout
                    </button>
                </div>
            </div>
            <button onClick={() => setShow(prev => !prev)} className={cl('expand-btn', {hidden: !show})}><FontAwesomeIcon icon={faChevronRight} /></button>
        </aside>
    )

}

export default Sidebar