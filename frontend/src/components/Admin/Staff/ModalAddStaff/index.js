import { yupResolver } from '@hookform/resolvers/yup'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { useForm } from 'react-hook-form'
import { connect } from 'react-redux'
import { addStaff } from 'services/redux/actions/admin'
import * as yup from 'yup'
import s from './styles.module.scss'

const ModalAddStaff = ({ show, setShow, addStaff }) => {
  const handleClose = () => setShow(false)

  const schema = yup.object({
    staffDisplay: yup.string().required('Tên ban cán không được để trống! '),
    staffCode: yup.string().required('Mã ban cán sự không được để trống!')
  })

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = (data) => {
    addStaff(data)
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
            <Modal.Title>Thêm chức vụ lớp</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className={s.panel}>
              <label htmlFor="name">Mã ban cán sự *</label>
              <input
                name="staffCode"
                id="staffCode"
                {...register('staffCode')}
                type="number"
                min={0}
                step={1}
              />
              <p className={s.textError}>{errors.staffCode?.message}</p>
            </div>
            <div className={s.panel}>
              <label htmlFor="name">Tên bán cán sự *</label>
              <input
                name="staffDisplay"
                id="staffDisplay"
                {...register('staffDisplay')}
              />
              <p className={s.textError}>{errors.staffDisplay?.message}</p>
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

ModalAddStaff.prototype = {
  addStaff: PropTypes.func
}

export default connect(null, {
  addStaff
})(ModalAddStaff)
