import React from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types';

import classNames from 'classnames/bind';
import styles from './MultiLevelNav.module.scss';
const cl = classNames.bind(styles);

function MultiLevelNav({list}) {
  return (
    <div className={cl('wrapper')}>
        <div className={`grid wide ${cl('inner')}`}>
            {list.map((item, index)=>{
                return (<Link className={cl('link')} key={index} to={item.path}>{item.label}</Link>)
            })}
        </div>
    </div>
  )
}

MultiLevelNav.propTypes = {
  list: PropTypes.array.isRequired
}

export default MultiLevelNav