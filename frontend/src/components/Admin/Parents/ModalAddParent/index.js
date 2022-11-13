import { yupResolver } from '@hookform/resolvers/yup'
import moment from 'moment'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { useForm } from 'react-hook-form'
import { connect } from 'react-redux'
import { addParent } from 'services/redux/actions/admin'
import * as yup from 'yup'
import s from './styles.module.scss'

const ModalAddParent = ({ show, setShow, parentAvaible, addParent, me }) => {
  const handleClose = () => setShow(false)

  const schema = yup.object({
    username: yup.string().required('Phụ huynh không được để trống!')
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
    await addParent(payload)
    window.location.reload()
    handleClose()
  }

  const renderParentAvaible = parentAvaible?.filter((t) => t._id !== me._id)

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
            <Modal.Title>Thêm Phụ Huynh</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className={s.panel}>
              <label htmlFor='username'>Phụ Huynh *</label>
              <select {...register('username')}>
                {renderParentAvaible &&
                  renderParentAvaible.map((s, idx) => (
                    <option key={idx} value={s.username}>
                      {s._doc?.fullName} - {s.username} -{' '}
                      {s._doc?.birthday && moment(s._doc?.birthday).format('DD-MM-YYYY')}
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

ModalAddParent.prototype = {
  addParent: PropTypes.func
}

export default connect(null, {
  addParent
})(ModalAddParent)
