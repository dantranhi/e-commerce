import React from 'react'
import classNames from 'classnames/bind';
import styles from './Intro.module.scss';
const cl = classNames.bind(styles);

function IntroItem({ image, name, desc, reverse }) {
    return (
        <div className={cl('item-wrapper', {reverse: reverse})}>
            <div className={cl('item-image')}>
                <img src={image || null} alt="" className={cl('item-img')} />
            </div>
            <div className={cl('item-info', {reverse: reverse})}>
                <div className={cl('item-name')}>{name}</div>
                <div className={cl('item-desc')}>{desc}</div>
            </div>
        </div>
    )
}

export default IntroItem