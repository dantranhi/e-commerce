import React, { useEffect } from 'react'
import removeAccents from './normalize'
import { useDropdown } from './dropdownContext'

import classNames from 'classnames/bind';
import styles from './Dropdown.module.scss';
const cl = classNames.bind(styles);

function Search() {
    const [state, setState] = useDropdown()
    console.log(state)

    const handleChangeInput = (e) => {
        setState(prev => ({
            ...prev,
            search: e.target.value
        }))
    }

    useEffect(() => {
        const id = setTimeout(() => {
            const normalizedString = removeAccents(state.search)
            var re = new RegExp(normalizedString.toLowerCase(), "g");
            setState(prev => ({
                ...prev,
                searchResult: state.values.filter(item => re.test(item.toLowerCase()))
            }))
        }, 700)

        return () => clearTimeout(id)
    }, [state.search])


    return (
        <div className={cl('search-wrapper')}>
            <input value={state.search} onChange={handleChangeInput} placeholder="Find brand" type="text" className={cl('search')} />
        </div>
    )
}

export default Search