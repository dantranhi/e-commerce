import React from 'react'
import classNames from 'classnames/bind';
import PropTypes from 'prop-types'

import formatCurrency from '../../utils/formatCurrency'

import styles from './Overview.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const cl = classNames.bind(styles);

function OverviewItem({ name, amount = 0, icon, lastAdded, period, revenue }) {
    return (
        <div className={cl('item-wrapper')}>
            <FontAwesomeIcon className={cl('item-icon')} icon={icon} />
            <div className={cl('item-amount')}>{period ? formatCurrency(revenue) : amount}</div>
            <div className={cl('item-title')}>{period ? period : 'Current'} {name}</div>
            <div className={cl('item-recent-added')}>{period && revenue ? <br /> : `${lastAdded} item(s) added in last 24hrs`}</div>
        </div>
    )
}

OverviewItem.propTypes = {
    name: PropTypes.string.isRequired,
    amount: PropTypes.number,
    lastAdded: PropTypes.number,
    period: PropTypes.string,
    revenue: PropTypes.number,
}

export default OverviewItem