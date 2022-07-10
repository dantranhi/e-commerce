import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import { Select, Input } from 'antd';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpFromBracket, faPlus } from '@fortawesome/free-solid-svg-icons'

import useFetch from '../../hooks/useFetch'
import httpRequest, { get } from '../../utils/httpRequest'
import ValidateMessage from '../../components/ValidateMessage'

import classNames from 'classnames/bind';
import styles from './ProductForm.module.scss';
const cl = classNames.bind(styles);

const { Option } = Select
const { TextArea } = Input

function ProductForm({ edit }) {
    const [errors, setErrors] = useState([])
    const [allTypes, setAllTypes] = useState([])
    const [allBrands, setAllBrands] = useState([])
    const [addType, setAddType] = useState(false)
    const [addBrand, setAddBrand] = useState(false)
    const [appendImages, setAppendImages] = useState(false)
    const [defaultImages, setDefaultImages] = useState([])
    const [formFields, setFormFields] = useState({
        name: '',
        brand: '',
        desc: '',
        price: '',
        type: '',
        modelYear: new Date().getFullYear(),
        photos: [],
        stock: ''
    })

    const { data, loading, error, reFetch } = useFetch(`/product/${edit}`, !!edit)
    if (error) console.log(error)
    useEffect(() => {
        if (!Array.isArray(data)) {
            setFormFields(data)
            setDefaultImages([...data.photos])
        }
    }, [data])

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

    const handleChangeSelect = (value, field) => {
        setFormFields(prev => (
            {
                ...prev,
                [field]: value
            }
        ))
    }

    const handleSearchSelect = (value) => {
        console.log('search:', value);
    };


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const list = await Promise.all(
                Object.values(formFields.photos).map(async (file) => {
                    if (file instanceof File) {
                        const data = new FormData();
                        data.append("file", file);
                        data.append("upload_preset", "upload");
                        const uploadRes = await axios.post(
                            "https://api.cloudinary.com/v1_1/dauu0vpgc/image/upload",
                            data, {
                            withCredentials: false
                        }
                        );

                        const { url, public_id } = uploadRes.data;
                        return { url, public_id };
                    }
                    else return file
                })
            );

            const newProduct = {
                ...formFields,
                photos: appendImages ? [...defaultImages, ...list] : list,
            };
            console.log(newProduct)
            try {
                if (!edit) {
                    const res = await httpRequest.post('/product/create', newProduct)
                    if (res.data.errors) {
                        setErrors(res.data.errors)
                    }
                    else {
                        toast.success("Product created successfully")
                        setErrors([])
                    }
                }
                else {
                    const res = await httpRequest.put(`/product/${edit}`, newProduct)
                    if (res.data.success) {
                        toast.success("Product updated successfully")
                        setErrors([])
                    }
                    if (res.data.errors) {
                        setErrors(res.data.errors)
                        console.log(res.data)
                    }
                }
            }
            catch (err) {
                toast.error(err?.response?.data?.message || 'Undefined Error!')
            }

        } catch (error) {
            toast.error(error)
        }
    }



    return (
        <>
            <form onSubmit={handleSubmit} className={cl('form')}>
                <div className={cl('group')}>
                    <label className={cl('label')} htmlFor="name">Name: </label>
                    <Input type="text" id="name" name="name" placeholder="Name" value={formFields.name} onChange={(e) => handleChange(e.target)} />
                    <ValidateMessage name='name' errors={errors}></ValidateMessage>
                </div>

                <div className={cl('group')}>
                    <label className={cl('label')} htmlFor="brand">Brand: </label>
                    <div className={cl('type-wrapper')}>
                        {addBrand ?
                            (<Input
                                type="text"
                                id="brand"
                                name="brand"
                                placeholder="Brand"
                                value={formFields.brand}
                                onChange={(e) => handleChange(e.target)}
                            />)
                            :
                            (<Select
                                className={cl('select')}
                                showSearch
                                placeholder="Select brand"
                                value={edit ? formFields.brand : undefined}
                                optionFilterProp="children"
                                onChange={(value) => handleChangeSelect(value, 'brand')}
                                onSearch={handleSearchSelect}
                                filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                            >
                                {allBrands.map(item => (
                                    <Option key={item._id} value={item.name}>{item.name}</Option>
                                ))}
                            </Select>)
                        }
                        <div className={cl('type-btn')} onClick={handleNewBrand}>{addBrand ? 'Choose' : 'Add new'}</div>
                    </div>
                    <ValidateMessage name='brand' errors={errors}></ValidateMessage>
                </div>

                <div className={cl('group', 'textarea-group')}>
                    <label className={cl('label')} htmlFor="desc">Description: </label>
                    <TextArea className={cl('textarea')} rows={5} placeholder="Max desc length is 500" maxLength={500} name="desc" value={formFields.desc} onChange={(e) => handleChange(e.target)} />
                    <ValidateMessage name='desc' errors={errors}></ValidateMessage>
                </div>


                <div className={cl('group')}>
                    <label className={cl('label')} htmlFor="price">Price: </label>
                    <Input type="number" min="0" max="999999999" id="price" name="price" placeholder="Price" value={formFields.price} onChange={(e) => handleChange(e.target)} />
                    <ValidateMessage name='price' errors={errors}></ValidateMessage>
                </div>

                <div className={cl('group')}>
                    <label className={cl('label')} htmlFor="type">Type: </label>
                    <div className={cl('type-wrapper')}>
                        {addType ?
                            (<Input
                                type="text"
                                id="type"
                                name="type"
                                placeholder="Type"
                                value={formFields.type}
                                onChange={(e) => handleChange(e.target)}
                            />)
                            : (<Select
                                className={cl('select')}
                                showSearch
                                value={edit ? formFields.type : undefined}
                                placeholder="Select type"
                                optionFilterProp="children"
                                onChange={(value) => handleChangeSelect(value, 'type')}
                                onSearch={handleSearchSelect}
                                filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                            >
                                {allTypes.map(item => (
                                    <Option key={item._id} value={item.name}>{item.name}</Option>
                                ))}
                            </Select>)}
                        <div className={cl('type-btn')} onClick={handleNewType}>{addType ? 'Choose' : 'Add new'}</div>
                    </div>
                    <ValidateMessage name='type' errors={errors}></ValidateMessage>
                </div>


                <div className={cl('group')}>
                    <label className={cl('label')} htmlFor="modelYear">Model year: </label>
                    <Input type="number" id="modelYear" name="modelYear" placeholder="Model Year" value={formFields.modelYear} onChange={(e) => handleChange(e.target)} />
                    <ValidateMessage name='modelYear' errors={errors}></ValidateMessage>
                </div>

                <div className={cl('group', 'group-file')}>
                    <label className={cl('label', 'file-label')} htmlFor="file" >
                        <FontAwesomeIcon className={cl('upload-icon')} icon={faArrowUpFromBracket} />
                        <span className={cl('label-text')}>Replace images</span>
                    </label>
                    <label className={cl('label', 'file-label')} htmlFor="file" onClick={()=>setAppendImages(true)}>
                        <FontAwesomeIcon className={cl('upload-icon')} icon={faPlus} />
                        <span className={cl('label-text')}>Add images</span>
                    </label>
                    <ul className={cl('image-list')}>
                        {Array.isArray(formFields?.photos) ? formFields?.photos.map((img, index) => (
                            <li key={index} className={cl('image-item')}>
                                <img src={img.url} alt="uploaded" className={cl('upload-img')} />
                            </li>
                        )) : temporaryImages.map((img, index) => (
                            <li key={index} className={cl('image-item')}>
                                <img src={img} alt="uploaded" className={cl('upload-img')} />
                            </li>
                        ))}
                    </ul>
                    <input
                        className={cl('file')}
                        type="file"
                        id="file"
                        name="photos"
                        multiple
                        onChange={(e) => handleChange(e.target)}
                    />
                    <ValidateMessage name='photos' errors={errors}></ValidateMessage>
                </div>

                <div className={cl('group')}>
                    <label className={cl('label')} htmlFor="stock">Stock: </label>
                    <Input type="number" min="0" max="1000" id="stock" name="stock" placeholder="Stock" value={formFields.stock || 0} onChange={(e) => handleChange(e.target)} />
                    <ValidateMessage name='stock' errors={errors}></ValidateMessage>
                </div>

                <button className={cl('submit')}>{!!edit ? 'Save' : 'Create'}</button>
            </form>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>
    )
}

ProductForm.propTypes = {
    edit: PropTypes.string
}

export default ProductForm
