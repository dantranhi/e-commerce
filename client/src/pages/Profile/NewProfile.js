import { useParams } from 'react-router-dom'
import { Typography } from 'antd'

import ProfileForm from '../../components/ProfileForm'
import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
const cl = classNames.bind(styles);
const { Title } = Typography


function NewProfile() {
    const params = useParams()
    return (
        <div className={cl('wrapper')}>
            <div className="grid wide">
                <Title className={cl('heading')}>New Profile</Title>
                <ProfileForm userId={params.userId}></ProfileForm>
            </div>
        </div>
    )
}

export default NewProfile