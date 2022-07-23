import { yupResolver } from '@hookform/resolvers/yup'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { useForm } from 'react-hook-form'
import { connect } from 'react-redux'
import { addClassroom } from 'services/redux/actions/admin'
import * as yup from 'yup'
import s from './styles.module.scss'

const ModalAddClassroom = ({ show, setShow, addClassroom }) => {
  const handleClose = () => setShow(false)

  const schema = yup.object({
    name: yup.string().required('Lớp không được để trống!')
  })

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = (data) => {
    const payload = {
      name: data.name
    }
    addClassroom(payload)
    handleClose()
  }
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
          <Modal.Header closeButton>
            <Modal.Title>Thêm Lớp</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className={s.panel}>
              <label htmlFor="name">Tên lớp *</label>
              <input
                name="name"
                id="name"
                {...register('name')}
                placeholder="Ví dụ: 10A1"
              />
              <p className={s.textError}>{errors.name?.message}</p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Huỷ
            </Button>
            <Button variant="primary" type="submit">
              Lưu
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  )
}

ModalAddClassroom.prototype = {
  addClassroom: PropTypes.func
}

export default connect(null, {
  addClassroom
})(ModalAddClassroom)
