import { yupResolver } from '@hookform/resolvers/yup'
import moment from 'moment'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { useForm } from 'react-hook-form'
import { connect } from 'react-redux'
import { addChildren } from 'services/redux/actions/teacher'
import * as yup from 'yup'
import s from './styles.module.scss'

const ModalAddChild = (props) => {
  const {
    show,
    setShow,
    childrenAvaible,
    addChildren,
    idParent
  } = props
  const handleClose = () => setShow(false)

  const schema = yup.object({
    username: yup.string().required('Học sinh không được để trống!')
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
      childrenUsername: data.username
    }
    await addChildren(payload, idParent)
    handleClose()
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
            <Modal.Title>Thêm học sinh</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className={s.panel}>
              <label htmlFor='username'>Học sinh *</label>
              <select {...register('username')}>
                {childrenAvaible &&
                  childrenAvaible.map((s, idx) => (
                    <option key={idx} value={s.username}>
                      {s.fullName} -{' '}
                      {s.birthday && moment(s.birthday).format('DD-MM-YYYY')}
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

ModalAddChild.prototype = {
  addChildren: PropTypes.func
}

export default connect(null, {
  addChildren
})(ModalAddChild)
