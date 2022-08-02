import { useState, useEffect } from 'react'
// import httpRequest from '../utils/httpRequest'
import axios from 'axios'

function useProductFetch(query, pageNumber = 1, queries, priceRange, sort) {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [products, setProducts] = useState([])
    const [hasMore, setHasMore] = useState(false)

    useEffect(() => {
        setProducts([])
    }, [query, queries, priceRange, sort])

    useEffect(() => {
        setLoading(true)
        setError(false)
        let cancel
        const debounceId = setTimeout(() => {
            axios({
                method: 'GET',
                url: 'http://localhost:5000/product/grid',
                // url: 'https://ecommerce-dantocthang.herokuapp.com/product/grid',
                params: {
                    q: query,
                    page: pageNumber,
                    limit: 6, 
                    ...queries,
                    minprice: priceRange[0],
                    maxprice: priceRange[1],
                    sort: sort
                },
                withCredentials: false,
                cancelToken: new axios.CancelToken(c => cancel = c)
            })
                .then(res => {
                    setProducts(prev => {
                        return [...prev, ...res.data.data]
                    })

                    setHasMore(res.data.currentPage.page < res.data.pages)
                    setLoading(false)
                })
                .catch(e => {
                    if (axios.isCancel(e)) return
                    setError(true)
                })
        }, 500)


        return () => {
            if (typeof cancel !== 'undefined') cancel()
            clearTimeout(debounceId)
        }
    }, [query, pageNumber, queries, priceRange, sort])
    return [products, loading, error, hasMore]
}

export default useProductFetch


