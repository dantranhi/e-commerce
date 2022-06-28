import React from 'react'
import Tippy from '@tippyjs/react/headless'
import 'tippy.js/dist/tippy.css';

import Menu from './Menu'
import classNames from 'classnames/bind';
import styles from './UserMenu.module.scss';
const cl = classNames.bind(styles);

function UserMenu({ children }) {

    return (
        <Tippy
            interactive
            hideOnClick='false'
            delay={[0, 900]}
            placement="bottom-end"
            render={(attrs) => (
                <div className={cl('menu')} tabIndex="-1" {...attrs}>
                    <Menu></Menu>
                </div>
            )}
        >
            {children}
        </Tippy>
    )
}

export default UserMenu