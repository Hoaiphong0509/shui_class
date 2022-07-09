import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import s from './styles.module.scss'
import TableStudent from './TableStudent'

import LoaderComponent from 'components/core/LoaderComponent'
import { getStudentMyClassroom } from 'services/redux/actions/teacher'
import { useHistory } from 'react-router-dom'

const HomeTeacherComponent = ({
  classroom: { classroom, loading },
  getStudentMyClassroom
}) => {
  const history = useHistory()

  useEffect(() => {
    getStudentMyClassroom()
  }, [getStudentMyClassroom])

  if (loading) return <LoaderComponent />
  if (classroom === null)
    return <h1>Bạn chưa là giáo viên chủ nhiệm của lớp nafoF</h1>

  const { name, students } = classroom

  const studentsData = students.filter(s => !s.isDelete)

  return (
    <div className={s.root}>
      <div className={s.container}>
        <h1 className={s.title}>Lớp {name.toUpperCase()}</h1>
        <div className={s.buttonArea}>
          <Button onClick={() => history.push('/createStudent')} variant="info">
            Thêm mới
          </Button>
          <Button
            onClick={() => history.push('/TrashStudent')}
            variant="secondary"
          >
            Thùng rác
          </Button>
        </div>
        <div className={s.table}>
          <TableStudent
            idClassroom={classroom._id.toString()}
            students={studentsData}
          />
        </div>
      </div>
    </div>
  )
}

HomeTeacherComponent.prototype = {
  classroom: PropTypes.object,
  getStudentMyClassroom: PropTypes.func
}

const mapStateToProps = (state) => ({
  classroom: state.classroom
})

export default connect(mapStateToProps, { getStudentMyClassroom })(
  HomeTeacherComponent
)
