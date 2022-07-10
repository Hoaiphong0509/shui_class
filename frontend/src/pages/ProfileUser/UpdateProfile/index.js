import LoaderComponent from 'components/core/LoaderComponent'
import UpdateProfileComponent from 'components/Profile/UpdateProfileComponent'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { getMyClassroom } from 'services/redux/actions/classroom'
import { getCurrentProfile } from 'services/redux/actions/profile'
import s from './styles.module.scss'

const UpdateProfile = ({
  profile: { profile, loading: ldp },
  user: { user, loading: ldu },
  classroom: { classroom, loading: ldc },
  getCurrentProfile,
  getMyClassroom
}) => {
  useEffect(() => {
    getCurrentProfile()
  }, [getCurrentProfile])

  useEffect(() => {
    getMyClassroom()
  }, [getMyClassroom])

  if (
    ldp ||
    ldc ||
    ldu ||
    profile === null ||
    classroom === null ||
    user === null
  )
    return <LoaderComponent />

  return (
    <div className={s.root}>
      <UpdateProfileComponent
        profile={profile}
        classroom={classroom}
        user={user}
      />
    </div>
  )
}

UpdateProfile.prototype = {
  profile: PropTypes.object,
  classroom: PropTypes.object,
  URLSearchParams: PropTypes.object,
  getCurrentProfile: PropTypes.func,
  getMyClassroom: PropTypes.func
}

const mapStateToProps = (state) => ({
  profile: state.profile,
  user: state.user,
  classroom: state.classroom
})

export default connect(mapStateToProps, {
  getCurrentProfile,
  getMyClassroom
})(UpdateProfile)
