import React, { useState, useEffect } from 'react'

import ProductItem from '../ProductItem'
import { get } from '../../utils/httpRequest'

import classNames from 'classnames/bind';
import styles from './Featured.module.scss';
const cl = classNames.bind(styles);

function Featured() {
  const [products, setProducts] = useState([])
  useEffect(() => {
    async function fetchFeaturedProduct() {
      const data = await get('/product')
      setProducts(data)
    }
    fetchFeaturedProduct()
  }, [])

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
            {products.map(productItem => (
              <div key={productItem._id} className="col l-4 m-6 c-12 mt-4">
                <ProductItem data={productItem}></ProductItem>
              </div>
            ))}
          </div>
          <div className={cl('all')}>All products</div>
        </div>
      </div>
    </div>
  )
}

export default Featured