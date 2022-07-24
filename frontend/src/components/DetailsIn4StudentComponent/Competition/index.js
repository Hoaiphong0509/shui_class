import { Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { classificationPointFunc } from 'utils/AppUltils'
import s from './styles.module.scss'

const Competition = ({ competition, studentId }) => {
  const history = useHistory()

  const tempCompetitionObj = (hk) => competition?.filter((s) => s.hk === +hk)

  const totalAll = competition.reduce((prev, curr) => {
    let prevPoint = isNaN(prev.avgAll) ? 0 : prev.avgAll
    let currPoint = isNaN(curr.avgAll) ? 0 : curr.avgAll
    return prevPoint + currPoint
  }, 0) / 35

  return (
    <div className={s.root}>
      <div className={s.scoreAll}>
        <h2>Tổng điểm thi đua</h2>
        <p>
          Trung bình:{' '}
          {!isNaN(totalAll) ? Number.parseFloat(totalAll).toFixed(2) : ''}
        </p>
        <p>Xếp loại: {classificationPointFunc(+totalAll)}</p>
      </div>
      <div className={s.scoreHk}>
        {[...Array(35)].map((x, i) => (
          <div className={s.scorePanel} key={i}>
            <h6>
              Tuần {i + 1}: {tempCompetitionObj(i + 1)[0]?.avgAll}✡
            </h6>
            <p>Xếp loại: {tempCompetitionObj(i + 1)[0]?.classification}</p>
            <Button
              variant="outline-info"
              onClick={() =>
                history.push(`/sheet_competition_by_week/${studentId}/${i + 1}`)
              }
            >
              Chi tiết
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Competition
