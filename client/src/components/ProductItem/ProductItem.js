import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'


import {useStore} from '../../store/UserContext'
import {addToCart} from '../../store/actions'
import classNames from 'classnames/bind';
import styles from './ProductItem.module.scss';
const cl = classNames.bind(styles);

function ProductItem({ data }) {
  const [state, dispatch] = useStore()
  const handleAddToCart = (e) => {
    e.preventDefault();
    dispatch(addToCart({
      name: data.name,
      photo: data.photos[0],
      price: data.price,
    }))
  }

  return (
    <div className={cl('wrapper')}>
      <div className={cl('img-wrapper')}>
        <img src={data.photos[0] || "https://dl.airtable.com/.attachments/14ac9e946e1a02eb9ce7d632c83f742f/4fd98e64/product-1.jpeg"} alt="" className={cl('img')} />
        <div className={cl('options')}>
          <span onClick={handleAddToCart} className={cl('icon-wrapper')}><FontAwesomeIcon className={cl('options-icon')} icon={faCartPlus} /></span>
        </div>
      </div>
      <div className={cl('info')}>
        <div className={cl('name')}>{data.name}</div>
        <div className={cl('price')}>{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(data.price)}</div>
      </div>
    </div>
  )
}

export default ProductItem