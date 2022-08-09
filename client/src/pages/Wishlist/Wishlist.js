import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { Button } from 'antd'

import { addToCart } from '../../store/actions'
import formatCurrency from '../../utils/formatCurrency'
import useFetch from '../../hooks/useFetch'
import { useStore } from '../../store/UserContext'

import classNames from 'classnames/bind';
import styles from './Wishlist.module.scss';
import httpRequest from '../../utils/httpRequest'
import { toast } from 'react-toastify'
const cl = classNames.bind(styles);

function Wishlist() {
    const navigate = useNavigate()
    const [state, dispatch] = useStore()
    useEffect(() => {
        if (!state.userData?.details)
            navigate('/login')
    }, [])
    const { data: wishlistProducts, loading: wishlistLoading, reFetch } = useFetch(`/user/${state.userData?.details?._id}/wishlist`, state.userData?.details)

    const handleRemoveFromWishlist = async (productId) => {
        try {
            const res = await httpRequest.delete(`/user/${state.userData.details._id}/wishlist/${productId}`)
            if (res.data.success) {
                toast.success(res.data.message)
                reFetch()
            }
            else toast.error(res.data.message)
        } catch (error) {
            console.log(error)
        }
    }

    const handleAddToCart = (product) => {
        dispatch(addToCart(product))
    }

    return (
        <div className={cl('wrapper')}>
            <div className="grid wide">
                <div className={cl('title')}>
                    Your wishlist
                </div>
                <div className={cl('content')}>
                    <div className="row">
                        <div className="col l-3 m-4 c-12"></div>
                        <div className="col l-9 m-8 c-12">
                            <div className={cl('inner-wrapper')}>
                                <table className={cl('table')}>
                                    <thead>
                                        <tr>
                                            <th className={cl('t-head')}></th>
                                            <th className={cl('t-head')}></th>
                                            <th className={cl('t-head')}>Product name</th>
                                            <th className={cl('t-head')}>Price</th>
                                            <th className={cl('t-head')}>Stock status</th>
                                            <th className={cl('t-head')}>Price</th>
                                            <th className={cl('t-head')}></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {!wishlistLoading && wishlistProducts.length > 0 ? wishlistProducts.map(item => (
                                            <tr key={item._id}>
                                                <td className={cl('t-data')}>
                                                    <div onClick={() => handleRemoveFromWishlist(item._id)} className={cl('remove-icon-wrapper')}>
                                                        <FontAwesomeIcon className={cl('remove-icon')} icon={faXmark} />
                                                    </div>
                                                </td>
                                                <td className={cl('t-data')}>
                                                    <Link to={`/product`}>
                                                        <img src={item.photos[0].url} alt="" className={cl('img')} />
                                                    </Link>
                                                </td>
                                                <td className={cl('name', 't-data')}>
                                                    {item.name}
                                                </td>
                                                <td className={cl('price', 't-data')}>
                                                    {formatCurrency(item.price)}
                                                </td>
                                                <td>
                                                    <div className={cl('status', 't-data')}>
                                                        {item.stock > 0 ? 'In stock' : 'Out of stock'}
                                                    </div>
                                                </td>
                                                <td className={cl('t-data')}>
                                                    <Button onClick={() => handleAddToCart(item)} type="link" danger>
                                                        Add to cart
                                                    </Button>
                                                </td>
                                            </tr>
                                        )) : <tr><td>No data</td></tr>}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Wishlist