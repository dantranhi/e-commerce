import React, { useEffect } from 'react'
import Slider from "react-slick";
import { useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGift } from '@fortawesome/free-solid-svg-icons'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useStore } from '../../store/UserContext'
import { addToCart, clearCartError } from '../../store/actions'
import formatCurrency from '../../utils/formatCurrency';
import useFetch from '../../hooks/useFetch'
import MultiLevelNav from '../../components/MultiLevelNav'
import Button from '../../components/Button'
import AnimatedLoading from '../../components/Icons/AnimatedLoading'

import classNames from 'classnames/bind';
import styles from './Detail.module.scss';
const cl = classNames.bind(styles);

function Detail() {
    const [state, dispatch] = useStore()
    const params = useParams()

    const { data: product, loading } = useFetch(`/product/${params.id}`)
    const { data: promotions, loading: promotionLoading } = useFetch(`/product/${params.id}/promotion`)


    useEffect(() => {
        let timerId
        if (state.cart.error) {
            timerId = setTimeout(() => {
                dispatch(clearCartError())
            }, 3000)
        }

        return () => clearTimeout(timerId)
    }, [state.cart, dispatch])


    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        dotsClass: "slick-dots slick-thumb",
        customPaging: function (i) {
            return (
                <span className={cl('mini-link')}>
                    <img className={cl('mini-img')} src={loading ? '' : product.photos[i].url} alt="" />
                </span>
            )
        },
    };

    return (
        <>
            <MultiLevelNav list={[{ label: 'Home', path: '/' }, { label: 'Product', path: `/product/${product?._id}` }]}></MultiLevelNav>
            <div className={cl('wrapper')}>
                <div className='grid wide'>
                    {
                        loading ? <div className="full center"><AnimatedLoading width='100px' height='100px' /></div> : (
                            <div className={cl('inner')}>
                                <div className={cl('img-list')}>
                                    <Slider className={cl('img-list')} {...settings}>
                                        {Object.keys(product).length > 0 && product.photos.map(item => (
                                            <img key={item._id} src={item.url} alt="mini-img" className={cl('img')} />
                                        ))}
                                    </Slider>
                                </div>
                                <div className={cl('info')}>
                                    <div className={cl('name')}>
                                        {product.name}
                                    </div>
                                    <div className={cl('brand')}>Brand: {product?.brand}</div>
                                    <div className={cl('prices')}>
                                        <div className={cl('old-price')}>{formatCurrency(product.oldPrice)}</div>
                                        <div className={cl('price')}>{formatCurrency(product.price)}</div>
                                    </div>
                                    <div className={cl('desc')}>
                                        {product?.desc}
                                    </div>
                                    {product.stock > 0 ? (<Button onClick={() => dispatch(addToCart(product))} className={cl('buy')} primary>Add to cart</Button>) : (<Button className={cl('buy')} primary>Out of stock</Button>)}
                                    {state.cart.error ? (<div className={cl('error')}>{state.cart.error}</div>) : <></>}
                                    {product?.gifts?.length > 0 &&
                                        (<div className={cl('gift-frame')}>
                                            <div className={cl('gift-title')}><FontAwesomeIcon className={cl('gift-icon')} icon={faGift} /> Gifts</div>
                                            {product?.gifts.map(g => (
                                                <div key={g._id} className={cl('gift-wrapper')}>
                                                    Get a free
                                                    <img src={g.giftPhoto} alt="" className={cl('gift-image')} />
                                                    <span className={cl('gift-name')}>{g.giftName}</span>
                                                    equivalent to value of
                                                    <span className={cl('gift-price')}>{formatCurrency(g.giftPrice)}</span>
                                                </div>
                                            ))}
                                        </div>)}

                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default Detail