import React, { useState, useEffect } from 'react'
import axios from 'axios'

import httpRequest, { get } from '../../utils/httpRequest'
import useValidate from '../../hooks/useValidate'
import image from '../../assets/img/image.png'
import { Dropdown } from '../../components/Dropdown'
import ValidateMessage from '../../components/ValidateMessage'

import classNames from 'classnames/bind';
import styles from './NewProduct.module.scss';
const cl = classNames.bind(styles);

function NewProduct() {
    const [errors, setErrors] = useState([])
    const [allTypes, setAllTypes] = useState([])
    const [allBrands, setAllBrands] = useState([])
    const [addType, setAddType] = useState(false)
    const [addBrand, setAddBrand] = useState(false)
    const [formFields, setFormFields] = useState({
        name: '',
        brand: '',
        desc: '',
        price: '',
        type: '',
        modelYear: new Date().getFullYear(),
        photos: '',
        stock: ''
    })

    const [temporaryImages, setTemporaryImages] = useState([])

    useEffect(() => {
        async function fetchAllTypes() {
            try {
                const res1 = await get('/product/type')
                const res2 = await get('/product/brand')
                if (!res1.message) {
                    setAllTypes(res1)
                }
                else console.log(res1.message)

                if (!res2.message) {
                    setAllBrands(res2)
                }
                else console.log(res2.message)
            }
            catch (err) {
                console.log(err)
            }
        }

        fetchAllTypes()
    }, [])

    const handleChange = ({ name, value, files }) => {
        setFormFields(prev => (
            {
                ...prev,
                [name]: files ? files : value
            }
        ))

        if (files) {
            let imgArray = []
            const arr = [...files]
            arr.forEach((file) => {
                const value = URL.createObjectURL(file)
                imgArray.push(value)
            })
            setTemporaryImages(imgArray)
        }

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
                        data, {
                        withCredentials: false
                    }
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
            else console.log('Product created')
        } catch (error) {

        }
    }


    const handleNewType = () => {
        setAddType(prev => !prev)
        setFormFields(prev => (
            {
                ...prev,
                type: ''
            }
        ))
    }

    const handleNewBrand = () => {
        setAddBrand(prev => !prev)
        setFormFields(prev => (
            {
                ...prev,
                brand: ''
            }
        ))
    }

    const handleChooseBrand = (item) => {
        setFormFields(prev => (
            {
                ...prev,
                brand: item
            }
        ))
    }

    const handleChooseType = (item) => {
        setFormFields(prev => (
            {
                ...prev,
                type: item
            }
        ))
    }

    return (
        <div className={cl('wrapper')}>
            <div className={`grid wide`}>
                <div className={cl('title')}>Thêm sản phẩm</div>
                <form onSubmit={handleSubmit} className={cl('form')}>
                    <div className={cl('group')}>
                        <label className={cl('label')} htmlFor="name">Name: </label>
                        <input className={cl('input')} type="text" id="name" name="name" placeholder="Name" value={formFields.name} onChange={(e) => handleChange(e.target)} />
                        {/* <div className={cl('validate-error')}>{useValidate(errors, 'name')}</div> */}
                        <ValidateMessage name='name' errors={errors}></ValidateMessage>
                    </div>

                    <div className={cl('group')}>
                        <label className={cl('label')} htmlFor="brand">Brand: </label>
                        <div className={cl('type-wrapper')}>
                            {addBrand ?
                                (<input
                                    className={cl('input')}
                                    type="text"
                                    id="brand"
                                    name="brand"
                                    placeholder="Brand"
                                    value={formFields.brand}
                                    onChange={(e) => handleChange(e.target)}
                                />)
                                :
                                <Dropdown name="brand" data={allBrands}>
                                    <Dropdown.Content label="Choose product brand">
                                        <Dropdown.Search></Dropdown.Search>
                                        <Dropdown.List onChoose={handleChooseBrand}></Dropdown.List>
                                    </Dropdown.Content>
                                </Dropdown>
                            }
                            <div className={cl('type-btn')} onClick={handleNewBrand}>{addBrand ? 'Choose' : 'Add new'}</div>
                        </div>
                        <div className={cl('validate-error')}>{useValidate(errors, 'brand')}</div>
                    </div>

                    <div className={cl('group')}>
                        <label className={cl('label')} htmlFor="desc">Description: </label>
                        <textarea className={cl('input')} type="text" id="desc" name="desc" placeholder="Description" value={formFields.desc} onChange={(e) => handleChange(e.target)} />
                        <div className={cl('validate-error')}>{useValidate(errors, 'desc')}</div>
                    </div>


                    <div className={cl('group')}>
                        <label className={cl('label')} htmlFor="price">Price: </label>
                        <input className={cl('input')} type="number" min="0" max="999999999" id="price" name="price" placeholder="Price" value={formFields.price} onChange={(e) => handleChange(e.target)} />
                        <div className={cl('validate-error')}>{useValidate(errors, 'price')}</div>
                    </div>

                    <div className={cl('group')}>
                        <label className={cl('label')} htmlFor="type">Type: </label>
                        <div className={cl('type-wrapper')}>
                            {addType ?
                                (<input
                                    className={cl('input')}
                                    type="text" id="type"
                                    name="type"
                                    placeholder="Type"
                                    value={formFields.type}
                                    onChange={(e) => handleChange(e.target)}
                                />)
                                : (<Dropdown data={allTypes}>
                                    <Dropdown.Content label="Choose product type">
                                        {/* <Dropdown.Search></Dropdown.Search> */}
                                        <Dropdown.List onChoose={handleChooseType}></Dropdown.List>
                                    </Dropdown.Content>
                                </Dropdown>)}
                            <div className={cl('type-btn')} onClick={handleNewType}>{addType ? 'Choose' : 'Add new'}</div>
                        </div>

                    </div>


                    <div className={cl('group')}>
                        <label className={cl('label')} htmlFor="modelYear">Model year: </label>
                        <input className={cl('input')} type="number" id="modelYear" name="modelYear" placeholder="Model Year" value={formFields.modelYear} onChange={(e) => handleChange(e.target)} />
                        <div className={cl('validate-error')}>{useValidate(errors, 'modelYear')}</div>
                    </div>

                    <div className={cl('group')}>
                        <label className={cl('label', 'file-label')} htmlFor="file">
                            <span>Image:</span>
                            <ul className={cl('image-list')}>
                                {temporaryImages.map((img, index) => (
                                    <li key={index} className={cl('image-item')}>
                                        <img src={img} alt="uploaded" className={cl('upload-img')} />
                                    </li>
                                ))}
                            </ul>
                            <img className={cl('upload-img')} src={image} alt="" />
                        </label>
                        <input
                            className={cl('input', 'file')}
                            type="file"
                            id="file"
                            name="photos"
                            multiple
                            onChange={(e) => handleChange(e.target)}
                        />
                        <div className={cl('validate-error')}>{useValidate(errors, 'photos')}</div>
                    </div>

                    <div className={cl('group')}>
                        <label className={cl('label')} htmlFor="stock">Stock: </label>
                        <input className={cl('input')} type="number" min="0" max="1000" id="stock" name="stock" placeholder="Stock" value={formFields.stock} onChange={(e) => handleChange(e.target)} />
                        <div className={cl('validate-error')}>{useValidate(errors, 'stock')}</div>
                    </div>

                    <button className={cl('submit')}>Add</button>
                </form>
            </div>
        </div>
    )
}

export default NewProduct