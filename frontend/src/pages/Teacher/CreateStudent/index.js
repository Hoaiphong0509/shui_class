import s from './styles.module.scss'

import LoaderComponent from 'components/core/LoaderComponent'
import FormAddStudent from 'components/Teacher/FormAddStudent'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { getStaffs } from 'services/redux/actions/staff'
import { getGuests } from 'services/redux/actions/student'
import { getStudentsMyClassroom } from 'services/redux/actions/teacher'

const CreateStudent = ({
  student: { students, loading: ldStu },
  staff: { staffs, loading: ldStf },
  classroom: { classroom, loading: ldCls },
  getStudentsMyClassroom,
  getGuests,
  getStaffs
}) => {
  useEffect(() => {
    getGuests()
  }, [getGuests])

  useEffect(() => {
    getStaffs()
  }, [getStaffs])

  useEffect(() => {
    getStudentsMyClassroom()
  }, [getStudentsMyClassroom])

  if (
    ldStu ||
    ldStf ||
    ldCls ||
    students === null ||
    staffs === null ||
    classroom === null
  )
    return <LoaderComponent />

  return (
    <div className={s.root}>
      <div className={s.form}>
        <FormAddStudent
          idClassroom={classroom._id.toString()}
          studentsAvailable={students}
          staffs={staffs}
        />
      </div>
    </div>
  )
}

CreateStudent.prototype = {
  student: PropTypes.object,
  staff: PropTypes.object,
  getGuests: PropTypes.func,
  getStaffs: PropTypes.func,
  getStudentsMyClassroom: PropTypes.func
}

const mapStateToProps = (state) => ({
  student: state.student,
  staff: state.staff,
  classroom: state.classroom
})

export default connect(mapStateToProps, {
  getGuests,
  getStaffs,
  getStudentsMyClassroom
})(CreateStudent)
