import React from 'react'
import Sidebar from '../../components/Sidebar'
import { faDollarSign, faBarsProgress, faDisplay } from '@fortawesome/free-solid-svg-icons'

import classNames from 'classnames/bind';
import styles from './AdminLayout.module.scss';
const cl = classNames.bind(styles);

function AdminLayout({children}) {
  return (
    <div className={cl('grid')}>
        <Sidebar>
            <Sidebar.List title="Management">
                <Sidebar.Item leftIcon={faBarsProgress} path='/admin'>Dashboard</Sidebar.Item>
                <Sidebar.Item leftIcon={faDisplay} path='/admin/product'>Products</Sidebar.Item>
                <Sidebar.Item leftIcon={faDollarSign} path='/admin/income'>Income</Sidebar.Item>
            </Sidebar.List>
        </Sidebar>
        <div className={cl('content')}>
            {children}
        </div>
    </div>
  )
}

export default AdminLayout