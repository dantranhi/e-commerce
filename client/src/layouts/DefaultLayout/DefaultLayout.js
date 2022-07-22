import React from 'react'
import NavBar from '../../components/NavBar'
import Footer from '../../components/Footer'

function DefaultLayout({ children }) {
    return (<>
        <NavBar></NavBar>
        {children}
        <Footer></Footer>
    </>
    )
}

export default DefaultLayout