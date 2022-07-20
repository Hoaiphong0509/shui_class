import { yupResolver } from '@hookform/resolvers/yup'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import s from './styles.module.scss'

import moment from 'moment'
import { Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { addStudent } from 'services/redux/actions/teacher'

const FormAddStudent = ({
  idClassroom,
  studentsAvailable,
  staffs,
  addStudent
}) => {
  const history = useHistory()

  const schema = yup
    .object({
      username: yup.string().required('Tài khoản không được bỏ trống'),
      address: yup.string().required('Địa chỉ không được bỏ trống'),
      phone: yup
        .string()
        .required('Số điện thoại không được bỏ trống')
        .matches(
          /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/,
          'Số điện thoại không đúng'
        ),
      staffCode: yup.number(),
      parentName: yup.string().required('Tên phụ huynh không được trống'),
      parentEmail: yup
        .string()
        .required('Email phụ huynh không được trống')
        .email('Email sai định dạng')
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
    addStudent(idClassroom, data)
    history.push('/')
  }

  return (
    <form className={s.root} onSubmit={handleSubmit(onSubmit)}>
      <div className={s.title}>
        <h1>Thêm học sinh</h1>
      </div>
      <div className={s.panel}>
        <label htmlFor="username" style={{ color: 'red' }}>
          Học sinh *
        </label>
        <select {...register('username')}>
          {studentsAvailable &&
            studentsAvailable.map((s, idx) => (
              <option key={idx} value={s.username}>
                {s.fullName} -{' '}
                {s.birthday && moment(s.birthday).format('DD-MM-YYYY')}
              </option>
            ))}
        </select>
        <p className={s.textError}>{errors.username?.message}</p>
      </div>
      <div className={s.panel}>
        <label htmlFor="address" style={{ color: 'red' }}>
          Địa chỉ học sinh *
        </label>
        <input
          name="address"
          placeholder="Địa chỉ học sinh"
          {...register('address')}
        />
        <p className={s.textError}>{errors.address?.message}</p>
      </div>
      <div className={s.panel} style={{ color: 'red' }}>
        <label htmlFor="phone">Số điện thoại *</label>
        <input name="phone" placeholder="0123 456 789" {...register('phone')} />
        <p className={s.textError}>{errors.phone?.message}</p>
      </div>
      <div className={s.panel}>
        <label htmlFor="staffCode">Chức vụ</label>
        <select {...register('staffCode')}>
          {staffs.map((s, idx) => (
            <option key={idx} value={s.staffCode}>
              {s.staffDisplay}
            </option>
          ))}
        </select>
      </div>
      <div className={s.panel}>
        <label htmlFor="parentName" style={{ color: 'red' }}>
          Tên phụ huynh *
        </label>
        <input name="parentName" {...register('parentName')} />
        <p className={s.textError}>{errors.parentName?.message}</p>
      </div>
      <div className={s.panel}>
        <label htmlFor="parentEmail" style={{ color: 'red' }}>
          Email phụ huynh *
        </label>
        <input name="parentEmail" {...register('parentEmail')} />
        <p className={s.textError}>{errors.parentEmail?.message}</p>
      </div>
      <div className={s.interaction}>
        <Button variant="secondary" onClick={() => history.push('/')}>
          Quay lại
        </Button>
        <Button variant="success" type="submit">
          Thêm học sinh
        </Button>
      </div>
    </form>
  )
}

FormAddStudent.prototype = {
  addStudent: PropTypes.func
}

export default connect(null, {
  addStudent
})(FormAddStudent)
