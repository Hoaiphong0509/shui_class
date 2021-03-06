import s from './styles.module.scss'
import LoaderComponent from 'components/core/LoaderComponent'
import General from 'components/DetailsIn4StudentComponent/General'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { getClassroomUserId } from 'services/redux/actions/classroom'
import { getCompetitionByStudent } from 'services/redux/actions/competition'
import { getProfileByUserId } from 'services/redux/actions/profile'
import { getScoreByStudent } from 'services/redux/actions/score'

const DetailIn4Student = ({
  user: { user, loading: ldu },
  profile: { profile, loading: ldp },
  classroom: { classroom, loading: ldcl },
  competition: { competitions, loading: ldc },
  score: { score, loading: lds },
  getProfileByUserId,
  getClassroomUserId,
  getScoreByStudent,
  getCompetitionByStudent,
  match
}) => {
  useEffect(() => {
    getProfileByUserId(match.params.id_student)
  }, [getProfileByUserId, match])
  useEffect(() => {
    getClassroomUserId(match.params.id_student)
  }, [getClassroomUserId, match])
  useEffect(() => {
    getScoreByStudent(match.params.id_student)
  }, [getScoreByStudent, match])
  useEffect(() => {
    getCompetitionByStudent(match.params.id_student)
  }, [getCompetitionByStudent, match])

  if (
    ldc ||
    lds ||
    ldp ||
    ldcl ||
    profile === null ||
    profile === undefined ||
    classroom === null ||
    classroom === undefined ||
    competitions === null ||
    competitions === undefined ||
    score === null ||
    score === undefined
  )
    return <LoaderComponent />

  return (
    <div className={s.root}>
      <div className={s.content}>
        <General profile={profile} classroom={classroom} user={user} />
      </div>
    </div>
  )
}

DetailIn4Student.prototype = {
  user: PropTypes.object,
  profile: PropTypes.object,
  score: PropTypes.object,
  classroom: PropTypes.object,
  competition: PropTypes.object,
  getProfileByUserId: PropTypes.func,
  getClassroomUserId: PropTypes.func,
  getScoreByStudent: PropTypes.func,
  getCompetitionByStudent: PropTypes.func
}

const mapStateToProps = (state) => ({
  profile: state.profile,
  user: state.user,
  classroom: state.classroom,
  score: state.score,
  competition: state.competition
})

export default connect(mapStateToProps, {
  getProfileByUserId,
  getClassroomUserId,
  getScoreByStudent,
  getCompetitionByStudent
})(DetailIn4Student)
