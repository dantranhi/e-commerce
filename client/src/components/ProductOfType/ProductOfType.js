import Slider from 'react-slick'
import ProductItem from '../ProductItem'

import classNames from 'classnames/bind';
import styles from './ProductOfType.module.scss';
import { Link } from 'react-router-dom';
const cl = classNames.bind(styles);

function ProductOfType({ data, title }) {
    const settings = {
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 2,
        arrows: true,
    };

    return (
        <div className={cl('wrapper')}>
            <div className="grid wide">
                <div className={cl('title')}>{title}</div>
                <div className="row">
                    <Slider className={cl('img-list')} {...settings}>
                        {data && data.map(product => (
                            <Link to={`/product/${product._id}`} key={product._id} className={cl('item-wrapper')}>
                                <ProductItem data={product}></ProductItem>
                            </Link>
                        ))}
                    </Slider>
                </div>
            </div>
        </div>
    )
}

export default ProductOfType