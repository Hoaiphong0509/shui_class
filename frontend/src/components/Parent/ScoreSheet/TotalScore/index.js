import { classificationPointFunc } from 'utils/AppUltils'
import s from './styles.module.scss'

const TotalScore = ({ score }) => {


  const tempScoreObj1 = score?.filter((s) => s.hk === 1)
  const tempScoreObj2 = score?.filter((s) => s.hk === 2)

  const totalAll = (tempScoreObj1[0]?.avgAll + 2 * tempScoreObj2[0]?.avgAll) / 3
  return (
    <div className={s.root}>
      <div className={s.scoreHk}>
        <div className={s.scorePanel}>
          <h3>Điểm học kỳ I</h3>
          <p>Trung bình: {tempScoreObj1[0]?.avgAll}</p>
          <p>Xếp loại:{tempScoreObj1[0]?.classification}</p>
        </div>
        <div className={s.scorePanel}>
          <h3>Điểm học kỳ II</h3>
          <p>Trung bình: {tempScoreObj2[0]?.avgAll}</p>
          <p>Xếp loại:{tempScoreObj2[0]?.classification}</p>
        </div>
      </div>
      <div className={s.scoreAll}>
        <h2>Tổng điểm</h2>
        <p>
          Trung bình:{' '}
          {!isNaN(totalAll) ? Number.parseFloat(totalAll).toFixed(2) : ''}
        </p>
        <p>Xếp loại: {classificationPointFunc(+totalAll)}</p>
      </div>
    </div>
  )
}

export default TotalScore
