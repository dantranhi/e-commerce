import Notification from './Notification'

import classNames from 'classnames/bind';
import styles from './NotificationSidebar.module.scss';
const cl = classNames.bind(styles);

function NotificationSidebar() {
    return (
        <div className={cl('wrapper')}>
            <Notification>
            </Notification>
        </div>
    )
}

export default NotificationSidebar