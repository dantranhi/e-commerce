import { useState, useRef, useCallback } from 'react'
import { Input } from 'antd'

import useProductFetch from '../../hooks/useProductFetch';
import ProductItem from '../../components/ProductItem'
import classNames from 'classnames/bind';
import styles from './SearchProduct.module.scss';
const cl = classNames.bind(styles);

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
                    <Input type="text" value={searchValue} onChange={handleChangeSearchValue} />
                    {products.map((item, index) => {
                        if (index === products.length - 1)
                            return <ProductItem ref={lastProductElementRef} data={item} key={item._id}></ProductItem>
                        return <ProductItem data={item} key={item._id}></ProductItem>
                    })}
                    {loading && <div>Loading...</div>}
                    {error && <div>Error</div>}
                </div>
            </div>
        </div >
    )
}

export default SearchProduct