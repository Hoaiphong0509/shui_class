import PropTypes from 'prop-types'
import { useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import ModalEditTeacher from './ModalEditTeacher'
import s from './styles.module.scss'

import { connect } from 'react-redux'
import { removeTeacherOutoClass } from 'services/redux/actions/admin'
import Swal from 'sweetalert2'

const TableClassroom = ({
                          classrooms,
                          teachers,
                          allusers,
                          me,
                          removeTeacherOutoClass
                        }) => {
  const [show, setShow] = useState(false)
  const [classIn4, setClassIn4] = useState()

  const handleEdit = (e, classroom) => {
    setShow(!show)
    setClassIn4(classroom)
  }

  let duplicates = []
  let unique = []
  for (let s of teachers) {
    if (classrooms.some((c) => c.headTeacher.user === s._id)) {
      duplicates.push(s)
    } else {
      unique.push(s)
    }
  }

  const handleDeleteTeacherOutClassroom = (e, idClassroom) => {
    Swal.fire({
      title: 'Xác nhận',
      text: 'Bạn có muốn xoá GVCN này ra khỏi lớp học',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e63c49',
      cancelButtonColor: '#ccc',
      confirmButtonText: 'Có',
      cancelButtonText: 'Huỷ'
    }).then(async (result) => {
      if (result.isConfirmed) {
        removeTeacherOutoClass(idClassroom)
      }
    })
  }
  return (
    <>
      <Table responsive hover className={s.root}>
        <thead>
        <tr>
          <th>STT</th>
          <th>Lớp</th>
          <th>Giáo viên chủ nhiệm</th>
          <th>Sỉ số học sinh</th>
          <th>#</th>
        </tr>
        </thead>
        <tbody>
        {classrooms &&
          classrooms.map((c, idx) => (
            <tr key={idx}>
              <td>{idx + 1}</td>
              <td>{c.name}</td>
              <td>{c.headTeacher?.teacherName}</td>
              <td>{c.students?.length}</td>
              <td>
                <Button
                  disabled={c?.headTeacher?.user !== null}
                  className={c?.headTeacher?.user !== null ? s.btnDisable : s.btnSuccess}
                  onClick={(e) => handleEdit(e, c)}
                >
                  Thêm GVCN
                </Button>
                <Button
                  className={s.btnDanger}
                  onClick={(e) => handleDeleteTeacherOutClassroom(e, c._id)}
                >
                  Xoá GVCN
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {classIn4 && (
        <ModalEditTeacher
          show={show}
          setShow={setShow}
          classIn4={classIn4}
          teacherAvaible={unique}
          me={me}
        />
      )}
    </>
  )
}

TableClassroom.prototype = {
  removeTeacherOutoClass: PropTypes.func
}

export default connect(null, {
  removeTeacherOutoClass
})(TableClassroom)
