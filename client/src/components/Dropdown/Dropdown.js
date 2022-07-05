import React from 'react'
import { DropDownProvider } from './dropdownContext'

function Dropdown({ children, data = [] }) {

    
    // const dropdownData = [
    //     'MSI', 'ASUS', 'ACER', 'GIGABYTE', 'AOC', 'LOGITECH', 'DAREU', 'EDRA', 'FILCO', 'INTEL', 'AMD', 'GSKILL', 'KINGSTON'
    // ]

    // const INIT_VALUE = {
    //     values: data,
    //     currentValue: '',
    //     search: '',
    //     searchResult: [],
    //     show: false
    // }

    // console.log(INIT_VALUE)

  

    return (
        <DropDownProvider init={data}>
            {children}
        </DropDownProvider>
    )
}

export default Dropdown