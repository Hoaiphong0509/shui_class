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
        {students.map((stud, idx) => (
          <tr key={idx}>
            <td>{idx + 1}</td>
            <td>{stud.fullName}</td>
            <td>
              <Button
                className={s.btnSuccess}
                onClick={() =>
                  history.push(`/sheet_competition/${stud.studentId}`)
                }
              >
                Xem điểm thi đua
              </Button>
            </td>
            <td>
              <Button
                className={s.btnSuccess}
                onClick={() => history.push(`/sheet_score_1/${stud.studentId}`)}
              >
                Xem điểm
              </Button>
              <Button
                className={s.btnInfo}
                onClick={() =>
                  history.push(`/update_score_1/${stud.studentId}`)
                }
              >
                Cập nhật
              </Button>
            </td>
            <td>
              <Button
                className={s.btnSuccess}
                onClick={() => history.push(`/sheet_score_2/${stud.studentId}`)}
              >
                Xem điểm
              </Button>
              <Button
                className={s.btnInfo}
                onClick={() =>
                  history.push(`/update_score_2/${stud.studentId}`)
                }
              >
                Cập nhật
              </Button>
            </td>
            <td>
              <Button
                className={s.btnSuccess}
                onClick={() =>
                  history.push(`/detail_in4_student/${stud.studentId}`)
                }
              >
                Chi tiết
              </Button>
              <Button
                className={s.btnInfo}
                onClick={() => history.push(`/updateStudent/${stud.studentId}`)}
              >
                Sửa
              </Button>
              <Button
                className={s.btnDanger}
                onClick={() => handleMoveToTrash(stud.studentId)}
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
