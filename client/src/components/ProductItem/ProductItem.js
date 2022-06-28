import React from 'react'

import classNames from 'classnames/bind';
import styles from './ProductItem.module.scss';
const cl = classNames.bind(styles);

function ProductItem() {
  return (
    <div className={cl('wrapper')}>
        <img src="https://dl.airtable.com/.attachments/14ac9e946e1a02eb9ce7d632c83f742f/4fd98e64/product-1.jpeg" alt="" className={cl('img')} />
        <div className={cl('info')}>
            <div className={cl('name')}>fdsfsa</div>
            <div className={cl('price')}>$ 99.99</div>
        </div>
    </div>
  )
}

export default ProductItem