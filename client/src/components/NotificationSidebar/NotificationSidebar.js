import React, {useState} from 'react'
import Tippy from '@tippyjs/react/headless'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faCalendarDay } from '@fortawesome/free-solid-svg-icons'

import classNames from 'classnames/bind';
import styles from './NotificationSidebar.module.scss';
const cl = classNames.bind(styles);

function NotificationSidebar() {
    const [showTippy, setShowTippy] = useState('')
    return (
        <div className={cl('wrapper')}>
            <div className={cl('top')}>
                <Tippy
                    trigger="click"
                    interactive
                    hideOnClick='false'
                    // delay={[0, 900]}
                    placement="bottom-end"
                    render={(attrs) => (
                        <div className={cl('menu')} tabIndex="-1" {...attrs}>
                            Hello there
                        </div>
                    )}
                >
                    <div className={cl('message')}>
                        <FontAwesomeIcon className={cl('top-icon')} icon={faBell} />
                    </div>
                </Tippy>
                <Tippy
                    // visible={showTippy==='notifications'}
                    trigger="click"
                    interactive
                    hideOnClick='false'
                    // delay={[0, 900]}
                    placement="bottom-end"
                    render={(attrs) => (
                        <div className={cl('menu')} tabIndex="-1" {...attrs}>
                            Hello there
                        </div>
                    )}
                >
                    <div className={cl('message')}>
                        <FontAwesomeIcon className={cl('top-icon')} icon={faCalendarDay} />
                    </div>
                </Tippy>

            </div>
        </div>
    )
}

export default NotificationSidebar