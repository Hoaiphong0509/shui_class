import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import * as yup from 'yup'
import s from './styles.module.scss'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { login } from 'services/redux/actions/user'

const LoginForm = ({ login, loginAs, goBack }) => {
  const history = useHistory()
  const schema = yup
    .object({
      username: yup.string().required('Tài khoản không được bỏ trống'),
      password: yup.string().required('Mật khẩu không được bỏ trống')
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
    const payload = {
      ...data,
      role: loginAs
    }
    login(payload)
  }

  let loginAsDisplay = ''
  switch (loginAs) {
    case 'admin':
      loginAsDisplay = 'quản trị viên'
      break
    case 'teacher':
      loginAsDisplay = 'giáo viên chủ nhiệm'
      break
    case 'parent':
      loginAsDisplay = 'phụ huynh'
      break
    default:
      loginAsDisplay = 'học sinh'
      break
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
          <h1>ĐĂNG NHẬP {loginAsDisplay.toUpperCase()}</h1>
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
          <p className={s.textError}>{errors.username?.message}</p>
        </div>
        <div className={s.interaction}>
          <button onClick={() => goBack()}>Quay lại</button>
          <button onClick={() => history.push('/register')}>Đăng ký</button>
          <button type="submit">Đăng nhập</button>
        </div>
      </form>
    </div>
  )
}

LoginForm.prototype = {
  login: PropTypes.func
}

export default connect(null, { login })(LoginForm)
