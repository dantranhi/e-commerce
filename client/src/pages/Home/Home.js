import React from 'react'

import useFetch from '../../hooks/useFetch'

import Hero from '../../components/Hero'
import Featured from '../../components/Featured'
import Intro from '../../components/Intro'
import ProductOfType from '../../components/ProductOfType'

function Home() {
    const { data: allTypes, typeLoading } = useFetch('/product/type')
    const { data: products, loading } = useFetch('/product')
    
    return (
        <>
            <Hero></Hero>
            <Intro></Intro>
            <Featured></Featured>
            {typeLoading ? 'Loading' : allTypes.map(type => (
                <ProductOfType title={type.name} key={type._id} data={products.filter(i => i.type === type.name)}></ProductOfType>
            ))}
        </>
    )
}

export default Home