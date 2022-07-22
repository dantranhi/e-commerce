import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { Typography } from 'antd'
import { toast } from 'react-toastify';

import httpRequest from '../../utils/httpRequest';
import useFetch from '../../hooks/useFetch'
import ProfileItem from '../../components/ProfileItem'

import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
const cl = classNames.bind(styles);

const { Title } = Typography

function Profile() {
  const params = useParams()
  const { data: profileItems, reFetch } = useFetch(`/profile/${params.userId}`)

  const handleDeleteProfile = async (profileId) => {
    try {
      const res = await httpRequest.delete(`/profile/${params.userId}/${profileId}`)
      if (res.data.success) {
        toast.success(res.data.message)
        reFetch()
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={cl('wrapper')}>
      <div className="grid wide">
        <Title>Profiles</Title>
        <div className="row">
          {profileItems.map((item, index) => (
            <div key={item._id} className="col l-4 m-6 c-12">
              <ProfileItem onDeleteProfile={handleDeleteProfile} index={index} data={item}>
              </ProfileItem>
            </div>
          ))}
          <div className="col l-4 m-6 c-12">
            <Link to={`/profile/${params.userId}/create`} className={cl('new')}>
              <div className={cl('new-title')}>New profile</div>
              <div>Create</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile