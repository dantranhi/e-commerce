import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Input, Button } from 'antd'

import httpRequest from '../../utils/httpRequest'
import useFetch from '../../hooks/useFetch'
import ValidateMessage from '../../components/ValidateMessage'
import classNames from 'classnames/bind';
import styles from './ProfileForm.module.scss';
import { toast } from 'react-toastify'
const cl = classNames.bind(styles);


function ProfileForm(props) {
    const navigate = useNavigate()
    const [errors, setErrors] = useState([])
    const { data: profileItem } = useFetch(`/profile/${props.userId}/${props.profileId}`, !!props.profileId)
    const [formData, setFormData] = useState({
        name: '',
        fullName: '',
        userAddress: '',
        userPhone: ''
    })

    useEffect(() => {
        setFormData({
            name: profileItem.name,
            fullName: profileItem.fullName,
            userAddress: profileItem.userAddress,
            userPhone: profileItem.userPhone,
        })
    }, [profileItem])

    const handleChange = ({ name, value }) => {
        setFormData(prev => (
            {
                ...prev,
                [name]: value
            }
        ))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            let res
            if (props.profileId) {
                res = await httpRequest.put(`/profile/${props.userId}/${props.profileId}`, formData)
            }
            else {
                res = await httpRequest.post(`/profile/${props.userId}`, formData)
            }
            if (res.data.success) {
                toast.success(res.data.message)
                setErrors([])
                navigate(`/profile/${props.userId}`)
            }
            if (res.data.errors) {
                setErrors(res.data.errors)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className={cl('edit-wrapper')}>
            <form onSubmit={handleSubmit} className={cl('form')}>
                <div className={cl('group')}>
                    <label className={cl('label')} htmlFor="profileName">Profile name: </label>
                    <Input type="text" id="profileName" name="name" placeholder="Profile name" value={formData.name} onChange={(e) => handleChange(e.target)} />
                    <ValidateMessage name='name' errors={errors}></ValidateMessage>
                </div>
                <div className={cl('group')}>
                    <label className={cl('label')} htmlFor="name">Full name: </label>
                    <Input type="text" id="name" name="fullName" placeholder="Full name" value={formData.fullName} onChange={(e) => handleChange(e.target)} />
                    <ValidateMessage name='fullName' errors={errors}></ValidateMessage>
                </div>
                <div className={cl('group')}>
                    <label className={cl('label')} htmlFor="address">Address: </label>
                    <Input type="text" id="address" name="userAddress" placeholder="Address" value={formData.userAddress} onChange={(e) => handleChange(e.target)} />
                    <ValidateMessage name='userAddress' errors={errors}></ValidateMessage>
                </div>
                <div className={cl('group')}>
                    <label className={cl('label')} htmlFor="phoneNumber">Phone number: </label>
                    <Input type="text" id="phoneNumber" name="userPhone" placeholder="Phone" value={formData.userPhone} onChange={(e) => handleChange(e.target)} />
                    <ValidateMessage name='userPhone' errors={errors}></ValidateMessage>
                </div>
                <Button htmlType="submit" className={cl('submit')} type="primary">{!!props.profileId ? 'Save changes' : 'Create'}</Button>
            </form>
        </div>
    )
}

export default ProfileForm