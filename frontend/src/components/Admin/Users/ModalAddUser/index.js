import { yupResolver } from '@hookform/resolvers/yup'
import moment from 'moment'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { useForm } from 'react-hook-form'
import { connect } from 'react-redux'
import { registerAccount } from 'services/redux/actions/user'
import * as yup from 'yup'
import s from './styles.module.scss'

const ModalAddUser = ({ show, setShow, registerAccount }) => {
  const handleClose = () => setShow(false)

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

  const hanldeAddUserSuccess = () => {
    window.location.reload()
    handleClose()
  }

  const onSubmit = async (data) => {
     await registerAccount(data, hanldeAddUserSuccess)
  }

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop='static'
        keyboard={false}
      >
        <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
          <Modal.Header closeButton>
            <Modal.Title>Thêm người dùng</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className={s.panel}>
              <label htmlFor='username'>Tài khoản</label>
              <input
                name='username'
                placeholder='Tài khoản'
                type='text'
                {...register('username')}
              />
              <p className={s.textError}>{errors.username?.message}</p>
            </div>
            <div className={s.panel}>
              <label htmlFor='password'>Mật khẩu</label>
              <input
                name='password'
                placeholder='Mật khẩu'
                type='password'
                {...register('password')}
              />
              <p className={s.textError}>{errors.password?.message}</p>
            </div>
            <div className={s.panel}>
              <label htmlFor='fullName'>Họ tên</label>
              <input
                name='fullName'
                placeholder='Ví dụ: Nguyễn Văn A'
                type='fullName'
                {...register('fullName')}
              />
              <p className={s.textError}>{errors.fullName?.message}</p>
            </div>
            <div className={s.panel}>
              <label htmlFor='birthday'>Ngày sinh</label>
              <input name='birthday' type='date' {...register('birthday')} />
              <p className={s.textError}>{errors.birthday?.message}</p>
            </div>
            <div className={s.panel}>
              <label htmlFor='note'>Ghi chú</label>
              <input
                name='note'
                placeholder='Ghi chú'
                type='text'
                {...register('note')}
              />
              <p className={s.textError}>{errors.note?.message}</p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={handleClose}>
              Huỷ
            </Button>
            <Button variant='primary' type='submit'>
              Lưu
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  )
}

ModalAddUser.prototype = {
  registerAccount: PropTypes.func
}

export default connect(null, {
  registerAccount
})(ModalAddUser)
