import { yupResolver } from '@hookform/resolvers/yup'
import moment from 'moment'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { useForm } from 'react-hook-form'
import { connect } from 'react-redux'
import { addTeacher } from 'services/redux/actions/admin'
import * as yup from 'yup'
import s from './styles.module.scss'

const ModalAddTeacher = ({ show, setShow, teacherAvaible, addTeacher, me }) => {
  const handleClose = () => setShow(false)

  const schema = yup.object({
    username: yup.string().required('Giáo viên không được để trống!')
  })

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = async (data) => {
    const payload = {
      username: data.username
    }
    await addTeacher(payload)
    window.location.reload()
    handleClose()
  }

  const renderteacherAvaible = teacherAvaible?.filter((t) => t._id !== me._id)

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
            <Modal.Title>Thêm giáo viên</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className={s.panel}>
              <label htmlFor='username'>Giáo viên *</label>
              <select {...register('username')}>
                {renderteacherAvaible &&
                  renderteacherAvaible.map((s, idx) => (
                    <option key={idx} value={s.username}>
                      {s._doc.fullName} - {' '}
                      {s._doc.birthday && moment(s._doc.birthday).format('DD-MM-YYYY')}
                    </option>
                  ))}
              </select>
              <p className={s.textError}>{errors.username?.message}</p>
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

ModalAddTeacher.prototype = {
  addTeacher: PropTypes.func
}

export default connect(null, {
  addTeacher
})(ModalAddTeacher)
