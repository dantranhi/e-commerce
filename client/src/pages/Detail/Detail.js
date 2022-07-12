import React, { useLayoutEffect, useState, useEffect } from 'react'
import Slider from "react-slick";
import { useParams } from 'react-router-dom'

import { useStore } from '../../store/UserContext'
import { addToCart, clearCartError } from '../../store/actions'
import { get } from '../../utils/httpRequest'
import useFetch from '../../hooks/useFetch'
import MultiLevelNav from '../../components/MultiLevelNav'
import Button from '../../components/Button'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import classNames from 'classnames/bind';
import styles from './Detail.module.scss';
const cl = classNames.bind(styles);

function Detail() {
    const [state, dispatch] = useStore()
    const params = useParams()
    
    const { data: product, loading } = useFetch(`/product/${params.id}`)
    useEffect(() => {
        let timerId
        if (state.cart.error) {
            timerId = setTimeout(() => {
                dispatch(clearCartError())
            }, 3000)
        }

        return () => clearTimeout(timerId)
    }, [state.cart])


    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        dotsClass: "slick-dots slick-thumb",
        customPaging: function (i) {
            return (
                <a className={cl('mini-link')}>
                    <img className={cl('mini-img')} src={loading ? '' : product.photos[i].url} alt="" />
                </a>
            )
        },
    };

    return (
        <>
            <MultiLevelNav list={[{ label: 'Home', path: '/' }, { label: 'Product', path: `/product/${product?._id}` }]}></MultiLevelNav>
            <div className={cl('wrapper')}>
                <div className='grid wide'>
                    <div className={cl('inner')}>
                        <div className={cl('img-list')}>
                            <Slider className={cl('img-list')} {...settings}>
                                {!loading && Object.keys(product).length>0 && product.photos.map(item => (
                                    <img key={item._id} src={item.url} alt="mini-img" className={cl('img')} />
                                ))}
                            </Slider>
                        </div>
                        <div className={cl('info')}>
                            <div className={cl('name')}>
                                {loading ? 'LOADING' : product.name}
                            </div>
                            <div className={cl('brand')}>{product?.brand || 'MSI'}</div>
                            <div className={cl('price')}>{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(loading ? 'LOADING' : product?.price)}</div>
                            <div className={cl('desc')}>
                                {loading ? 'LOADING' : product?.desc}
                            </div>
                            {loading ? 'LOADING' : product.stock > 0 ? (<Button onClick={() => dispatch(addToCart(product))} className={cl('buy')} primary>Add to cart</Button>) : (<Button className={cl('buy')} primary>Out of stock</Button>)}
                            {state.cart.error ? (<div className={cl('error')}>{state.cart.error}</div>) : <></>}

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Detail