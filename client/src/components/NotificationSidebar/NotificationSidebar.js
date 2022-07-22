import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faCalendarDay } from '@fortawesome/free-solid-svg-icons'

import Notification from './Notification'

import classNames from 'classnames/bind';
import styles from './NotificationSidebar.module.scss';
const cl = classNames.bind(styles);

function NotificationSidebar() {
    const [showNotification, setShowNotification] = useState(true)
    return (
        <div className={cl('wrapper')}>
            <div className={cl('top')}>
                <div className={cl('message')}>
                    <FontAwesomeIcon className={cl('top-icon')} icon={faBell} />
                    <Notification show={showNotification}></Notification>
                </div>

                <div className={cl('message')}>
                    <FontAwesomeIcon className={cl('top-icon')} icon={faCalendarDay} />
                </div>
            </div>
        </div>
    )
}

export default NotificationSidebar