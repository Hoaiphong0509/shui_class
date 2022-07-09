import s from './styles.module.scss'

import LoaderComponent from 'components/core/LoaderComponent'
import FormAddStudent from 'components/Teacher/FormAddStudent'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { getStaffs } from 'services/redux/actions/staff'
import { getStudents } from 'services/redux/actions/student'
import { getStudentMyClassroom } from 'services/redux/actions/teacher'

const CreateStudent = ({
  student: { students, loading: ldStu },
  staff: { staffs, loading: ldStf },
  classroom: { classroom, loading: ldCls },
  getStudentMyClassroom,
  getStudents,
  getStaffs
}) => {
  useEffect(() => {
    getStudents()
  }, [getStudents])

  useEffect(() => {
    getStaffs()
  }, [getStaffs])

  useEffect(() => {
    getStudentMyClassroom()
  }, [getStudentMyClassroom])

  if (
    ldStu ||
    ldStf ||
    ldCls ||
    students === null ||
    staffs === null ||
    classroom === null
  )
    return <LoaderComponent />

  let duplicates = []
  let unique = []
  for (let s of students) {
    if (classroom.students.some((cs) => cs.studentId === s.user)) {
      duplicates.push(s)
    } else {
      unique.push(s)
    }
  }
  for (let cs of classroom.students) {
    if (!duplicates.some((dup) => dup.user === cs.studentId)) {
      unique.push(cs)
    }
  }

  return (
    <div className={s.root}>
      <div className={s.form}>
        <FormAddStudent
          idClassroom={classroom._id.toString()}
          studentsAvailable={unique}
          staffs={staffs}
        />
      </div>
    </div>
  )
}

CreateStudent.prototype = {
  student: PropTypes.object,
  staff: PropTypes.object,
  getStudents: PropTypes.func,
  getStaffs: PropTypes.func,
  getStudentMyClassroom: PropTypes.func
}

const mapStateToProps = (state) => ({
  student: state.student,
  staff: state.staff,
  classroom: state.classroom
})

export default connect(mapStateToProps, {
  getStudents,
  getStaffs,
  getStudentMyClassroom
})(CreateStudent)
