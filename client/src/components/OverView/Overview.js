import React from 'react'
import classNames from 'classnames/bind';


import styles from './Overview.module.scss';
const cl = classNames.bind(styles);

function Overview({children}) {
  return (
    <div className={cl('wrapper')}>
        <div className={cl('title')}>Overview</div>
        {children}
    </div>
  )
}

export default Overview