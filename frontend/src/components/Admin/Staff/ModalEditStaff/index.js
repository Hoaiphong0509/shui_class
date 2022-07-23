import { yupResolver } from '@hookform/resolvers/yup'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { useForm } from 'react-hook-form'
import { connect } from 'react-redux'
import { editStaff } from 'services/redux/actions/admin'
import * as yup from 'yup'
import s from './styles.module.scss'

const ModalEditStaff = ({ show, setShow, editStaff, staff }) => {
  const [defaulStaff, setDefaulStaff] = useState(staff.staffDisplay)
  useEffect(() => {
    setDefaulStaff(staff.staffDisplay)
  }, [staff])

  const schema = yup.object({
    staffDisplay: yup
      .string()
      .default(defaulStaff)
      .required('Tên ban cán không được để trống!')
  })

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })
  const handleClose = () => {
    setShow(false)
  }
  const onSubmit = (data) => {
    editStaff(staff._id, data)
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
                defaultValue={staff.staffCode}
                disabled
                name="staffCode"
                id="staffCode"
              />
            </div>
            <div className={s.panel}>
              <label htmlFor="name">Tên bán cán sự *</label>
              <input
                name="staffDisplay"
                id="staffDisplay"
                defaultValue={defaulStaff}
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

ModalEditStaff.prototype = {
  editStaff: PropTypes.func
}

export default connect(null, {
  editStaff
})(ModalEditStaff)
