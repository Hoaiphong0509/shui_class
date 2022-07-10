import LoaderComponent from 'components/core/LoaderComponent'
import TableScore from 'components/Score/TableScore'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getScoreByStudent } from 'services/redux/actions/score'
import s from './styles.module.scss'

const Sheet1 = ({ score: { score, loading }, getScoreByStudent, match }) => {
  const history = useHistory()
  useEffect(() => {
    getScoreByStudent(match.params.id_student)
  }, [getScoreByStudent, match])

  if (loading || score === null || score === undefined)
    return <LoaderComponent />

  const tempScoreObj = score?.filter((s) => s.hk === 1)

  return (
    <div className={s.root}>
      {score === null ||
      score === undefined ||
      tempScoreObj === null ||
      tempScoreObj === undefined ||
      tempScoreObj.length === 0 ? (
        <>
          <h1>Học sinh này chưa có điểm HKI</h1>
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
                history.push(`/add_score_1/${match.params.id_student}`)
              }}
            >
              Thêm điểm HKI
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className={s.in4}>
            <h1>Điểm HKI - {score[0]?.studentName}</h1>
          </div>
          <div className={s.table}>
            <TableScore score={tempScoreObj[0]} />
          </div>
          <div className={s.buttonArea}>
            <Button variant="secondary" onClick={() => history.push('/')}>
              Quay lại
            </Button>
            <Button
              variant="primary"
              onClick={() =>
                history.push(`/update_score_1/${match.params.id_student}`)
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

Sheet1.prototype = {
  score: PropTypes.object,
  getScoreByStudent: PropTypes.func
}

const mapStateToProps = (state) => ({
  score: state.score
})

export default connect(mapStateToProps, {
  getScoreByStudent
})(Sheet1)
