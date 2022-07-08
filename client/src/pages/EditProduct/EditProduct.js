import React, { useLayoutEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import ProductForm from '../../components/ProductForm'


import classNames from 'classnames/bind';
import styles from '../NewProduct/NewProduct.module.scss';
const cl = classNames.bind(styles);

function EditProduct() {
    const params = useParams()
 
    return (
        <div className={cl('wrapper')}>
            <div className={`grid wide`}>
                <div className={cl('title')}>Chỉnh sửa thông tin sản phẩm</div>
                <ProductForm edit={params.id}></ProductForm>
            </div>
        </div>
    )
}

export default EditProduct