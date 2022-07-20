import { yupResolver } from '@hookform/resolvers/yup'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import s from './styles.module.scss'

import moment from 'moment'
import { Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { addParent } from 'services/redux/actions/teacher'

const FormAddParent = ({
  idClassroom,
  parentsAvailable,
  addParent
}) => {
  const history = useHistory()

  const schema = yup
    .object({
      username: yup.string().required('Tài khoản không được bỏ trống')
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
    addParent(idClassroom, data)
    history.push('/parents')
  }

  return (
    <form className={s.root} onSubmit={handleSubmit(onSubmit)}>
      <div className={s.title}>
        <h1>Thêm phụ huynh</h1>
      </div>
      <div className={s.panel}>
        <label htmlFor="username" style={{ color: 'red' }}>
          Phụ huynh *
        </label>
        <select {...register('username')}>
          {parentsAvailable &&
            parentsAvailable.map((s, idx) => (
              <option key={idx} value={s.username}>
                {s.fullName} -{' '}
                {s.birthday && moment(s.birthday).format('DD-MM-YYYY')}
              </option>
            ))}
        </select>
        <p className={s.textError}>{errors.username?.message}</p>
      </div>
      <div className={s.interaction}>
        <Button variant="secondary" onClick={() => history.push('/')}>
          Quay lại
        </Button>
        <Button variant="success" type="submit">
          Lưu
        </Button>
      </div>
    </form>
  )
}

FormAddParent.prototype = {
  addParent: PropTypes.func
}

export default connect(null, {
  addParent
})(FormAddParent)
