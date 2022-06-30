import React from 'react'
import styles from './Home.module.scss';

import Hero from '../../components/Hero'
import Featured from '../../components/Featured'


import classNames from 'classnames/bind';
const cl = classNames.bind(styles);

function Home() {
    return (
        <>
            <Hero></Hero>
            <Featured></Featured>

        </>
    )
}

export default Home