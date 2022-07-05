import React, { useState, useEffect } from 'react'

import FeaturedItems from './FeaturedItems'
import { get } from '../../utils/httpRequest'
import Button from '../Button'
import Pagination from '../Pagination'


import classNames from 'classnames/bind';
import styles from './Featured.module.scss';
const cl = classNames.bind(styles);

function Featured() {
  const [products, setProducts] = useState([])
  useEffect(() => {
    async function fetchFeaturedProduct() {
      const data = await get('/product')
      console.log(data)
      setProducts(data)
    }
    fetchFeaturedProduct()
  }, [])

  const handleFetchPage = async (page) => {
    const data = await get(`/product?page=${page}`)
    setProducts(data)
  }

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
            <FeaturedItems products={products.data}></FeaturedItems>
          </div>
          <Pagination {...products} onFetchNewData={handleFetchPage}></Pagination>
          <Button primary>All products</Button>
        </div>
      </div>
    </div>
  )
}

export default Featured