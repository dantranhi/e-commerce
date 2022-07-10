import React, { useState, useEffect } from 'react'

import FeaturedItems from './FeaturedItems'
import { get } from '../../utils/httpRequest'
import Button from '../Button'
import Pagination from '../Pagination'
import useFetch from '../../hooks/useFetch'


import classNames from 'classnames/bind';
import styles from './Featured.module.scss';
const cl = classNames.bind(styles);

function Featured() {
  const [products, setProducts] = useState([])
  const { data, loading, error} = useFetch('/product/grid')
  
  useEffect(() =>{
    setProducts(data)
  },[data])

  const handleFetchPage = async (page) => {
    const data = await get(`/product/grid?page=${page}`)
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
          {loading || error ? 'Loading' : <>
            <div className="row">
              <FeaturedItems products={products.data || []}></FeaturedItems>
            </div>
            <Pagination {...products} onFetchNewData={handleFetchPage}></Pagination>
          </>}
          <Button primary >All products</Button>
        </div>
      </div>
    </div>
  )
}

export default Featured