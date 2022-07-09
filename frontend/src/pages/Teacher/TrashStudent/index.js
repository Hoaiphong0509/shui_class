import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import s from './styles.module.scss'

import LoaderComponent from 'components/core/LoaderComponent'
import TrashStudents from 'components/Teacher/TrashStudents'
import { useHistory } from 'react-router-dom'
import { getStudentMyClassroom } from 'services/redux/actions/teacher'
import { Button } from 'react-bootstrap'

const TrashStudent = ({
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

  const { students } = classroom

  const studentsData = students.filter((s) => s.isDelete)

  return (
    <div className={s.root}>
      <div className={s.container}>
        <h1 className={s.title}>HỌC SINH ĐÃ XOÁ</h1>
        <div className={s.table}>
          <TrashStudents
            idClassroom={classroom._id.toString()}
            students={studentsData}
          />
        </div>
        <div className={s.buttonArea}>
          <Button onClick={() => history.push('/')} variant="secondary">
            Quay lại
          </Button>
        </div>
      </div>
    </div>
  )
}

TrashStudent.prototype = {
  classroom: PropTypes.object,
  getStudentMyClassroom: PropTypes.func
}

const mapStateToProps = (state) => ({
  classroom: state.classroom
})

export default connect(mapStateToProps, { getStudentMyClassroom })(TrashStudent)
