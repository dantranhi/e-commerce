import React from 'react'
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faGithubAlt, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons'

import { LogoIcon } from '../Icons'
import { VisaIcon, PaypalIcon, MasterCardIcon, AtmIcon } from '../Icons';
import FooterItem from './FooterItem'

import styles from './Footer.module.scss';
import { faClock, faCreditCard, faEnvelope, faHandshakeSimple, faLocationDot, faPhone, faShieldHalved, faTruckFront } from '@fortawesome/free-solid-svg-icons';
const cl = classNames.bind(styles);

function Footer() {
    return (
        <div className={cl('outer')}>
            <div className="grid wide">
                <div className={cl('inner')}>
                    <div className="row">
                        <div className="col l-3 m-4 c-6">
                            <div className={cl('col-wrapper')}>
                                <div className={cl('logo-wrapper')}>
                                    <LogoIcon className={cl('logo-img')}></LogoIcon>
                                </div>
                                <div className={cl('slogan')}>"embrace your choices - we do"</div>
                                <div className={cl('socials')}>
                                    <a href='https://facebook.com' className={cl('social-wrapper')}>
                                        <FontAwesomeIcon className={cl('social-icon')} icon={faFacebookF} />
                                    </a>
                                    <a href='https://instagram.com' className={cl('social-wrapper')}>
                                        <FontAwesomeIcon className={cl('social-icon')} icon={faInstagram} />
                                    </a>
                                    <a href='https://youtube.com' className={cl('social-wrapper')}>
                                        <FontAwesomeIcon className={cl('social-icon')} icon={faYoutube} />
                                    </a>
                                    <a href='https://github.com' className={cl('social-wrapper')}>
                                        <FontAwesomeIcon className={cl('social-icon')} icon={faGithubAlt} />
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col l-3 m-4 c-6">
                            <div className={cl('col-wrapper')}>
                                <div className={cl('heading')}>About us</div>
                                <div className={cl('list')}>
                                    <FooterItem leftIcon={faClock}>Working hours: 8AM - 10PM</FooterItem>
                                    <FooterItem leftIcon={faLocationDot}>Address: Nguyen Van Linh, Binh Thuy, Can Tho</FooterItem>
                                    <FooterItem leftIcon={faPhone}>Hotline: 0379015044</FooterItem>
                                    <FooterItem leftIcon={faEnvelope}>Email: tuongvi762@gmail.com</FooterItem>
                                </div>
                            </div>
                        </div>
                        <div className="col l-3 m-4 c-6">
                            <div className={cl('col-wrapper')}>
                                <div className={cl('heading')}>Payment</div>
                                <div className={cl('payment-list')}>
                                    <div className={cl('payment-wrapper')}>
                                        <VisaIcon className={cl('payment-icon')}></VisaIcon>
                                    </div>
                                    <div className={cl('payment-wrapper')}>
                                        <PaypalIcon className={cl('payment-icon')}></PaypalIcon>
                                    </div>
                                    <div className={cl('payment-wrapper')}>
                                        <MasterCardIcon className={cl('payment-icon')}></MasterCardIcon>
                                    </div>
                                    <div className={cl('payment-wrapper')}>
                                        <AtmIcon className={cl('payment-icon')}></AtmIcon>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col l-3 m-4 c-6">
                            <div className={cl('col-wrapper')}>
                                <div className={cl('heading')}>Infos</div>
                                <div className={cl('list')}>
                                    <FooterItem to='/' leftIcon={faTruckFront}>Transport policy</FooterItem>
                                    <FooterItem to='/' leftIcon={faHandshakeSimple}>Agreement and Services</FooterItem>
                                    <FooterItem to='/' leftIcon={faShieldHalved}>Security policy</FooterItem>
                                    <FooterItem to='/' leftIcon={faCreditCard}>Learn more about payment</FooterItem>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer