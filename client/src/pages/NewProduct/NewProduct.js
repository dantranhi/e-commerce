import React, { useState } from 'react'
import axios from 'axios'

import httpRequest from '../../utils/httpRequest'
import useValidate from '../../hooks/useValidate'

import classNames from 'classnames/bind';
import styles from './NewProduct.module.scss';
const cl = classNames.bind(styles);

function NewProduct() {
    const [errors, setErrors] = useState([])
    console.log(errors)
    const [formFields, setFormFields] = useState({
        name: '',
        desc: '',
        price: '',
        type: '',
        modelYear: new Date().getFullYear(),
        photos: '',
    })

    const handleChange = ({ name, value, files }) => {
        setFormFields(prev => (
            {
                ...prev,
                [name]: files ? files : value
            }
        ))

    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const list = await Promise.all(
                Object.values(formFields.photos).map(async (file) => {
                    const data = new FormData();
                    data.append("file", file);
                    data.append("upload_preset", "upload");
                    const uploadRes = await axios.post(
                        "https://api.cloudinary.com/v1_1/dauu0vpgc/image/upload",
                        data
                    );

                    const { url } = uploadRes.data;
                    return url;
                })
            );

            const newProduct = {
                ...formFields,
                photos: list,
            };
            const res = await httpRequest.post('/product/create', newProduct)
            if (res.data.errors) {
                setErrors(res.data.errors)
            }
        } catch (error) {

        }
    }
    return (
        <div className="grid wide">
            <div className={cl('title')}>Thêm sản phẩm</div>
            <form onSubmit={handleSubmit} className={cl('form')}>
                <div className={cl('group')}>
                    <label className={cl('label')} htmlFor="name">Name: </label>
                    <input className={cl('input')} type="text" id="name" name="name" placeholder="Name" value={formFields.name} onChange={(e) => handleChange(e.target)} />
                    <div className={cl('validate-error')}>{useValidate(errors, 'name')}</div>
                </div>

                <div className={cl('group')}>
                    <label className={cl('label')} htmlFor="desc">Description: </label>
                    <input className={cl('input')} type="text" id="desc" name="desc" placeholder="Description" value={formFields.desc} onChange={(e) => handleChange(e.target)} />
                    <div className={cl('validate-error')}>{useValidate(errors, 'desc')}</div>
                </div>


                <div className={cl('group')}>
                    <label className={cl('label')} htmlFor="price">Price: </label>
                    <input className={cl('input')} type="number" min="0" max="999999999" id="price" name="price" placeholder="Price" value={formFields.price} onChange={(e) => handleChange(e.target)} />
                    <div className={cl('validate-error')}>{useValidate(errors, 'price')}</div>
                </div>

                <div className={cl('group')}>
                    <label className={cl('label')} htmlFor="type">Type: </label>
                    <input className={cl('input')} type="text" id="type" name="type" placeholder="Type" value={formFields.type} onChange={(e) => handleChange(e.target)} />
                    <div className={cl('validate-error')}>{useValidate(errors, 'type')}</div>
                </div>


                <div className={cl('group')}>
                    <label className={cl('label')} htmlFor="modelYear">Model year: </label>
                    <input className={cl('input')} type="text" id="modelYear" name="modelYear" placeholder="Model Year" value={formFields.modelYear} onChange={(e) => handleChange(e.target)} />
                    <div className={cl('validate-error')}>{useValidate(errors, 'modelYear')}</div>
                </div>

                <div className={cl('group')}>
                    <label className={cl('label')} htmlFor="file">
                        Image:
                    </label>
                    <input
                        className={cl('input', 'file')}
                        type="file"
                        id="file"
                        name="photos"
                        multiple
                        onChange={(e) => handleChange(e.target)}
                    // style={{ display: "none" }}
                    />
                    <div className={cl('validate-error')}>{useValidate(errors, 'photos')}</div>
                </div>


                <button className={cl('submit')}>Add</button>
            </form>
        </div>
    )
}

export default NewProduct