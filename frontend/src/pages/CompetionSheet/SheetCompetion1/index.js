import TableCompetition from 'components/Competition/TableCompetition'
import LoaderComponent from 'components/core/LoaderComponent'
import { ROLES } from 'constants/AppConstants'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getCompetitionByStudent } from 'services/redux/actions/competition'
import s from './styles.module.scss'

const SheetCompetion1 = ({
  user: { user, loading: ldu },
  competition: { competition, loading: ldc },
  getCompetitionByStudent,
  match
}) => {
  const history = useHistory()
  useEffect(() => {
    getCompetitionByStudent(match.params.id_student)
  }, [getCompetitionByStudent, match])

  if (
    ldc ||
    ldu ||
    competition === null ||
    competition === undefined ||
    user === null ||
    user === undefined
  )
    return <LoaderComponent />

  const tempCompetitionObj = competition?.filter((s) => s.hk === 1)

  return (
    <div className={s.root}>
      {competition === null ||
      competition === undefined ||
      tempCompetitionObj === null ||
      tempCompetitionObj === undefined ||
      tempCompetitionObj.length === 0 ? (
        <>
          <h1>Chưa có điểm thi đua HKI</h1>
          <div>
            <Button
              style={{ marginRight: '5px' }}
              variant="secondary"
              onClick={() => history.push('/')}
            >
              Quay lại
            </Button>
            {user?.roles.includes(ROLES.TEACHER) ? (
              <Button
                variant="primary"
                onClick={() => {
                  history.push(`/add_competition_1/${match.params.id_student}`)
                }}
              >
                Thêm điểm thi đua HKI
              </Button>
            ) : null}
          </div>
        </>
      ) : (
        <>
          <div className={s.in4}>
            <h1>Điểm thi đua HKI - {competition[0]?.studentName}</h1>
          </div>
          <div className={s.table}>
            <TableCompetition
              title="Tích cực"
              dataCompetitions={tempCompetitionObj[0]}
            />
          </div>
          <div className={s.buttonArea}>
            <Button variant="secondary" onClick={() => history.push('/')}>
              Quay lại
            </Button>
            {user && user.roles.includes(ROLES.TEACHER) ? (
              <Button
                variant="primary"
                onClick={() =>
                  history.push(
                    `/update_competition_1/${match.params.id_student}`
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

SheetCompetion1.prototype = {
  competition: PropTypes.object,
  user: PropTypes.object,
  getCompetitionByStudent: PropTypes.func
}

const mapStateToProps = (state) => ({
  competition: state.competition,
  user: state.user
})

export default connect(mapStateToProps, {
  getCompetitionByStudent
})(SheetCompetion1)
