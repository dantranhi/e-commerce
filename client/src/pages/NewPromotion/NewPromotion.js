import React from 'react'

import PromtionForm from '../../components/PromotionForm'

import classNames from 'classnames/bind';
import styles from './NewPromotion.module.scss';
const cl = classNames.bind(styles);

function NewPromotion() {
    return (
        <div className={cl('wrapper')}>
            <div className={`grid wide`}>
                <div className={cl('title')}>Thêm chương trình khuyến mãi</div>
                <PromtionForm></PromtionForm>
            </div>
        </div>
    )
}

export default NewPromotion