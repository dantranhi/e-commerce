import React from 'react'
import { useDropdown } from './dropdownContext'

import classNames from 'classnames/bind';
import styles from './Dropdown.module.scss';
const cl = classNames.bind(styles);


function Item({onChoose, children}) {
    const [state, setState] = useDropdown()
    const handleSetValue = (value) => {
        setState(prev => ({
            ...prev,
            currentValue: value,
            search: '',
            show: false
        }))

        onChoose(value)
    }
    return (
        <div onClick={()=>handleSetValue(children)} className={cl('item')}>{children}</div>
    )
}

export default Item