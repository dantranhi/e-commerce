import notFoundImg from '../../assets/img/404.webp'
import Button from '../../components/Button'

import classNames from 'classnames/bind';
import styles from './404.module.scss';
const cl = classNames.bind(styles);

function NotFound() {
  return (
    <div className={cl('wrapper')}>
        <img src={notFoundImg} alt="404 not found" className={cl('img')}/>
        <Button primary to='/'>Back to Home</Button>
    </div>
  )
}

export default NotFound