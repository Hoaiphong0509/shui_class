import PropTypes from 'prop-types'
import { Button, Table } from 'react-bootstrap'
import { connect } from 'react-redux'
import { deleteParent, restoreParent } from 'services/redux/actions/teacher'
import Swal from 'sweetalert2'
import s from './styles.module.scss'

const TrashParents = ({
  idClassroom,
  parents,
  restoreParent,
  deleteParent
}) => {
  if (parents.length === 0) return <h1>Chưa có phụ huynh nào bị xoá</h1>
  const handleRestore = (idParent) => {
    Swal.fire({
      title: 'Xác nhận',
      text: 'Bạn có muốn khôi phục phụ huynh này',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e63c49',
      cancelButtonColor: '#ccc',
      confirmButtonText: 'Có',
      cancelButtonText: 'Huỷ'
    }).then(async (result) => {
      if (result.isConfirmed) {
        restoreParent(idClassroom, idParent)
      }
    })
  }
  const handleDelete = (idParent) => {
    Swal.fire({
      title: 'Xác nhận',
      text: 'Bạn có muốn xoá vĩnh viễn phụ huynh này!',
      icon: 'error',
      showCancelButton: true,
      confirmButtonColor: '#e63c49',
      cancelButtonColor: '#ccc',
      confirmButtonText: 'Có',
      cancelButtonText: 'Huỷ'
    }).then(async (result) => {
      if (result.isConfirmed) {
        deleteParent(idClassroom, idParent)
      }
    })
  }

  return (
    <Table responsive hover className={s.root}>
      <thead>
        <tr>
          <th>STT</th>
          <th>Phụ huynh</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {parents.map((s, idx) => (
          <tr key={idx}>
            <td>{idx + 1}</td>
            <td>{s.fullName}</td>
            <td>
              <Button
                variant="outline-success"
                onClick={() => handleRestore(s.parentId)}
              >
                Khôi phục
              </Button>
              <Button
                variant="outline-danger"
                onClick={() => handleDelete(s.parentId)}
              >
                Xoá vĩnh viễn
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

TrashParents.prototype = {
  restoreParent: PropTypes.func,
  deleteParent: PropTypes.func
}

export default connect(null, {
  restoreParent,
  deleteParent
})(TrashParents)
