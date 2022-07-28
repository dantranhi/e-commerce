import React from 'react'
import Sidebar from '../../components/Sidebar'
import { faDollarSign, faBarsProgress, faDisplay, faPercent, faClipboardList, faHouse, faHeadphones, faCartShopping, faInfo, faUser } from '@fortawesome/free-solid-svg-icons'
import { Navigate } from 'react-router-dom'

import { useStore } from '../../store/UserContext'

import classNames from 'classnames/bind';
import styles from './AdminLayout.module.scss';
const cl = classNames.bind(styles);

function AdminLayout({ children }) {
    const [state] = useStore()
    const isAdmin = state?.userData?.details?.isAdmin

    if (!isAdmin) {
        return <Navigate to='/login' replace />;
    }
    return (
        <div className={cl('grid')}>
            <Sidebar>
                <Sidebar.List title="Management">
                    <Sidebar.Item leftIcon={faBarsProgress} path='/admin'>Dashboard</Sidebar.Item>
                    <Sidebar.Item leftIcon={faDisplay} path='/admin/product'>Products</Sidebar.Item>
                    <Sidebar.Item leftIcon={faPercent} path='/admin/promotion'>Promotions</Sidebar.Item>
                    <Sidebar.Item leftIcon={faUser} path='/admin/user'>Users</Sidebar.Item>
                    <Sidebar.Item leftIcon={faClipboardList} path='/admin/order'>Orders</Sidebar.Item>
                    <Sidebar.Item leftIcon={faDollarSign} path='/admin/revenue'>Revenue</Sidebar.Item>
                </Sidebar.List>
                <Sidebar.List title="Redirect">
                    <Sidebar.Item leftIcon={faHouse} path='/'>Home</Sidebar.Item>
                    <Sidebar.Item leftIcon={faCartShopping} path='/cart'>Cart</Sidebar.Item>
                    <Sidebar.Item leftIcon={faHeadphones} path='/contact'>Contact</Sidebar.Item>
                    <Sidebar.Item leftIcon={faInfo} path='/about'>About</Sidebar.Item>
                </Sidebar.List>
            </Sidebar>
            <div className={cl('content')}>
                {children}
            </div>
        </div>
    )
}

export default AdminLayout