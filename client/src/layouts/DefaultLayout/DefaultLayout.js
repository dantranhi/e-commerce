import React from 'react'
import NavBar from '../../components/NavBar'
import Footer from '../../components/Footer'

function DefaultLayout({ children }) {
    return (
        <div>
            <NavBar></NavBar>
            {children}
            <Footer></Footer>
        </div>
    )
}

export default DefaultLayout