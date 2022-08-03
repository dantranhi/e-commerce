
import formatCurrency from '../../utils/formatCurrency'

import classNames from 'classnames/bind';
import styles from './GiftCartItem.module.scss';
const cl = classNames.bind(styles);

function GiftCartItem({data}) {
    return (
        <div className={cl('wrapper')}>
            <img src={data.giftPhoto} alt="product" className={cl('img')} />
            <div className={cl('info')}>
                <div className={cl('name')}>{data?.giftName}</div>
                <div className={cl('price')}>{formatCurrency(0)}</div>
            </div>
            <div className={cl('quantity')}>
                <span className={cl('amount')}>{data?.amount || 1}</span>
            </div>
        </div>
    )
}

export default GiftCartItem