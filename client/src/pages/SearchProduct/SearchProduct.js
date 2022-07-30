import { useState, useRef, useCallback } from 'react'
import { Input, Typography, Space, Checkbox, Button } from 'antd'
import { SearchOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'

import useProductFetch from '../../hooks/useProductFetch';
import useFetch from '../../hooks/useFetch'
import ProductItem from '../../components/ProductItem'
import classNames from 'classnames/bind';
import AnimatedLoading from '../../components/Icons/AnimatedLoading'

import styles from './SearchProduct.module.scss';
const cl = classNames.bind(styles);
const { Title } = Typography

function SearchProduct() {
    const [searchValue, setSearchValue] = useState('')
    const [pageNumber, setPageNumber] = useState(1)
    const [queries, setQueries] = useState({type: '', brand: ''})
    const [filterType, setFilterType] = useState([])
    const [filterBrand, setFilterBrand] = useState([])

    const { data: allTypes } = useFetch('/product/type')
    const { data: allBrands } = useFetch('/product/brand')

    const [products, loading, error, hasMore] = useProductFetch(searchValue, pageNumber, queries)

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
        setPageNumber(1)
        setSearchValue(e.target.value)
    }

    const handleChangeFilterType = (e, typeName) => {
        let newType = [...filterType]
        if (e.target.checked) newType.push(typeName)
        else newType = newType.filter(i=>i!==typeName)
        setFilterType(newType)
    }

    const handleChangeFilterBrand = (e, brandName) => {
        let newBrand = [...filterBrand]
        if (e.target.checked) newBrand.push(brandName)
        else newBrand = newBrand.filter(i=>i!==brandName)
        setFilterBrand(newBrand)
    }

    const handleFilterProducts = () => {
        setPageNumber(1)
        setQueries({
            type: `${filterType.join(',')}`,
            brand: `${filterBrand.join(',')}`,
        })
    }

    console.log(pageNumber)
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
                            <div className="col l-3 m-4 c-12">
                                <div className={cl('filter-title')}>Filter</div>
                                <div className={cl('filter-type')}>
                                    <div className={cl('filter-subheading')}>Type</div>
                                    <ul className={cl('filter-type-list')}>
                                        {allTypes && allTypes.map(item => (
                                            <li key={item._id} className={cl('filter-type-item')}>
                                                <Checkbox onChange={(e) => handleChangeFilterType(e,item.name)}>{item.name}</Checkbox>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className={cl('filter-type')}>
                                    <div className={cl('filter-subheading')}>Brand</div>
                                    <ul className={cl('filter-type-list')}>
                                        {allBrands && allBrands.map(item => (
                                            <li key={item._id} className={cl('filter-type-item')}>
                                                <Checkbox onChange={(e) => handleChangeFilterBrand(e,item.name)}>{item.name}</Checkbox>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <Button onClick={handleFilterProducts} type="primary">Filter now!</Button>
                            </div>
                            <div className="col l-9 m-8 c-12">
                                <div className="row">
                                    {products.map((item, index) => {
                                        if (index === products.length - 1)
                                            return <Link to={`/product/${item._id}`} key={item._id} className={`col l-4 m-6 c-6 mt-4`}><ProductItem ref={lastProductElementRef} data={item}></ProductItem></Link>
                                        return <Link to={`/product/${item._id}`} key={item._id} className={`col l-4 m-6 c-6 mt-4`}><ProductItem data={item} ></ProductItem></Link>
                                    })}
                                </div>
                            </div>
                        </div>
                        {loading && <div className="full center"><AnimatedLoading width='100px' height='100px' /></div>}
                        {error && <div>Error</div>}
                    </Space>

                </div>
            </div>
        </div >
    )
}

export default SearchProduct