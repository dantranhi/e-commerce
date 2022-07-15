import React from 'react'
import classNames from 'classnames/bind';

import styles from './Order.module.scss';

const cl = classNames.bind(styles);

function Order({children}) {
  return (
    <div className={cl('wrapper')}>
        {children}
    </div>
  )
}

export default Order