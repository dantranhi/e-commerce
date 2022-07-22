import { useState, useRef, useCallback } from 'react'
import { Input, Typography, Space } from 'antd'
import { SearchOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'

import useProductFetch from '../../hooks/useProductFetch';
import ProductItem from '../../components/ProductItem'
import classNames from 'classnames/bind';
import AnimatedLoading from '../../components/Icons/AnimatedLoading'

import styles from './SearchProduct.module.scss';
const cl = classNames.bind(styles);
const { Title } = Typography

function SearchProduct() {
    const [searchValue, setSearchValue] = useState('')
    const [pageNumber, setPageNumber] = useState(1)

    const [products, loading, error, hasMore] = useProductFetch(searchValue, pageNumber)

    const observer = useRef()
    const lastProductElementRef = useCallback(node => {
        if (loading) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore)
                setPageNumber(prev => prev + 1)
        })
        if (node) observer.current.observe(node)
    }, [loading, hasMore])


    const handleChangeSearchValue = (e) => {
        setSearchValue(e.target.value)
        setPageNumber(1)
    }
    return (
        <div>
            <div className={cl('wrapper')}>
                <div className="grid wide">
                    <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                        <Title className={cl('title')}>Search products:</Title>
                        <Input
                            size="large"
                            className={cl('search')}
                            type="text"
                            value={searchValue}
                            placeholder="Search product"
                            onChange={handleChangeSearchValue}
                            prefix={<SearchOutlined />}
                        />
                        <div className="row">
                            {products.map((item, index) => {
                                if (index === products.length - 1)
                                    return <Link to={`/product/${item._id}`} key={item._id} className={`col l-4 m-6 c-6 mt-4`}><ProductItem ref={lastProductElementRef} data={item}></ProductItem></Link>
                                return <Link to={`/product/${item._id}`} key={item._id} className={`col l-4 m-6 c-6 mt-4`}><ProductItem data={item} ></ProductItem></Link>
                            })}
                        </div>
                        {loading && <div className="full center"><AnimatedLoading width='140px' height='140px'/></div>}
                        {error && <div>Error</div>}
                    </Space>

                </div>
            </div>
        </div >
    )
}

export default SearchProduct