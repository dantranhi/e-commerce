import React from 'react'

import { useDropdown } from './dropdownContext'

import classNames from 'classnames/bind';
import styles from './Dropdown.module.scss';
const cl = classNames.bind(styles);



function Content({ label, children }) {
    const [state, setState] = useDropdown()

    const handleToggleDropdown = () => {
        setState(prev => ({
            ...prev,
            show: !prev.show
        }))
    }
    return (
        <div className={cl('choose-button')}>
            <span onClick={handleToggleDropdown} className={cl('value')}>{state.currentValue || label}</span>
            {state.show && <div className={cl('content-wrapper')}>
                {children}
            </div>}
        </div>
    )
}

export default Content