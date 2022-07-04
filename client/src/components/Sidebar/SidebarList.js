import React from 'react'

import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
const cl = classNames.bind(styles);

function SidebarList({title, children}) {
  return (
    <>
        {title && (<div className={cl('list-title')}>{title}</div>)}
        {children}
    </>
  )
}

export default SidebarList