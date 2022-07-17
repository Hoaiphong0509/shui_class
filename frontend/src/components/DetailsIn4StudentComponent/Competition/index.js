import { Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { classificationPointFunc } from 'utils/AppUltils'
import s from './styles.module.scss'

const Competition = ({ competition, studentId }) => {
  const history = useHistory()

  const tempCompetitionObj1 = competition?.filter((s) => s.hk === 1)
  const tempCompetitionObj2 = competition?.filter((s) => s.hk === 2)

  const totalAll =
    (tempCompetitionObj1[0]?.avgAll + 2 * tempCompetitionObj2[0]?.avgAll) / 3
  return (
    <div className={s.root}>
      <div className={s.scoreHk}>
        <div className={s.scorePanel}>
          <h3>Điểm thi đua học kỳ I</h3>
          <p>Trung bình: {tempCompetitionObj1[0]?.avgAll}</p>
          <p>Xếp loại:{tempCompetitionObj1[0]?.classification}</p>
          <Button
            variant="info"
            onClick={() => history.push(`/sheet_competition_1/${studentId}`)}
          >
            Chi tiết
          </Button>
        </div>
        <div className={s.scorePanel}>
          <h3>Điểm thi đua học kỳ II</h3>
          <p>Trung bình: {tempCompetitionObj2[0]?.avgAll}</p>
          <p>Xếp loại:{tempCompetitionObj2[0]?.classification}</p>
          <Button
            variant="info"
            onClick={() => history.push(`/sheet_competition_2/${studentId}`)}
          >
            Chi tiết
          </Button>
        </div>
      </div>
      <div className={s.scoreAll}>
        <h2>Tổng điểm thi đua</h2>
        <p>
          Trung bình:{' '}
          {!isNaN(totalAll) ? Number.parseFloat(totalAll).toFixed(2) : ''}
        </p>
        <p>Xếp loại: {classificationPointFunc(+totalAll)}</p>
      </div>
    </div>
  )
}

export default Competition
