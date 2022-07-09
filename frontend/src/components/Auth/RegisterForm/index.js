import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import * as yup from 'yup'
import s from './styles.module.scss'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ToastContainer } from 'react-toastify'
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
        .min(6, 'Mật khẩu phải ít nhất 4 ký tự')
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
  }

  return (
    <>
      <div className={s.root}>
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
          <div className={s.interaction}>
            <button onClick={() => history.push('/login')}>Đăng nhập</button>
            <button type="submit">Đăng Ký</button>
          </div>
        </form>
      </div>
      <ToastContainer autoClose={5000} />
    </>
  )
}

RegisterForm.prototype = {
  registerAccount: PropTypes.func
}

export default connect(null, { registerAccount })(RegisterForm)
