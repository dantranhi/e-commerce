import React from 'react'

import { useDropdown } from './dropdownContext'
import Item from './Item'

import classNames from 'classnames/bind';
import styles from './Dropdown.module.scss';
const cl = classNames.bind(styles);


function List({ onChoose }) {
    const [state] = useDropdown()


    return (
        <div className={cl('list')}>
            {state.searchResult.map((item, index) => (
                <Item onChoose={onChoose} key={index}>{item}</Item>
            ))}
        </div>
    )
}

export default List