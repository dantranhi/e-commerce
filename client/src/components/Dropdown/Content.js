import React, { useEffect, useRef, useId } from 'react'

import { useDropdown } from './dropdownContext'

import classNames from 'classnames/bind';
import styles from './Dropdown.module.scss';
const cl = classNames.bind(styles);



function Content({ label, children }) {
    const dropdownId = useId()
    const dropdownRef = useRef()
    dropdownRef.id = dropdownId
    const [state, setState] = useDropdown()

    const handleToggleDropdown = () => {
        setState(prev => ({
            ...prev,
            show: !prev.show
        }))
    }

    useEffect(() => {
        function handleClickOutside(e) {
            console.dir(e.target)
            if (dropdownRef.current && dropdownRef.current.id===dropdownId && dropdownRef.current.contains(e.target)) {
                return
            }
            else if (dropdownRef.current.id===dropdownId) {
                setState(prev => ({
                    ...prev,
                    show: false
                }))
            }

        }

        document.addEventListener('click', handleClickOutside)

        return () => {
            document.removeEventListener('click', handleClickOutside)
        }
    }, [])

    return (
        <div className={cl('choose-button')} id={dropdownId} ref={dropdownRef} >
            <span onClick={handleToggleDropdown} className={cl('value')}>{state.currentValue || label}</span>
            {state.show && <div className={cl('content-wrapper')}>
                {children}
            </div>}
        </div>
    )
}

export default Content