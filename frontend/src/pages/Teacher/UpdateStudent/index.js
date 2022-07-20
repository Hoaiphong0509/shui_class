import s from './styles.module.scss'

import LoaderComponent from 'components/core/LoaderComponent'
import FormUpdateStudent from 'components/Teacher/FormUpdateStudent'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { getProfileByUserId } from 'services/redux/actions/profile'
import { getStaffs } from 'services/redux/actions/staff'

const UpdateStudent = ({
  profile: { profile, loading: ldp },
  staff: { staffs, loading: ldStf },
  classroom: { classroom, loading: ldCls },
  getStaffs,
  getProfileByUserId,
  match
}) => {
  useEffect(() => {
    getProfileByUserId(match.params.id_student)
  }, [getProfileByUserId, match])

  useEffect(() => {
    getStaffs()
  }, [getStaffs])

  if (
    ldp ||
    ldStf ||
    ldCls ||
    profile === null ||
    profile === undefined ||
    staffs === null ||
    classroom === null
  )
    return <LoaderComponent />

  return (
    <div className={s.root}>
      <div className={s.form}>
        <FormUpdateStudent profileStudent={profile} staffs={staffs} />
      </div>
    </div>
  )
}

UpdateStudent.prototype = {
  profile: PropTypes.object,
  staff: PropTypes.object,
  getProfileByUserId: PropTypes.func,
  getStaffs: PropTypes.func
}

const mapStateToProps = (state) => ({
  profile: state.profile,
  staff: state.staff,
  classroom: state.classroom
})

export default connect(mapStateToProps, {
  getProfileByUserId,
  getStaffs
})(UpdateStudent)
