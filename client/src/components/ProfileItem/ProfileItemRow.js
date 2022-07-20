import React from 'react'
import classNames from 'classnames/bind';
import styles from './ProfileItem.module.scss';
const cl = classNames.bind(styles);

function ProfileItemRow({title, value}) {
  return (
    <div className={cl('row')}>
        <span className={cl('title')}>{title}: </span>
        <span className={cl('value')}>{value}</span>
    </div>
  )
}

export default ProfileItemRow