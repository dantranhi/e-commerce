import React from 'react'
import { RightOutlined, LeftOutlined, DoubleRightOutlined, DoubleLeftOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types'

import classNames from 'classnames/bind';
import styles from './Pagination.module.scss';
const cl = classNames.bind(styles);

function Pagination({ currentPage, data, previous, next, offset, pages, onFetchNewData }) {
    return (
        <div className={cl('wrapper')}>
            <ul className={cl('list')}>
                <li onClick={() => onFetchNewData(1)} className={cl('item', { disabled: currentPage===1 })}>
                    <span className={cl('link')}>
                        <DoubleLeftOutlined />
                    </span>
                </li>
                <li onClick={() => onFetchNewData(previous.page || 1)} className={cl('item', { disabled: currentPage===1 })}>
                    <span className={cl('link')}>
                        <LeftOutlined />
                    </span>
                </li>
                {new Array(pages).fill(0).map((item, index) => {
                    const calOffset = Math.abs(currentPage - index - 1)
                    if (calOffset <= offset) return (
                        <li
                            onClick={() => onFetchNewData(index + 1)}
                            key={index}
                            className={cl('item', { active: currentPage === index + 1 })}>
                            <span className={cl('link')}>{index + 1}</span>
                        </li>
                    )
                    if (calOffset === offset + 1) return (<li
                        key={index}
                        className={cl('item')}>
                        <span className={cl('link')}>...</span>
                    </li>)
                })}
                <li onClick={() => onFetchNewData(next.page)} className={cl('item', { disabled: currentPage===pages })}>
                    <span className={cl('link')}>
                        <RightOutlined />
                    </span>
                </li>
                <li onClick={() => onFetchNewData(pages)} className={cl('item', { disabled: currentPage===pages })}>
                    <span className={cl('link')}>
                        <DoubleRightOutlined />
                    </span>
                </li>
            </ul>
        </div>
    )
}

Pagination.propTypes = {
    currentPage: PropTypes.number,
    data: PropTypes.array,
    previous: PropTypes.object,
    next: PropTypes.object,
    offset: PropTypes.number,
    pages: PropTypes.number,
    onFetchNewData: PropTypes.func
}

export default Pagination

