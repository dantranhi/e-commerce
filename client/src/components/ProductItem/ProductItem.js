import { forwardRef, useMemo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus, faGift, faHeart } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'

import formatCurrency from '../../utils/formatCurrency'
import { useStore } from '../../store/UserContext'
import { addToCart } from '../../store/actions'
import httpRequest from '../../utils/httpRequest'
import classNames from 'classnames/bind';
import styles from './ProductItem.module.scss';
import { toast } from 'react-toastify'
const cl = classNames.bind(styles);

function ProductItem({ data }, ref) {
  const navigate = useNavigate()
  const [state, dispatch] = useStore()
  const handleAddToCart = (e) => {
    e.preventDefault();
    dispatch(addToCart(data))
  }

  const handleAddToWishlist = async (e, productId) => {
    e.preventDefault()
    e.stopPropagation();
    console.log('clicked')
    if (!state.userData?.details?._id) {
      navigate('/login')
      return
    }
    try {
      const res = await httpRequest.post(`/user/${state.userData.details._id}/add-to-wishlist`, { productId: productId })
      if (res.data.success)
        toast.success(res.data.message)
    } catch (error) {
      toast.error('Somthing went wrong!')
    }
  }

  const discount = useMemo(() => Math.floor(parseFloat(data.oldPrice - data.price) * 100 / data.oldPrice))

  return (
    <div ref={ref} className={cl('wrapper')}>
      {discount !== 0 && <div className={cl('tag')}>
        {`- ${discount}%`}
      </div>}
      {data.gifts.length > 0 && <div className={cl('present')}>
        <FontAwesomeIcon className={cl('present-icon')} icon={faGift} />
      </div>}
      <div className={cl('wishlist')} onClick={(e) => handleAddToWishlist(e, data._id)}>
        <FontAwesomeIcon className={cl('wishlist-icon')} icon={faHeart} />
      </div>
      <div className={cl('img-wrapper')}>
        <img src={data.photos[0]?.url || "https://dl.airtable.com/.attachments/14ac9e946e1a02eb9ce7d632c83f742f/4fd98e64/product-1.jpeg"} alt="" className={cl('img')} />
        <div className={cl('options')}>
          {data.stock > 0 ? (<span onClick={handleAddToCart} className={cl('icon-wrapper')}>
            <FontAwesomeIcon className={cl('options-icon')} icon={faCartPlus} />
          </span>) : <div className={cl('sold-out')}>Sold out</div>}
        </div>
      </div>
      <div className={cl('info')}>
        <div className={cl('name')}>{data.name}</div>
        <div className={cl('prices')}>
          <div className={cl('old-price')}>{formatCurrency(data.oldPrice)}</div>
          <div className={cl('price')}>{formatCurrency(data.price)}</div>
        </div>
      </div>
    </div>
  )
}


export default forwardRef(ProductItem)