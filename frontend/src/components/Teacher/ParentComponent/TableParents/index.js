import PropTypes from 'prop-types'
import { Button, Table } from 'react-bootstrap'
import { connect } from 'react-redux'
import { moveParentToTrash } from 'services/redux/actions/teacher'
import Swal from 'sweetalert2'
import s from './styles.module.scss'
import { useHistory } from 'react-router-dom'

const TableParents = ({ idClassroom, parents, moveParentToTrash }) => {
  const history = useHistory()
  if (parents.length === 0) return <h1>Lớp học này chưa có phụ huynh nào</h1>

  const handleMoveToTrash = (idParent) => {
    Swal.fire({
      title: 'Xác nhận',
      text: 'Bạn có muốn xoá phụ huynh này vào thùng rác',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'var(--red)',
      cancelButtonColor: '#ccc',
      confirmButtonText: 'Có',
      cancelButtonText: 'Huỷ'
    }).then(async (result) => {
      if (result.isConfirmed) {
        moveParentToTrash(idClassroom, idParent)
      }
    })
  }

  return (
    <Table responsive hover className={s.root}>
      <thead>
        <tr>
          <th>STT</th>
          <th>Họ tên</th>
          <th>Thông tin</th>
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
                onClick={() =>
                  history.push(`/detail_parent/${s.parentId}`)
                }
              >
                Chi tiết
              </Button>
              <Button
                variant="outline-danger"
                onClick={() => handleMoveToTrash(s.parentId)}
              >
                Xoá phụ huynh
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

TableParents.prototype = {
  moveParentToTrash: PropTypes.func
}

export default connect(null, {
  moveParentToTrash
})(TableParents)
