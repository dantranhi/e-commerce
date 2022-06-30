import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'

import ProductItem from '../ProductItem'
import { get } from '../../utils/httpRequest'
import Button from '../Button'

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
              <Link to={`/products/${productItem._id}`} key={productItem._id} className="col l-4 m-6 c-12 mt-4">
                <ProductItem data={productItem}></ProductItem>
              </Link>
            ))}
          </div>
          <Button primary>All products</Button>
        </div>
      </div>
    </div>
  )
}

export default Featured