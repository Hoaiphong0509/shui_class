import { Button, Table } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import s from './styles.module.scss'
import { useSelector } from 'react-redux'
import { ROLES } from '../../../constants/AppConstants'

const TableStaffStudent = ({ students }) => {
  const history = useHistory()
  const user = useSelector(state => state.user.user)

  if (students.length === 0) return <h1>Lớp học này chưa có học sinh nào</h1>

  return (
    <Table responsive hover className={s.root}>
      <thead>
      <tr>
        <th>STT</th>
        <th>Học sinh</th>
        <th>Thi đua</th>
        {user?.roles.includes(ROLES.STUDENT) ? null : <>
          <th>Điểm HKI</th>
          <th>Điểm HKII</th>
        </>}
      </tr>
      </thead>
      <tbody>
      {students.map((s, idx) => (
        <tr key={idx}>
          <td>{idx + 1}</td>
          <td>{s.fullName}</td>
          <td>
            <Button
              variant='outline-success'
              onClick={() =>
                history.push(`/sheet_competition/${s.studentId}`)
              }
            >
              Xem điểm thi đua
            </Button>
          </td>
          {user?.roles.includes(ROLES.STUDENT) ? null : <>
            <td>
              <Button
                variant='outline-success'
                onClick={() => history.push(`/sheet_score_1/${s.studentId}`)}
              >
                Xem điểm
              </Button>
            </td>
            <td>
              <Button
                variant='outline-success'
                onClick={() => history.push(`/sheet_score_2/${s.studentId}`)}
              >
                Xem điểm
              </Button>
            </td>
          </>}
        </tr>
      ))}
      </tbody>
    </Table>
  )
}

export default TableStaffStudent
