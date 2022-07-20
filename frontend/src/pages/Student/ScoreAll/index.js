import LoaderComponent from 'components/core/LoaderComponent'
import Score from 'components/DetailsIn4StudentComponent/Score'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { getProfileByUserId } from 'services/redux/actions/profile'
import { getScoreByStudent } from 'services/redux/actions/score'
import s from './styles.module.scss'

const ScoreAll = ({
  user: { user, loading: ldu },
  score: { score, loading: lds },
  profile: { profile, loading: ldp },
  getProfileByUserId,
  getScoreByStudent,
  match
}) => {
  useEffect(() => {
    getProfileByUserId(match.params.id_student)
  }, [getProfileByUserId, match])
  useEffect(() => {
    getScoreByStudent(match.params.id_student)
  }, [getScoreByStudent, match])

  if (lds || ldp || ldu || user === null || profile === null || score === null)
    return <LoaderComponent />

  return (
    <div className={s.root}>
      <div className={s.scorePanel}>
        <Score score={score} studentId={profile.user} />
      </div>
    </div>
  )
}

ScoreAll.prototype = {
  user: PropTypes.object,
  profile: PropTypes.object,
  score: PropTypes.object,
  getProfileByUserId: PropTypes.func,
  getScoreByStudent: PropTypes.func
}

const mapStateToProps = (state) => ({
  profile: state.profile,
  user: state.profile,
  score: state.score
})

export default connect(mapStateToProps, {
  getProfileByUserId,
  getScoreByStudent
})(ScoreAll)
