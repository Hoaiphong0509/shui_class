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
import { useState } from 'react'

const FormAddStudent = ({
  idClassroom,
  studentsAvailable,
  staffs,
  addStudent
}) => {
  const history = useHistory()
  const [noteData, setNoteData] = useState()

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
      staffCode: yup.number()
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
    history.replace('/')
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
        <select
          {...register('username')}
          onChange={(e) => {
            const index = e.target.selectedIndex
            const optionElement = e.target.childNodes[index]
            const option = optionElement.getAttribute('data_note')
            setNoteData(option)
          }}
        >
          {studentsAvailable &&
            studentsAvailable.map((s, idx) => (
              <option
                key={idx}
                value={s.username}
                data_note={s.note ? s.note : ''}
              >
                {s.fullName} -{' '}
                {s.birthday && moment(s.birthday).format('DD-MM-YYYY')}
              </option>
            ))}
        </select>
        <p className={s.textError}>{errors.username?.message}</p>
      </div>
      <div className={s.panel}>
        <label htmlFor="note">Ghi chú</label>
        <input
          name="address"
          value={noteData && noteData}
          defaultValue={noteData && noteData}
        />
        <p className={s.textError}>{errors.address?.message}</p>
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
      <div className={s.interaction}>
        <Button variant="secondary" onClick={() => history.goBack()}>
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
