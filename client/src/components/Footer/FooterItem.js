import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
const cl = classNames.bind(styles);

function FooterItem({ to, leftIcon, className, children }) {
    let passProps = { className }
    let Comp = 'div'
    if (to) {
        Comp = Link
        passProps.to = to
    }
    return (
        <Comp {...passProps} className={cl('item-wrapper')}>
            <FontAwesomeIcon className={cl('item-icon')} icon={leftIcon} />
            <div className={cl('item-content')}>
                {children}
            </div>
        </Comp>
    )
}

export default FooterItem