import { Button, Divider } from 'antd'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faCalendarDay } from '@fortawesome/free-solid-svg-icons'
import { CheckOutlined } from '@ant-design/icons';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless'

import NotificationItem from './NotificationItem';
import useFetch from '../../hooks/useFetch'
import httpRequest from '../../utils/httpRequest'

import styles from './Notification.module.scss';
const cl = classNames.bind(styles);

function Notification() {
    const [showNotification, setShowNotification] = useState(false)

    const user = JSON.parse(localStorage.getItem('user'))
    const { data: notifications, loading, reFetch } = useFetch(`/notification/${user.details._id}`)

    const handleReadNotification = async (id, isRead) => {
        if (!isRead) {
            await httpRequest.patch(`/notification/${user.details._id}/${id}`)
            reFetch()
        }
    }

    const handleReadAllNotifications = async () => {
        await httpRequest.put(`/notification/${user.details._id}`, {})
        reFetch()
    }

    return (
        <Tippy
            interactive
            trigger="click"
            placement="bottom-end"
            render={(attrs) => (
                <div className={cl('wrapper')} {...attrs}>
                    <div className={cl('top')}>
                        <div className={cl('title')}>Notifications</div>
                        <Button onClick={handleReadAllNotifications} type="link" icon={<CheckOutlined />}>Mark as read</Button>
                    </div>
                    <div className={cl('body')}>
                        {!loading && notifications.map((item, index) => (
                            <div key={item._id}>
                                <NotificationItem onRead={handleReadNotification} data={item}></NotificationItem>
                                {index !== notifications.length - 1 && (<Divider style={{ marginBlock: '.5rem' }}></Divider>)}
                            </div>
                        ))}
                    </div>
                    <div className={cl('bottom')}>
                        <Button type="link">View all notifications</Button>
                    </div>
                </div>
            )}
        >
            <div className={cl('outter-top')}>
                <div className={cl('message')}>
                    <FontAwesomeIcon onClick={() => setShowNotification(a => !a)} className={cl('top-icon')} icon={faBell} />
                    <span className={cl('number')}>{notifications.filter(i => i.status[0].isRead === false).length}</span>
                </div>
            </div>
        </Tippy>
    )


}

export default Notification