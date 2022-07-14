import TableCompetition from 'components/Competition/TableCompetition'
import LoaderComponent from 'components/core/LoaderComponent'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getCompetitionByStudent } from 'services/redux/actions/competition'
import s from './styles.module.scss'

const SheetCompetion2 = ({
  competition: { competition, loading },
  getCompetitionByStudent,
  match
}) => {
  const history = useHistory()
  useEffect(() => {
    getCompetitionByStudent(match.params.id_student)
  }, [getCompetitionByStudent, match])

  if (loading || competition === null || competition === undefined)
    return <LoaderComponent />

  const tempCompetitionObj = competition?.filter((s) => s.hk === 2)

  return (
    <div className={s.root}>
      {competition === null ||
      competition === undefined ||
      tempCompetitionObj === null ||
      tempCompetitionObj === undefined ||
      tempCompetitionObj.length === 0 ? (
        <>
          <h1>Học sinh này chưa có điểm thi đua HKII</h1>
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
                history.push(`/add_competition_2/${match.params.id_student}`)
              }}
            >
              Thêm điểm thi đua HKII
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className={s.in4}>
            <h1>Điểm thi đua HKII - {competition[0]?.studentName}</h1>
          </div>
          <div className={s.table}>
            {/* <TableScore score={tempCompetitionObj[0]} /> */}
            <TableCompetition dataCompetitions={tempCompetitionObj[0]} />
          </div>
          <div className={s.buttonArea}>
            <Button variant="secondary" onClick={() => history.push('/')}>
              Quay lại
            </Button>
            <Button
              variant="primary"
              onClick={() =>
                history.push(`/update_competition_2/${match.params.id_student}`)
              }
            >
              Cập nhật
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

SheetCompetion2.prototype = {
  competition: PropTypes.object,
  getCompetitionByStudent: PropTypes.func
}

const mapStateToProps = (state) => ({
  competition: state.competition
})

export default connect(mapStateToProps, {
  getCompetitionByStudent
})(SheetCompetion2)
