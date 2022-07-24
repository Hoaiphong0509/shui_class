import UpdateCompetition from 'components/Competition/UpdateCompetition'
import LoaderComponent from 'components/core/LoaderComponent'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getProfileByUserId } from 'services/redux/actions/profile'
import { getCompetitionByStudent } from 'services/redux/actions/competition'
import s from './styles.module.scss'

const UpdateCompetionSheet = ({
  profile: { profile, loading: ldp },
  competition: { competition, loading: ldSc },
  getProfileByUserId,
  getCompetitionByStudent,
  match
}) => {
  const history = useHistory()
  useEffect(() => {
    getProfileByUserId(match.params.id_student)
  }, [getProfileByUserId, match])

  useEffect(() => {
    getCompetitionByStudent(match.params.id_student)
  }, [getCompetitionByStudent, match])

  if (
    ldp ||
    ldSc ||
    profile === null ||
    profile === undefined ||
    competition === null ||
    competition === undefined
  )
    return <LoaderComponent />

  const tempCompetitionObj = competition?.filter(
    (s) => s.hk === +match.params.no_week
  )

  return (
    <div className={s.root}>
      {competition === null ||
      competition === undefined ||
      tempCompetitionObj === null ||
      tempCompetitionObj === undefined ||
      tempCompetitionObj.length === 0 ? (
        <>
          <h1>Học sinh này chưa có điểm thi đua tuần {match.params.no_week}</h1>
          <div>
            <Button
              style={{ marginRight: '5px' }}
              variant="secondary"
              onClick={() => history.push('/')}
            >
              Quay lại
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                history.push(`/add_competition_1/${match.params.id_student}`)
              }}
            >
              Thêm điểm thi đua tuần {match.params.no_week}
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className={s.in4}>
            <h1>
              Cập nhật điểm thi đua tuần {match.params.no_week} -{' '}
              {profile?.fullName}
            </h1>
          </div>
          <div className={s.formUpdateCompetition}>
            <UpdateCompetition
              hk={match.params.no_week}
              competition={tempCompetitionObj[0]}
              idStudent={match.params.id_student}
              studentName={profile?.fullName}
              studentUsername={profile?.username}
            />
          </div>
        </>
      )}
    </div>
  )
}

UpdateCompetionSheet.prototype = {
  profile: PropTypes.object,
  getProfileByUserId: PropTypes.func,
  getCompetitionByStudent: PropTypes.func
}

const mapStateToProps = (state) => ({
  profile: state.profile,
  competition: state.competition
})

export default connect(mapStateToProps, {
  getProfileByUserId,
  getCompetitionByStudent
})(UpdateCompetionSheet)
