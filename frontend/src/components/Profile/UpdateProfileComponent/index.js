import { ROLES } from 'constants/AppConstants'
import { Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import s from './styles.module.scss'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import moment from 'moment'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { updateMyProfile, changeAvatar } from 'services/redux/actions/profile'
import { useState } from 'react'

const UpdateProfileComponent = ({
  user,
  profile,
  classroom,
  updateMyProfile,
  changeAvatar
}) => {
  const history = useHistory()

  const [selectedImage, setSelectedImage] = useState()
  const {
    avatar: avt,
    fullName: fn,
    birthday: birth,
    staffClass,
    address: adr = '',
    phone: pho = ''
  } = profile

  const schema = yup
    .object({
      fullName: yup.string().required('Họ tên không được bỏ trống'),
      birthday: yup.string(),
      address: yup.string(),
      phone: yup
        .string()
        .matches(
          /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/,
          'Số điện thoại không đúng'
        )
    })
    .required()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = (data) => {
    updateMyProfile(data)
  }

  const imageChange = (e) => {
    const uploadForm = new FormData()
    uploadForm.append('img', e.target.files[0])
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0])
      changeAvatar(uploadForm)
    }
  }

  return (
    <div className={s.root}>
      <div className={s.in4}>
        <img
          src={
            selectedImage
              ? URL.createObjectURL(selectedImage)
              : avt.length > 0
              ? avt
              : '/assets/img/avatar.png'
          }
          alt="avatar"
        />
        <div className={s.file_input}>
          <input
            type="file"
            name="img"
            id="file-input"
            onChange={imageChange}
            className={s.file_input__input}
          />
          <label className={s.file_input__label} htmlFor="file-input">
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="upload"
              className="svg-inline--fa fa-upload fa-w-16"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"
              ></path>
            </svg>
            <span>Thay đổi ảnh đại diện</span>
          </label>
        </div>
      </div>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={s.panel}>
          <div>
            <label htmlFor="fullName">Họ tên</label>
            <input
              defaultValue={fn}
              name="fullName"
              {...register('fullName')}
            />
            <p className={s.textError}>{errors.fullName?.message}</p>
          </div>
          <div>
            <label htmlFor="birthday">Ngày sinh</label>
            <input
              max={moment(new Date()).format('YYYY-MM-DD')}
              defaultValue={moment(birth).format('YYYY-MM-DD')}
              name="birthday"
              type="date"
              {...register('birthday')}
            />
          </div>
        </div>
        <div className={s.panel}>
          <div>
            <label htmlFor="address">Địa chỉ</label>
            <input defaultValue={adr} name="address" {...register('address')} />
          </div>
          <div>
            <label htmlFor="phone">Số điện thoại</label>
            <input defaultValue={pho} name="phone" {...register('phone')} />
            <p className={s.textError}>{errors.phone?.message}</p>
          </div>
        </div>
        <div className={s.panel}>
          <div>
            <h4>Lớp học</h4>
            <p className={s.in4Class}>{classroom.name}</p>
          </div>
          <div>
            <h4>Chức vụ</h4>
            <p className={s.in4Class}>
              {user?.roles.includes(ROLES.TEACHER)
                ? 'Giáo viên chủ nhiệm'
                : staffClass[0]?.staffDisplay}
            </p>
          </div>
        </div>
        <div className={s.panel}>
          <div>
            <Button variant="secondary" onClick={() => history.push('/')}>
              Huỷ
            </Button>
            <Button variant="info" type="submit">
              Lưu
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

UpdateProfileComponent.prototype = {
  updateMyProfile: PropTypes.func,
  changeAvatar: PropTypes.func
}

export default connect(null, {
  updateMyProfile,
  changeAvatar
})(UpdateProfileComponent)
