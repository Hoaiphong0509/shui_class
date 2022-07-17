import PropTypes from 'prop-types'
import { Button, Table } from 'react-bootstrap'
import { connect } from 'react-redux'
import { deleteStudent, restoreStudent } from 'services/redux/actions/teacher'
import Swal from 'sweetalert2'
import s from './styles.module.scss'

const TrashStudents = ({
  idClassroom,
  students,
  restoreStudent,
  deleteStudent
}) => {
  if (students.length === 0) return <h1>Chưa có học sinh nào bị xoá</h1>
  const handleRestore = (idStudent) => {
    Swal.fire({
      title: 'Xác nhận',
      text: 'Bạn có muốn khôi phục học sinh này',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e63c49',
      cancelButtonColor: '#ccc',
      confirmButtonText: 'Có',
      cancelButtonText: 'Huỷ'
    }).then(async (result) => {
      if (result.isConfirmed) {
        restoreStudent(idClassroom, idStudent)
      }
    })
  }
  const handleDelete = (idStudent) => {
    Swal.fire({
      title: 'Xác nhận',
      text: 'Bạn có muốn xoá vĩnh viễn học sinh này!',
      icon: 'error',
      showCancelButton: true,
      confirmButtonColor: '#e63c49',
      cancelButtonColor: '#ccc',
      confirmButtonText: 'Có',
      cancelButtonText: 'Huỷ'
    }).then(async (result) => {
      if (result.isConfirmed) {
        deleteStudent(idClassroom, idStudent)
      }
    })
  }

  return (
    <Table responsive hover className={s.root}>
      <thead>
        <tr>
          <th>STT</th>
          <th>Học sinh</th>
          <th>Chức vụ</th>
          <th>Phụ huynh</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {students.map((s, idx) => (
          <tr key={idx}>
            <td>{idx + 1}</td>
            <td>{s.fullName}</td>
            <td>{s.staffDisplay}</td>
            <td>{s.parentName}</td>
            <td>
              <Button
                variant="outline-success"
                onClick={() => handleRestore(s.studentId)}
              >
                Khôi phục
              </Button>
              <Button
                variant="outline-danger"
                onClick={() => handleDelete(s.studentId)}
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

TrashStudents.prototype = {
  restoreStudent: PropTypes.func,
  deleteStudent: PropTypes.func
}

export default connect(null, {
  restoreStudent,
  deleteStudent
})(TrashStudents)
