import React from 'react'
import 'react-toastify/dist/ReactToastify.css';

import ProductForm from '../../components/ProductForm'

import classNames from 'classnames/bind';
import styles from './NewProduct.module.scss';
const cl = classNames.bind(styles);

function NewProduct() {

    return (
        <div className={cl('wrapper')}>
            <div className={`grid wide`}>
                <div className={cl('title')}>Thêm sản phẩm</div>
                <ProductForm></ProductForm>
            </div>
        </div>
    )
}

export default NewProduct