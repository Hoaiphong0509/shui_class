import LoaderComponent from 'components/core/LoaderComponent'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { getCompetitionByStudent } from 'services/redux/actions/competition'
import {
  getCurrentProfile,
  getProfileByUserId
} from 'services/redux/actions/profile'
import s from './styles.module.scss'
import { useHistory } from 'react-router-dom'

const CompetitionList = ({
  user: { user, loading: ldu },
  profile: { myprofile, profile, loading: ldp },
  competition: { competition, loading: ldc },
  getCompetitionByStudent,
  getProfileByUserId,
  getCurrentProfile,
  match
}) => {
  const history = useHistory()
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
          {[...Array(35)].map((x, i) => (
            <div key={i}>
              <Button
                variant="outline-success"
                onClick={() =>
                  history.push(
                    `/sheet_competition_by_week/${profile.user.toString()}/${
                      i + 1
                    }`
                  )
                }
              >
                Tuần {i + 1}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

CompetitionList.prototype = {
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
})(CompetitionList)
