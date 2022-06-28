import React from 'react'
import NavBar from '../../components/NavBar'

function DefaultLayout({ children }) {
    return (
        <div>
            <NavBar></NavBar>
            {children}
        </div>
    )
}

export default DefaultLayout