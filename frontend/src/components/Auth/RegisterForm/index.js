import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import * as yup from 'yup'
import s from './styles.module.scss'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { registerAccount } from 'services/redux/actions/user'

const RegisterForm = ({ registerAccount }) => {
  const history = useHistory()
  const schema = yup
    .object({
      username: yup
        .string()
        .required('Tài khoản không được bỏ trống')
        .min(4, 'Tài khoản phải ít nhất 4 ký tự'),
      password: yup
        .string()
        .required('Mật khẩu không được bỏ trống')
        .min(6, 'Mật khẩu phải ít nhất 4 ký tự'),
      fullName: yup.string().required('Họ tên không được bỏ trống'),
      birthday: yup.string().required('Ngày sinh không được bỏ trống'),
      note: yup.string()
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
    registerAccount(data)
    history.replace('/login')
  }

  return (
    <div className={s.root}>
      <div className="area">
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      <form className={s.menu} onSubmit={handleSubmit(onSubmit)}>
        <div className={s.title}>
          <h1>ĐĂNG KÝ</h1>
        </div>
        <div className={s.panel}>
          <label htmlFor="username">Tài khoản</label>
          <input
            name="username"
            placeholder="Tài khoản"
            type="text"
            {...register('username')}
          />
          <p className={s.textError}>{errors.username?.message}</p>
        </div>
        <div className={s.panel}>
          <label htmlFor="password">Mật khẩu</label>
          <input
            name="password"
            placeholder="Mật khẩu"
            type="password"
            {...register('password')}
          />
          <p className={s.textError}>{errors.password?.message}</p>
        </div>
        <div className={s.panel}>
          <label htmlFor="fullName">Họ tên</label>
          <input
            name="fullName"
            placeholder="Ví dụ: Nguyễn Văn A"
            type="fullName"
            {...register('fullName')}
          />
          <p className={s.textError}>{errors.fullName?.message}</p>
        </div>
        <div className={s.panel}>
          <label htmlFor="birthday">Ngày sinh</label>
          <input name="birthday" type="date" {...register('birthday')} />
          <p className={s.textError}>{errors.birthday?.message}</p>
        </div>
        <div className={s.panel}>
          <label htmlFor="note">Ghi chú</label>
          <input
            name="note"
            placeholder="Ghi chú"
            type="text"
            {...register('note')}
          />
          <p className={s.textError}>{errors.note?.message}</p>
        </div>
        <div className={s.interaction}>
          <button onClick={() => history.push('/login')}>Đăng nhập</button>
          <button type="submit">Đăng Ký</button>
        </div>
      </form>
    </div>
  )
}

RegisterForm.prototype = {
  registerAccount: PropTypes.func
}

export default connect(null, { registerAccount })(RegisterForm)
