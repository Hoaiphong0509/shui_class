import { ROLES } from 'constants/AppConstants'
import moment from 'moment'
import { Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import s from './styles.module.scss'

const DetailsProfileComponent = ({ user, profile, classroom }) => {
  const history = useHistory()
  const {
    avatar,
    fullName,
    birthday,
    staffClass,
    address = '',
    phone = ''
  } = profile
  return (
    <div className={s.root}>
      <div className={s.in4}>
        <img
          src={avatar.length > 0 ? avatar : '/assets/img/avatar.png'}
          alt="avatar"
        />
        <h3>{fullName}</h3>
        <h3>{moment(birthday).format('DD-MM-YYYY')}</h3>
      </div>
      <div className={s.general}>
        <div className={s.panel}>
          <div>
            <h4>Địa chỉ</h4>
            <p>{address}</p>
          </div>
          <div>
            <h4>Số điện thoại</h4>
            <p>{phone}</p>
          </div>
        </div>
        <div className={s.panel}>
          <div>
            <h4>Lớp học</h4>
            <p>{classroom.name}</p>
          </div>
          <div>
            <h4>Chức vụ</h4>
            <p>
              {user?.roles.includes(ROLES.TEACHER)
                ? 'Giáo viên chủ nhiệm'
                : staffClass[0]?.staffDisplay}
            </p>
          </div>
        </div>
        <div className={s.panel}>
          <div>
            <Button variant="secondary" onClick={() => history.push('/')}>
              Trang chủ
            </Button>
            <Button
              variant="info"
              onClick={() => history.push('/update_profile')}
            >
              Cập nhật
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailsProfileComponent
