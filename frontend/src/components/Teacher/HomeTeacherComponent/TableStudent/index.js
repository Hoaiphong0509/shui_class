import PropTypes from 'prop-types'
import { Button, Table } from 'react-bootstrap'
import { connect } from 'react-redux'
import { moveStudentToTrash } from 'services/redux/actions/teacher'
import Swal from 'sweetalert2'
import s from './styles.module.scss'
import { useHistory } from 'react-router-dom'

const TableStudent = ({ idClassroom, students, moveStudentToTrash }) => {
  const history = useHistory()
  if (students.length === 0) return <h1>Lớp học này chưa có học sinh nào</h1>

  const handleMoveToTrash = (idStudent) => {
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
        moveStudentToTrash(idClassroom, idStudent)
      }
    })
  }

  return (
    <Table responsive hover className={s.root}>
      <thead>
        <tr>
          <th>STT</th>
          <th>Học sinh</th>
          <th>Thi đua</th>
          <th>Điểm HKI</th>
          <th>Điểm HKII</th>
          <th>Thông tin</th>
        </tr>
      </thead>
      <tbody>
        {students.map((s, idx) => (
          <tr key={idx}>
            <td>{idx + 1}</td>
            <td>{s.fullName}</td>
            <td>
              <Button
                variant="outline-success"
                onClick={() =>
                  history.push(`/sheet_competition_1/${s.studentId}`)
                }
              >
                Thi đua HKI
              </Button>
              <Button
                variant="outline-success"
                onClick={() =>
                  history.push(`/sheet_competition_2/${s.studentId}`)
                }
              >
                Thi đua HKII
              </Button>
            </td>
            <td>
              <Button
                variant="outline-success"
                onClick={() => history.push(`/sheet_score_1/${s.studentId}`)}
              >
                Xem điểm
              </Button>
              <Button
                variant="outline-warning"
                onClick={() => history.push(`/update_score_1/${s.studentId}`)}
              >
                Cập nhật
              </Button>
            </td>
            <td>
              <Button
                variant="outline-success"
                onClick={() => history.push(`/sheet_score_2/${s.studentId}`)}
              >
                Xem điểm
              </Button>
              <Button
                variant="outline-warning"
                onClick={() => history.push(`/update_score_2/${s.studentId}`)}
              >
                Cập nhật
              </Button>
            </td>
            <td>
              <Button
                variant="outline-success"
                onClick={() =>
                  history.push(`/detail_in4_student/${s.studentId}`)
                }
              >
                Chi tiết
              </Button>
              <Button
                variant="outline-warning"
                onClick={() =>
                  history.push(`/updateStudent/${s.studentId}`)
                }
              >
                Sửa
              </Button>
              <Button
                variant="outline-danger"
                onClick={() => handleMoveToTrash(s.studentId)}
              >
                Xoá học sinh
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

TableStudent.prototype = {
  moveStudentToTrash: PropTypes.func
}

export default connect(null, {
  moveStudentToTrash
})(TableStudent)
