import React from 'react'

import classNames from 'classnames/bind';
import styles from './Hero.module.scss';
const cl = classNames.bind(styles);

function Hero() {
    return (
        <div className={cl('outter')}>
            <div className="grid wide">
                <div className={cl('inner')}>
                    <h1 className={cl('title')}>Rest, Relax, Unwind</h1>
                    <h3 className={cl('text')}>embrace your choices - we do</h3>
                    <button className={cl('shop')}>Shop now</button>
                </div>
            </div>
        </div>
    )
}

export default Hero