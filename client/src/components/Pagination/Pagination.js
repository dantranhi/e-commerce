import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import RightChevrons from '../../assets/img/right-chevrons.png'
import LeftChevrons from '../../assets/img/left-chevrons.png'
import PropTypes from 'prop-types'

import classNames from 'classnames/bind';
import styles from './Pagination.module.scss';
const cl = classNames.bind(styles);

function Pagination({ currentPage, data, previous, next, offset, pages, onFetchNewData }) {
    return (
        <div className={cl('wrapper')}>
            <ul className={cl('list')}>
                <li onClick={() => onFetchNewData(1)} className={cl('item')}>
                    <span className={cl('link')}>
                        <img src={LeftChevrons} className={cl('icon-img')} alt="start" />
                    </span>
                </li>
                <li onClick={() => onFetchNewData(previous.page || 1)} className={cl('item', { disabled: previous === undefined })}>
                    <span className={cl('link')}>
                        <FontAwesomeIcon className={cl('icon')} icon={faChevronLeft} />
                    </span>
                </li>
                {new Array(pages).fill(0).map((item, index) => {
                    const calOffset = Math.abs(currentPage?.page - index - 1)
                    if (calOffset <= offset) return (
                        <li
                            onClick={() => onFetchNewData(index + 1)}
                            key={index}
                            className={cl('item', { active: currentPage?.page === index + 1 })}>
                            <span className={cl('link')}>{index + 1}</span>
                        </li>
                    )
                    if (calOffset === offset + 1) return (<li
                        key={index}
                        className={cl('item')}>
                        <span className={cl('link')}>...</span>
                    </li>)
                })}
                <li onClick={() => onFetchNewData(next.page)} className={cl('item', { disabled: next === undefined })}>
                    <span className={cl('link')}>
                        <FontAwesomeIcon className={cl('icon')} icon={faChevronRight} />
                    </span>
                </li>
                <li onClick={() => onFetchNewData(pages)} className={cl('item')}>
                    <span className={cl('link')}>
                        <img src={RightChevrons} className={cl('icon-img')} alt="start" />
                    </span>
                </li>
            </ul>
        </div>
    )
}

Pagination.propTypes = {
    currentPage: PropTypes.object,
    data: PropTypes.array,
    previous: PropTypes.object,
    next: PropTypes.object,
    offset: PropTypes.number,
    pages: PropTypes.number,
    onFetchNewData: PropTypes.func
}

export default Pagination

