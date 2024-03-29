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
import { ROLES } from 'constants/AppConstants'

const UpdateCompetionSheet = ({
  user: { user, loading: ldu },
  profile: { myprofile, profile, loading: ldp },
  competition: { competitions, loading: ldSc },
  getProfileByUserId,
  getCompetitionByStudent,
  match
}) => {
  const history = useHistory()
  useEffect(() => {
    getCompetitionByStudent(match.params.id_student)
  }, [getCompetitionByStudent, match])
  useEffect(() => {
    getProfileByUserId(match.params.id_student)
  }, [getProfileByUserId, match])

  if (
    ldp ||
    ldu ||
    ldSc ||
    user === null ||
    user === undefined ||
    profile === null ||
    profile === undefined ||
    myprofile === null ||
    myprofile === undefined
  )
    return <LoaderComponent />

  const tempCompetitionObj = competitions?.filter(
    (s) => +s.hk === +match.params.no_week
  )

  return (
    <div className={s.root}>
      {competitions === null ||
      competitions === undefined ||
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
            {user?.roles.includes(ROLES.TEACHER) ||
            myprofile.staffClass.some((s) => s.staffCode === 1) ? (
              <Button
                variant="primary"
                onClick={() => {
                  history.push(`/add_competition_1/${match.params.id_student}`)
                }}
              >
                Thêm điểm thi đua tuần {match.params.no_week}
              </Button>
            ) : null}
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
              competitions={tempCompetitionObj[0]}
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
  user: state.user,
  profile: state.profile,
  competition: state.competition
})

export default connect(mapStateToProps, {
  getProfileByUserId,
  getCompetitionByStudent
})(UpdateCompetionSheet)
