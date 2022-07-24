import LoaderComponent from 'components/core/LoaderComponent'
import Competition from 'components/DetailsIn4StudentComponent/Competition'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { getCompetitionByStudent } from 'services/redux/actions/competition'
import {
  getCurrentProfile,
  getProfileByUserId
} from 'services/redux/actions/profile'
import s from './styles.module.scss'

const CompetitionChild = ({
  user: { user, loading: ldu },
  profile: { myprofile, profile, loading: ldp },
  competition: { competition, loading: ldc },
  getCompetitionByStudent,
  getProfileByUserId,
  getCurrentProfile,
  match
}) => {
  useEffect(() => {
    getCompetitionByStudent(match.params.id_student)
  }, [getCompetitionByStudent, match])
  useEffect(() => {
    getProfileByUserId(match.params.id_student)
  }, [getProfileByUserId, match])
  useEffect(() => {
    getCurrentProfile()
  }, [getCurrentProfile])

  if (
    ldc ||
    ldp ||
    ldu ||
    competition === null ||
    competition === undefined ||
    user === null ||
    user === undefined ||
    profile === null ||
    profile === undefined ||
    myprofile === null ||
    myprofile === undefined
  )
    return <LoaderComponent />

  return (
    <div className={s.root}>
      <div className={s.content}>
        <div className={s.title}>
          <h2>Điểm thi đua học tập - {profile.fullName}</h2>
        </div>
        <div className={s.weeks}>
          <Competition
            competition={competition}
            studentId={profile.user.toString()}
          />
        </div>
      </div>
    </div>
  )
}

CompetitionChild.prototype = {
  competition: PropTypes.object,
  user: PropTypes.object,
  getCompetitionByStudent: PropTypes.func,
  getProfileByUserId: PropTypes.func
}

const mapStateToProps = (state) => ({
  competition: state.competition,
  user: state.user,
  profile: state.profile
})

export default connect(mapStateToProps, {
  getCompetitionByStudent,
  getCurrentProfile,
  getProfileByUserId
})(CompetitionChild)
