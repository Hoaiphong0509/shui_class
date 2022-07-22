import moment from 'moment'
import { Button } from 'react-bootstrap'
import s from './styles.module.scss'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { deleteNotify } from 'services/redux/actions/notify'
import Swal from 'sweetalert2'

const NotifyItem = ({ notify, deleteNotify }) => {
  const { _id, text, updatedAt } = notify

  const handleDelete = () => {
    Swal.fire({
      title: 'Xác nhận',
      text: 'Bạn có muốn xoá học sinh này vào thùng rác',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e63c49',
      cancelButtonColor: '#ccc',
      confirmButtonText: 'Có',
      cancelButtonText: 'Huỷ'
    }).then(async (result) => {
      if (result.isConfirmed) {
        deleteNotify(_id)
      }
    })
  }
  return (
    <div className={s.root}>
      <p>
        {text} lúc <i>{moment(updatedAt).format('DD-MM-YYYY hh:mm')}</i>
      </p>
      <Button variant="danger" onClick={() => handleDelete()}>
        Xoá
      </Button>
    </div>
  )
}

NotifyItem.prototype = {
  deleteNotify: PropTypes.func
}

export default connect(null, {
  deleteNotify
})(NotifyItem)
