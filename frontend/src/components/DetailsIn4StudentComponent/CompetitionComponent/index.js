import LoaderComponent from 'components/core/LoaderComponent'
import { useState } from 'react'
import { Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import {
  classificationFunc, getCompetitionByWeek,
  totalAllCompetition,
  totalCompetitionByWeek
} from 'utils/AppUltils'
import s from './styles.module.scss'

const CompetitionComponent = ({ competitions }) => {
  const [comptData] = useState(competitions)
  const history = useHistory()

  if (!comptData) return <LoaderComponent />
  console.log('comptData', comptData)
  return (
    <div className={s.root}>
      <div className={s.scoreAll}>
        <h2>Tổng điểm thi đua</h2>
        <p>
          Trung bình:{' '}
          {!isNaN(totalAllCompetition(comptData))
            ? Number.parseFloat(totalAllCompetition(comptData)).toFixed(2)
            : ''}
        </p>
        <p>Xếp loại: {classificationFunc(+totalAllCompetition(comptData))}</p>
      </div>
      <div className={s.scoreAll}>
        <h2>Điểm thi đua đến tuần mới nhất</h2>
        <p>
          Trung bình:{' '}
          {!isNaN(totalCompetitionByWeek(comptData))
            ? Number.parseFloat(totalCompetitionByWeek(comptData)).toFixed(2)
            : ''}
        </p>
        <p>
          Xếp loại:{' '}
          {classificationFunc(+totalCompetitionByWeek(comptData))}
        </p>
      </div>
      <div className={s.scoreHk}>
        {[...Array(35)].map((x, i) => {
          const tmpCompt = getCompetitionByWeek(i + 1, comptData)
          return (
            <div className={s.scorePanel} key={i}>
              <h6>
                Tuần {i + 1}: {tmpCompt[0]?.avgAll}✡
              </h6>
              <p>Xếp loại: {tmpCompt[0]?.classification}</p>
              <Button
                variant="outline-info"
                onClick={() =>
                  history.push(
                    `/sheet_competition_by_week/${tmpCompt[0].user}/${i + 1}`
                  )
                }
              >
                Chi tiết
              </Button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default CompetitionComponent
