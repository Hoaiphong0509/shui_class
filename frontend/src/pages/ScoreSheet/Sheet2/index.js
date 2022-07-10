import LoaderComponent from 'components/core/LoaderComponent'
import TableScore from 'components/Score/TableScore'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getScoreByStudent } from 'services/redux/actions/score'
import s from './styles.module.scss'

const Sheet2 = ({ score: { score, loading }, getScoreByStudent, match }) => {
  const history = useHistory()
  useEffect(() => {
    getScoreByStudent(match.params.id_student)
  }, [getScoreByStudent, match])

  if (loading || score === null || score === undefined)
    return <LoaderComponent />

  const tempScoreObj = score?.filter((s) => s.hk === 2)

  return (
    <div className={s.root}>
      {score === null ||
      score === undefined ||
      tempScoreObj === null ||
      tempScoreObj === undefined ||
      tempScoreObj.length === 0 ? (
        <h1>Học sinh này chưa có điểm HKII</h1>
      ) : (
        <>
          <div className={s.in4}>
            <h1>Điểm HKI - {score[0]?.studentName}</h1>
          </div>
          <div className={s.table}>
            <TableScore score={tempScoreObj[0]} />
          </div>
        </>
      )}
      <div className={s.buttonArea}>
        <Button variant="secondary" onClick={() => history.push('/')}>
          Quay lại
        </Button>
        {score === null ||
        score === undefined ||
        tempScoreObj === null ||
        tempScoreObj === undefined ||
        tempScoreObj.length === 0 ? (
          <Button
            variant="primary"
            onClick={() => {
              history.push(`/add_score_2/${match.params.id_student}`)
            }}
          >
            Thêm điểm HKII
          </Button>
        ) : (
          <Button
            variant="primary"
            onClick={() =>
              history.push(`/update_score_2/${match.params.id_student}`)
            }
          >
            Cập nhật
          </Button>
        )}
      </div>
    </div>
  )
}

Sheet2.prototype = {
  score: PropTypes.object,
  getScoreByStudent: PropTypes.func
}

const mapStateToProps = (state) => ({
  score: state.score
})

export default connect(mapStateToProps, {
  getScoreByStudent
})(Sheet2)