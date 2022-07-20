import LoaderComponent from 'components/core/LoaderComponent'
import Competition from 'components/DetailsIn4StudentComponent/Competition'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { getProfileByUserId } from 'services/redux/actions/profile'
import { getCompetitionByStudent } from 'services/redux/actions/competition'
import s from './styles.module.scss'

const CompetitionAll = ({
  user: { user, loading: ldu },
  competition: { competition, loading: ldc },
  profile: { profile, loading: ldp },
  getProfileByUserId,
  getCompetitionByStudent,
  match
}) => {
  useEffect(() => {
    getProfileByUserId(match.params.id_student)
  }, [getProfileByUserId, match])
  useEffect(() => {
    getCompetitionByStudent(match.params.id_student)
  }, [getCompetitionByStudent, match])

  if (
    ldc ||
    ldp ||
    ldu ||
    user === null ||
    profile === null ||
    competition === null
  )
    return <LoaderComponent />

  return (
    <div className={s.root}>
      <div className={s.scorePanel}>
        <Competition competition={competition} studentId={profile.user} />
      </div>
    </div>
  )
}

CompetitionAll.prototype = {
  user: PropTypes.object,
  profile: PropTypes.object,
  competition: PropTypes.object,
  getProfileByUserId: PropTypes.func,
  getCompetitionByStudent: PropTypes.func
}

const mapStateToProps = (state) => ({
  profile: state.profile,
  user: state.profile,
  competition: state.competition
})

export default connect(mapStateToProps, {
  getProfileByUserId,
  getCompetitionByStudent
})(CompetitionAll)
