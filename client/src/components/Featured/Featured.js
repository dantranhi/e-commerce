import React from 'react'

import ProductItem from '../ProductItem'

import classNames from 'classnames/bind';
import styles from './Featured.module.scss';
const cl = classNames.bind(styles);

function Featured() {
  return (
    <div className={cl('wrapper')}>
        <div className="grid wide">
            <div className={cl('title')}>
                <span className={cl('line')}></span>
                Featured
                <span className={cl('line')}></span>
            </div>
            <div className={cl('products')}>
              <div className="row">
                <div className="col l-4 m-6 c-12">
                    <ProductItem></ProductItem>
                </div>
                <div className="col l-4 m-6 c-12">
                    <ProductItem></ProductItem>
                </div>
                <div className="col l-4 m-6 c-12">
                    <ProductItem></ProductItem>
                </div>
                <div className="col l-4 m-6 c-12">
                    <ProductItem></ProductItem>
                </div>
              </div>
              <div className={cl('all')}>All products</div>
            </div>
        </div>
    </div>
  )
}

export default Featured