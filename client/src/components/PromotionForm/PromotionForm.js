import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
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
    const [errors, setErrors] = useState([])
    const [formFields, setFormFields] = useState({
        name: '',
        content: [{
            productId: undefined,
            promotionType: undefined,
            promotionValue: undefined,
            relateProductId: []
        }],
        startEndDate: [],
        comeWithOtherPromotion: false
    })

    const { data: allTypes } = useFetch('/promotion/type')
    const { data: allProducts } = useFetch('/product')
    const { data: allPromotionPeriods } = useFetch('/promotion/periods')

    const { data: promotionData, error, loading } = useFetch(`/promotion/${edit}`, !!edit)
    if (error) console.log('Error while fetch Promotion data: ' + error)
    useEffect(() => {
        if (edit && !loading && Object.keys(promotionData).length > 0) {
            setFormFields(
                {
                    ...promotionData,
                    startEndDate: [moment(promotionData.startEndDate[0]), moment(promotionData.startEndDate[0])]
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
                    promotionType: undefined,
                    promotionValue: undefined,
                    relateProductId: [],
                })
            }
            newState.content[index][customName] = value
            return newState
        })
    }

    const handleAddOneRow = (e) => {
        e.preventDefault()
        setFormFields(prev => {
            let newState = { ...prev }
            newState.content.push({
                productId: undefined,
                promotionType: undefined,
                promotionValue: undefined,
                relateProductId: [],
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
        console.log(dates, dateStrings);
        if (dates) {
            setFormFields(prev => ({
                ...prev,
                startEndDate: dates
            }))
        }
        else {
            setFormFields(prev => ({
                ...prev,
                startEndDate: []
            }))
        }
    }

    const disabledDate = (current) => {
        if (!formFields.startEndDate || formFields.comeWithOtherPromotion) {
            return false;
        }
        const tooLate = formFields.startEndDate[0] && current.diff(formFields.startEndDate[0], 'days') > 7;
        const tooEarly = formFields.startEndDate[1] && formFields.startEndDate[1].diff(current, 'days') > 7;
        return !!allPromotionPeriods.find(d => current.isBetween(d[0], d[1])) || !!tooEarly || !!tooLate;
    };

    const handleSubmit = async (e) => {
        e.preventDefault()

        const { comeWithOtherPromotion, ...newPromotion } = formFields
        console.log(newPromotion)

        try {
            if (!edit) {
                const res = await httpRequest.post('/promotion/create', newPromotion)
                if (!res.data.success) {
                    console.log(res.data.errors)
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
                    console.log(res.data)
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
                <Checkbox
                    name='comeWithOtherPromotion'
                    checked={formFields.comeWithOtherPromotion}
                    onChange={(e) => handleChangeForm(e.target)}
                >Come with other promotions ?</Checkbox>
            </div>
            <div className={cl('group')}>
                <label className={cl('label')} htmlFor="name">Duration</label>
                <RangePicker
                    value={formFields.startEndDate}
                    onChange={onDateChange}
                    disabledDate={disabledDate}
                    onCalendarChange={(val) => setFormFields(prev => ({ ...prev, startEndDate: val }))}
                />
                <ValidateMessage name='startEndDate' errors={errors}></ValidateMessage>
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
                            <div className={cl('row-label')}>Promotion type</div>
                            <Select
                                className={cl('input')}
                                value={formFields.content[rowIndex]?.promotionType}
                                showSearch
                                placeholder="Select promotion type"
                                optionFilterProp="children"
                                onChange={(value) => handleChangeContent(value, 'promotionType', rowIndex)}
                                // onSearch={onSearch}
                                filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                            >
                                {allTypes && allTypes.map((item) => (
                                    <Option key={item._id} value={item.name}>{item.name}</Option>
                                ))}
                            </Select>
                        </div>
                        <div className={cl('content-col')}>
                            <div className={cl('row-label')}>Promotion value</div>
                            <InputNumber
                                className={cl('input')}
                                value={formFields.content[rowIndex]?.promotionValue}
                                min={0}
                                max={100}
                                defaultValue='0'
                                onChange={(value) => handleChangeContent(value, 'promotionValue', rowIndex)}
                            />
                        </div>
                        <div className={cl('content-col')}>
                            <div className={cl('row-label')}>Free product</div>
                            <Select
                                className={cl('input')}
                                value={formFields.content[rowIndex]?.relateProductId}
                                mode="multiple"
                                allowClear
                                style={{
                                    width: '100%',
                                }}
                                placeholder="Please select"
                                onChange={(value) => handleChangeContent(value, 'relateProductId', rowIndex)}
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
            <Link to='/admin/promotion' className={`${cl('submit')} redirect-link`} type="secondary" htmlType="submit" >Return to List</Link>
        </form>
    )
}

export default PromotionForm