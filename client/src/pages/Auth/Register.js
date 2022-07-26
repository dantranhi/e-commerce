import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'
import { toast } from 'react-toastify';

import { LogoIcon } from '../../components/Icons'
import httpRequest from '../../utils/httpRequest'
import GoogleIcon from '../../assets/img/google.png'
import LoginHero from '../../assets/img/login-hero.jpg'
import Button from '../../components/Button'
import ValidateMessage from '../../components/ValidateMessage'
import classNames from 'classnames/bind';
import styles from './Login.module.scss';

const cl = classNames.bind(styles);

function Register() {
    const navigate = useNavigate()
    const [user, setUser] = useState({ username: '', password: '', email: '', confirmPassword: '' })
    const [errors, setErrors] = useState([])
    const handleChangeInput = ({ name, value }) => {
        setUser(prev => (
            {
                ...prev,
                [name]: value
            }
        ))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await httpRequest.post('/auth/register', user)
        if (res.data.success) {
            toast.success('Account created successfully')
            navigate('/login')
        }
        if (res.data.errors) {
            setErrors(res.data.errors)
            if (user.password !== user.confirmPassword) {
                setErrors(prev => ([
                    ...prev,
                    {
                        "msg": "Mật khẩu xác nhận không khớp",
                        "param": "confirmPassword",
                        "value": user.confirmPassword,
                        "location": "body",
                    }
                ]))
            }
        }
    }

    const handleLoginGoogle = () => {
        window.open('https://ecommerce-dantocthang.herokuapp.com/google', '_self')
    }

    const handleLoginFacebook = () => {
        window.open('https://ecommerce-dantocthang.herokuapp.com/facebook', '_self')
    }

    return (
        <div className={cl('login')}>
            <div className={cl('left')}>
                <LogoIcon className={cl('logo')} />
                <h3 className={cl('title')}>Create an account</h3>
                <form className={cl('form')} onSubmit={handleSubmit}>
                    <input className={cl('input')} type="text" autoComplete="on" id="username" placeholder="Enter your username" name="username" value={user.username} onChange={(e) => handleChangeInput(e.target)} />
                    <ValidateMessage name='username' errors={errors}></ValidateMessage>

                    <input className={cl('input')} type="text" autoComplete="on" id="email" name="email" placeholder="Enter your email" value={user.email} onChange={(e) => handleChangeInput(e.target)} />
                    <ValidateMessage name='email' errors={errors}></ValidateMessage>

                    <input className={cl('input')} type="password" autoComplete="on" id="password" name="password" placeholder="Enter your password" value={user.password} onChange={(e) => handleChangeInput(e.target)} />
                    <ValidateMessage name='password' errors={errors}></ValidateMessage>

                    <input className={cl('input')} type="password" autoComplete="on" id="confirmPassword" name="confirmPassword" placeholder="Confirm password" value={user.confirmPassword} onChange={(e) => handleChangeInput(e.target)} />
                    <ValidateMessage name='confirmPassword' errors={errors}></ValidateMessage>

                    <Button filled className={cl('submit')}>Sign up</Button>
                </form>
                <div className={cl('separator')}>
                    <span className={cl('line')}></span>
                    <span className={cl('line-text')}>OR</span>
                </div>
                <div className={cl('socials')}>
                    <Button onClick={handleLoginGoogle}><img className={cl('icon')} src={GoogleIcon} alt="google" />Login with Google</Button>
                    <Button onClick={handleLoginFacebook} leftIcon={faFacebook}>Login with Facebook</Button>
                </div>

            </div>
            <div className={cl('right')}>
                <img src={LoginHero} alt="" className={cl('hero')} />
            </div>
        </div>
    )
}

export default Register