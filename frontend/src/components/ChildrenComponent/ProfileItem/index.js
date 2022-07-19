import React from 'react'
import { Button } from 'react-bootstrap'
import s from './styles.module.scss'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { removeChildren } from 'services/redux/actions/parent'
import Swal from 'sweetalert2'
import { useHistory } from 'react-router-dom'

const ProfileItem = ({ profile, removeChildren }) => {
  const { user, classroom, avatar, name } = profile
  const history = useHistory()
  const handleRemove = () => {
    Swal.fire({
      title: 'Xác nhận',
      text: 'Bạn có muốn xoá học sinh này?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e63c49',
      cancelButtonColor: '#ccc',
      confirmButtonText: 'Có',
      cancelButtonText: 'Huỷ'
    }).then(async (result) => {
      if (result.isConfirmed) {
        removeChildren(user)
      }
    })
  }
  return (
    <div className={s.root}>
      <div className={s.img_placeholder}>
        <img
          src={avatar.length > 0 ? avatar : '/assets/img/avatar.png'}
          alt="avatar"
        />
      </div>
      <div className={s.in4}>
        <h3>{name}</h3>
        <p>Lớp: {classroom}</p>
        <div className={s.btns}>
          <Button
            variant="info"
            onClick={() => history.push(`/score_child/${user}`)}
          >
            Học tập
          </Button>
          <Button
            variant="info"
            onClick={() => history.push(`/competition_child/${user}`)}
          >
            Thi đua
          </Button>
          <Button variant="danger" onClick={handleRemove}>
            Xoá
          </Button>
        </div>
      </div>
    </div>
  )
}

ProfileItem.prototype = {
  removeChildren: PropTypes.func
}

export default connect(null, {
  removeChildren
})(ProfileItem)
