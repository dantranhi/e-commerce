import React, { useState, useEffect, useId } from 'react'
import axios from 'axios'
import {Link } from 'react-router-dom'
import { Select, Input, Space, Divider, Typography, Button } from 'antd';
import { toast } from 'react-toastify';

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
    const uniqueId = useId()
    const [errors, setErrors] = useState([])
    const [allTypes, setAllTypes] = useState([])
    const [allBrands, setAllBrands] = useState([])
    const [newTypeName, setNewTypeName] = useState('')
    const [newBrandName, setNewBrandName] = useState('')
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

    const { data, error } = useFetch(`/product/${edit}`, !!edit)
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

    const handleChangeSelect = (value, field) => {
        setFormFields(prev => (
            {
                ...prev,
                [field]: value
            }
        ))
    }

    const addTypeItem = (e) => {
        e.preventDefault();
        setAllTypes(prev => ([...prev, { name: newTypeName }]))
        setNewTypeName('')
    };

    const addBrandItem = (e) => {
        e.preventDefault();
        setAllBrands(prev => ([...prev, { name: newBrandName }]))
        setNewBrandName('')
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
                    <Select
                        placeholder="Choose a brand or add one"
                        value={formFields.brand || undefined}
                        onChange={(value) => handleChangeSelect(value, 'brand')}
                        dropdownRender={(menu) => (
                            <>
                                {menu}
                                <Divider
                                    style={{
                                        margin: '8px 0',
                                    }}
                                />
                                <Space
                                    align="center"
                                    style={{
                                        padding: '0 8px 4px',
                                    }}
                                >
                                    <Input placeholder="Please enter brand name" name="brand" value={newBrandName} onChange={(e) => setNewBrandName(e.target.value)} />
                                    <Typography.Link
                                        onClick={addBrandItem}
                                        style={{
                                            whiteSpace: 'nowrap',
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faPlus} /> Add item
                                    </Typography.Link>
                                </Space>
                            </>
                        )}
                    >
                        {allBrands.map(item => (
                            <Option key={item._id || uniqueId} value={item.name}>{item.name}</Option>
                        ))}
                    </Select>
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
                    <Select
                        placeholder="Choose a type or add one"
                        value={formFields.type || undefined}
                        onChange={(value) => handleChangeSelect(value, 'type')}
                        dropdownRender={(menu) => (
                            <>
                                {menu}
                                <Divider
                                    style={{
                                        margin: '8px 0',
                                    }}
                                />
                                <Space
                                    align="center"
                                    style={{
                                        padding: '0 8px 4px',
                                    }}
                                >
                                    <Input placeholder="Please enter type name" name="type" value={newTypeName} onChange={(e) => setNewTypeName(e.target.value)} />
                                    <Typography.Link
                                        onClick={addTypeItem}
                                        style={{
                                            whiteSpace: 'nowrap',
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faPlus} /> Add item
                                    </Typography.Link>
                                </Space>
                            </>
                        )}
                    >
                        {allTypes.map(item => (
                            <Option key={item._id || uniqueId} value={item.name}>{item.name}</Option>
                        ))}
                    </Select>
                    <ValidateMessage name='type' errors={errors}></ValidateMessage>
                </div>


                <div className={cl('group')}>
                    <label className={cl('label')} htmlFor="modelYear">Model year: </label>
                    <Input type="number" id="modelYear" name="modelYear" placeholder="Model Year" value={formFields.modelYear} onChange={(e) => handleChange(e.target)} />
                    <ValidateMessage name='modelYear' errors={errors}></ValidateMessage>
                </div>

                <div className={cl('group', 'group-file')}>
                    <label className={cl('label', 'file-label', { full: !edit })} htmlFor="file" >
                        <FontAwesomeIcon className={cl('upload-icon')} icon={faArrowUpFromBracket} />
                        <span className={cl('label-text')}>{!!edit ? 'Replace images' : 'Add images'}</span>
                    </label>
                    {!!edit && (
                        <label className={cl('label', 'file-label')} htmlFor="file" onClick={() => setAppendImages(true)}>
                            <FontAwesomeIcon className={cl('upload-icon')} icon={faPlus} />
                            <span className={cl('label-text')}>Add images</span>
                        </label>
                    )}
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
                    <Input type="number" min="0" max="1000" id="stock" name="stock" placeholder="Stock" value={formFields.stock} onChange={(e) => handleChange(e.target)} />
                    <ValidateMessage name='stock' errors={errors}></ValidateMessage>
                </div>

                <Button className={cl('submit')} type="primary" htmlType="submit" >{!!edit ? 'Save' : 'Create'}</Button>
                <Link to='/admin/product' className="redirect-link" type="secondary" htmlType="submit" >Return to List</Link>
            </form>
        </>
    )
}

ProductForm.propTypes = {
    edit: PropTypes.string
}

export default ProductForm
