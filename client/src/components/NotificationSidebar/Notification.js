import { Button, Divider } from 'antd'
import { CheckOutlined } from '@ant-design/icons';
import classNames from 'classnames/bind';

import NotificationItem from './NotificationItem';
import useFetch from '../../hooks/useFetch'
import httpRequest from '../../utils/httpRequest'

import styles from './Notification.module.scss';
const cl = classNames.bind(styles);

function Notification({ show }) {
    const user = JSON.parse(localStorage.getItem('user'))
    const { data: notifications, loading, reFetch } = useFetch(`/notification/${user.details._id}`)

    const handleReadNotification = async (id, isRead) => {
        if (!isRead) {
            await httpRequest.patch(`/notification/${user.details._id}/${id}`)
            reFetch()
        }
    }

    const handleReadAllNotifications = async () => {
        await httpRequest.put(`/notification/${user.details._id}`)
        reFetch()
    }

    return show && (
        <div className={cl('wrapper')}>
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
    )


}

export default Notification