import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import s from './styles.module.scss'
import TableStudent from './TableStudent'

import LoaderComponent from 'components/core/LoaderComponent'
import { getStudentsMyClassroom } from 'services/redux/actions/teacher'
import { useHistory } from 'react-router-dom'

const HomeTeacherComponent = ({
  classroom: { classroom, loading },
  getStudentsMyClassroom
}) => {
  const history = useHistory()

  useEffect(() => {
    getStudentsMyClassroom()
  }, [getStudentsMyClassroom])

  if (loading) return <LoaderComponent />

  if (classroom === null || classroom === undefined)
    return <h1>Bạn chưa là giáo viên chủ nhiệm của lớp nào</h1>

  const { name, students } = classroom

  const studentsData = students?.filter((s) => !s.isDelete)

  return classroom === null || classroom === undefined ? (
    <h1>Bạn chưa là giáo viên chủ nhiệm của lớp nào</h1>
  ) : (
    <div className={s.root}>
      <div className={s.teacherContent}>
        <h1 className={s.title}>Lớp {name?.toUpperCase()}</h1>
        <div className={s.buttonArea}>
          <Button onClick={() => history.push('/createStudent')} variant="info">
            Thêm mới
          </Button>
          <Button
            onClick={() => history.push('/trashStudent')}
            variant="secondary"
          >
            Thùng rác
          </Button>
        </div>
        <div className={s.table}>
          {studentsData && (
            <TableStudent
              idClassroom={classroom?._id?.toString()}
              students={studentsData}
            />
          )}
        </div>
      </div>
    </div>
  )
}

HomeTeacherComponent.prototype = {
  classroom: PropTypes.object,
  getStudentsMyClassroom: PropTypes.func
}

const mapStateToProps = (state) => ({
  classroom: state.classroom
})

export default connect(mapStateToProps, { getStudentsMyClassroom })(
  HomeTeacherComponent
)
