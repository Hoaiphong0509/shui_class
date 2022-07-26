import TableCompetition from 'components/Competition/TableCompetition'
import LoaderComponent from 'components/core/LoaderComponent'
import { ROLES } from 'constants/AppConstants'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getCompetitionByStudent } from 'services/redux/actions/competition'
import {
  getCurrentProfile,
  getProfileByUserId
} from 'services/redux/actions/profile'
import s from './styles.module.scss'

const SheetCompetion = ({
  user: { user, loading: ldu },
  profile: { myprofile, profile, loading: ldp },
  competition: { competitions, loading: ldc },
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
    competitions === null ||
    competitions === undefined ||
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
          <h1>Chưa có điểm thi đua tuần {+match.params.no_week}</h1>
          <div>
            <Button
              style={{ marginRight: '5px' }}
              variant="secondary"
              onClick={() => history.goBack()}
            >
              Quay lại
            </Button>
            {user?.roles.includes(ROLES.TEACHER) ||
            myprofile.staffClass.some((s) => s.staffCode !== 0) ? (
              <Button
                variant="primary"
                onClick={() => {
                  history.push(
                    `/add_competition_by_week/${match.params.id_student}/${+match.params.no_week}`
                  )
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
              Điểm thi đua {match.params.no_week} -{' '}
              {competitions[0]?.studentName}
            </h1>
          </div>
          <div className={s.table}>
            <TableCompetition
              title="Tích cực"
              dataCompetitions={tempCompetitionObj[0]}
            />
          </div>
          <div className={s.buttonArea}>
            <Button variant="secondary" onClick={() => history.goBack()}>
              Quay lại
            </Button>
            {(user && user.roles.includes(ROLES.TEACHER)) ||
            myprofile.staffClass.some((s) => s.staffCode !== 0) ? (
              <Button
                variant="primary"
                onClick={() =>
                  history.push(
                    `/update_competition_by_week/${match.params.id_student}/${match.params.no_week}`
                  )
                }
              >
                Cập nhật
              </Button>
            ) : null}
          </div>
        </>
      )}
    </div>
  )
}

SheetCompetion.prototype = {
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
})(SheetCompetion)
