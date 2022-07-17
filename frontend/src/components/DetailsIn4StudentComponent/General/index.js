import moment from 'moment'
import React from 'react'
import s from './styles.module.scss'
import { ROLES } from 'constants/AppConstants'

const General = ({ user, profile, classroom }) => {
  const {
    avatar,
    fullName,
    birthday,
    staffClass,
    address = '',
    phone = '',
    parentName,
    parentEmail
  } = profile
  return (
    <div className={s.root}>
      <div className={s.in4}>
        <img
          src={avatar.length > 0 ? avatar : '/assets/img/avatar.png'}
          alt="avatar"
        />
        <h3>{fullName}</h3>
        <h3>{moment(birthday).format('DD-MM-YYYY')}</h3>
      </div>
      <div className={s.general}>
        <div className={s.panel}>
          <div>
            <h4>Địa chỉ</h4>
            <p>{address}</p>
          </div>
          <div>
            <h4>Số điện thoại</h4>
            <p>{phone}</p>
          </div>
        </div>
        <div className={s.panel}>
          <div>
            <h4>Lớp học</h4>
            <p>{classroom.name}</p>
          </div>
          <div>
            <h4>Chức vụ</h4>
            <p>
              {user?.roles.includes(ROLES.TEACHER)
                ? 'Giáo viên chủ nhiệm'
                : staffClass[0]?.staffDisplay}
            </p>
          </div>
        </div>
        <div className={s.panel}>
          <div>
            <h4>Họ tên phụ huynh</h4>
            <p>{parentName}</p>
          </div>
          <div>
            <h4>Email phụ huynh</h4>
            <p>{parentEmail}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default General
