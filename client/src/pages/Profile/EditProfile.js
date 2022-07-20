import { useParams } from 'react-router-dom'
import { Typography } from 'antd'

import ProfileForm from '../../components/ProfileForm'
import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
const cl = classNames.bind(styles);
const { Title } = Typography


function EditProfile() {
    const params = useParams()
    return (
        <>
            <div className="grid wide">
                <Title className={cl('heading')}>Edit Profile</Title>
                <ProfileForm userId={params.userId} profileId={params.id}></ProfileForm>
            </div>
        </>
    )
}

export default EditProfile