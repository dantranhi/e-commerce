import React from 'react'
import { useParams } from 'react-router-dom'
import PromotionForm from '../../components/PromotionForm'


import classNames from 'classnames/bind';
import styles from '../NewPromotion/NewPromotion.module.scss';
const cl = classNames.bind(styles);

function EditPromotion() {
    const { id: promotionId } = useParams()

    return (
        <div className={cl('wrapper')}>
            <div className={`grid wide`}>
                <div className={cl('title')}>Thêm chương trình khuyến mãi</div>
                <PromotionForm edit={promotionId}></PromotionForm>
            </div>
        </div>
    )
}

export default EditPromotion