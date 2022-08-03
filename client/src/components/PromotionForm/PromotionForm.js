import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Input, Select, InputNumber, DatePicker, Popconfirm, Checkbox, Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify';
import moment from 'moment';

import httpRequest from '../../utils/httpRequest'
import useFetch from '../../hooks/useFetch'
import ValidateMessage from '../ValidateMessage';

import classNames from 'classnames/bind';
import styles from './PromotionForm.module.scss';

const cl = classNames.bind(styles);
const { Option } = Select;
const { RangePicker } = DatePicker



function PromotionForm({ edit }) {
    const oldPriceRef = useRef()
    const newPriceRef = useRef()

    let url = '/promotion/periods'
    let editUrl = `/promotion/periods/${edit}`
    const [errors, setErrors] = useState([])
    const [formFields, setFormFields] = useState({
        name: '',
        content: [{
            productId: undefined,
            promotionPrice: undefined,
            freeAttachments: [],
            discountValue: 0
        }],
        startDate: undefined,
        endDate: undefined,
    })

    const { data: allProducts } = useFetch('/product')
    const { data: allPromotionPeriods } = useFetch(!!edit ? editUrl : url)


    const { data: promotionData, error, loading } = useFetch(`/promotion/${edit}`, !!edit)
    if (error) console.log('Error while fetch Promotion data: ' + error)
    useEffect(() => {
        if (edit && !loading && Object.keys(promotionData).length > 0) {
            setFormFields(
                {
                    ...promotionData,
                    startDate: moment(promotionData.startDate),
                    endDate: moment(promotionData.endDate),
                })
        }
    }, [promotionData])


    const handleChangeForm = ({ name, value, checked }) => {
        setFormFields(prev => ({
            ...prev,
            [name]: checked ? checked : value
        }))

    }


    const handleChangeContent = (value, customName, index) => {
        setFormFields(prev => {
            let newState = { ...prev }
            if (!newState.content[index]) {
                newState.content.push({
                    productId: undefined,
                    promotionPrice: undefined,
                    freeAttachments: [],
                    discountValue: 0
                })
            }
            newState.content[index][customName] = value
            return newState
        })
    }

    const handleCalculateDiscount = (rowIndex) =>{
        const oldPrice = oldPriceRef.current.value
        const newPrice = newPriceRef.current.value
        let result
        if (Number(newPrice)==0) result = 0
        else result = parseFloat(oldPrice - newPrice) / oldPrice
        setFormFields(prev => {
            let newState = { ...prev }
            newState.content[rowIndex].discountValue = Math.floor(result*100)
            return newState
        })
    }


    const handleAddOneRow = (e) => {
        e.preventDefault()
        setFormFields(prev => {
            let newState = { ...prev }
            newState.content.push({
                productId: undefined,
                promotionPrice: undefined,
                freeAttachments: [],
            })
            return newState
        })
    }

    const handleRemoveRow = (index) => {
        if (formFields.content[index]) {
            setFormFields(prev => {
                let newState = { ...prev }
                newState.content.splice(index, 1)
                return newState
            })
        }
    }


    function onDateChange(dates, dateStrings) {
        if (dates) {
            setFormFields(prev => ({
                ...prev,
                startDate: dates[0],
                endDate: dates[1]
            }))
        }
        else {
            setFormFields(prev => ({
                ...prev,
                startDate: undefined,
                endDate: undefined
            }))
        }
    }

    const disabledDate = (current) => {
        // if (!formFields.startEndDate || formFields.comeWithOtherPromotion) {
        //     return false;
        // } 
        // current < moment().endOf('day') || 
        const tooLate = formFields.startDate && current.diff(formFields.startDate, 'days') > 14;
        const tooEarly = formFields.endDate && formFields.endDate.diff(current, 'days') > 14;
        return !!allPromotionPeriods.find(d => current.isBetween(moment(d[0]), moment(d[1]))) || !!tooEarly || !!tooLate;
    };

    const handleSubmit = async (e) => {
        e.preventDefault()

        const newPromotion = { ...formFields }

        try {
            if (!edit) {
                const res = await httpRequest.post('/promotion/create', newPromotion)
                if (!res.data.success) {
                    setErrors(res.data.errors)
                }
                else {
                    toast.success(res.data.message)
                    setErrors([])
                }
            }
            else {
                const res = await httpRequest.put(`/promotion/${edit}`, newPromotion)
                if (res.data.success) {
                    toast.success(res.data.message)
                    setErrors([])
                }
                if (res.data.errors) {
                    setErrors(res.data.errors)
                }
            }
        }
        catch (err) {
            toast.error(err?.response?.data?.message || 'Undefined Error!')
        }
    }

    return (
        <form onSubmit={handleSubmit} className={cl('form')}>
            <div className={cl('group')}>
                <label className={cl('label')} htmlFor="name">Name</label>
                <Input placeholder="Name" id="name" name='name' value={formFields.name} onChange={(e) => handleChangeForm(e.target)}></Input>
                <ValidateMessage name='name' errors={errors}></ValidateMessage>
            </div>
            <div className={cl('group')}>
                <label className={cl('label')} htmlFor="name">Duration</label>
                <RangePicker
                    className={cl('range-picker')}
                    value={[formFields.startDate, formFields.endDate]}
                    onChange={onDateChange}
                    disabledDate={disabledDate}
                    onCalendarChange={(val) => setFormFields(prev => ({ ...prev, startDate: val?.[0], endDate: val?.[1] }))}
                />
                <ValidateMessage name='startDate' errors={errors}></ValidateMessage>
                <ValidateMessage name='endDate' errors={errors}></ValidateMessage>
            </div>
            <label className={cl('label')} htmlFor="content">Content</label>
            <div className={cl('group')}>
                {formFields.content && formFields.content.map((rowItem, rowIndex) => (
                    <div key={rowIndex} className={cl('content-row')}>
                        <div className={cl('content-col')}>
                            <div className={cl('row-label')}>Product</div>
                            <Select
                                value={formFields.content[rowIndex]?.productId}
                                showSearch
                                placeholder="Select a product"
                                optionFilterProp="children"
                                onChange={(value) => handleChangeContent(value, 'productId', rowIndex)}
                                className={cl('input')}
                                filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                            >
                                {allProducts && allProducts.map((item) => (
                                    <Option key={item._id} value={item._id}>{item.name}</Option>
                                ))}
                            </Select>
                            <ValidateMessage name={`content[${rowIndex}].productId`} errors={errors}></ValidateMessage>
                        </div>
                        <div className={cl('content-col')}>
                            <div className={cl('row-label')}>Old price</div>
                            <InputNumber
                                ref={oldPriceRef}
                                className={cl('input')}
                                value={formFields.content?.[rowIndex]?.productId ? allProducts.find(i => i._id === formFields.content?.[rowIndex]?.productId).oldPrice : undefined}
                                disabled
                            />
                        </div>
                        <div className={cl('content-col')}>
                            <div className={cl('row-label')}>New price {`(- ${formFields.content[rowIndex]?.discountValue || 0}%)`}</div>
                            <InputNumber
                                ref={newPriceRef}
                                className={cl('input')}
                                value={formFields.content[rowIndex]?.promotionPrice}
                                min={0}
                                max={50000000}
                                step={10000}
                                onChange={(value) => {
                                    handleChangeContent(value, 'promotionPrice', rowIndex)
                                    handleCalculateDiscount(rowIndex)
                                }}
                            />
                        </div>
                        <div className={cl('content-col')}>
                            <div className={cl('row-label')}>Free product</div>
                            <Select
                                className={cl('input')}
                                value={formFields.content[rowIndex]?.freeAttachments}
                                mode="multiple"
                                allowClear
                                style={{
                                    width: '100%',
                                }}
                                placeholder="Please select"
                                onChange={(value) => handleChangeContent(value, 'freeAttachments', rowIndex)}
                            >
                                {allProducts && allProducts.map((item) => (
                                    <Option key={item._id} value={item._id}>{item.name}</Option>
                                ))}
                            </Select>
                        </div>
                        <Popconfirm
                            title="Are you sure to delete this task?"
                            onConfirm={() => handleRemoveRow(rowIndex)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <div className={cl('remove')}>
                                <FontAwesomeIcon className={cl('remove-icon')} icon={faXmark} />
                            </div>
                        </Popconfirm>

                    </div>
                ))}
            </div>

            <Button onClick={handleAddOneRow} type="dashed" block>
                Add a row
            </Button>
            <Button className={cl('submit')} type="primary" htmlType="submit" >Submit</Button>
            <Link to='/admin/promotion' className={`${cl('submit')} redirect-link`} type="secondary" >Return to List</Link>
        </form>
    )
}

export default PromotionForm