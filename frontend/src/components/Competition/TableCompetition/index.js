import React from 'react'
import s from './styles.module.scss'

const TableCompetition = (props) => {
  const { dataCompetitions } = props
  const { avgAll, positivePoint, negativePoint, classification } =
    dataCompetitions

  return (
    <div className={s.root}>
      <div className={s.overview}>
        <div>Điểm tổng: {avgAll ? avgAll : 0} </div>
        <div>Xếp loại: {classification}</div>
      </div>
      <div className={s.detailsPoint}>
        <div className={s.point}>
          <h3 style={{ color: 'var(--green)' }}>Tích cực</h3>
          <div className={s.panel}>
            <div className={s.panel_in4}>
              <p>{positivePoint.point_1.name}</p>
              <p>
                {positivePoint.point_1.point} x {positivePoint.point_1.time}{' '}
                =&nbsp;
                {positivePoint.point_1.point * positivePoint.point_1.time}
              </p>
            </div>
            <p className={s.note}>
              {positivePoint.point_1.note.length > 0
                ? positivePoint.point_1.note
                : '...'}
            </p>
          </div>
          <hr />
          <div className={s.panel}>
            <div className={s.panel_in4}>
              <p>{positivePoint.point_2.name}</p>
              <p>
                {positivePoint.point_2.point} x {positivePoint.point_2.time}{' '}
                =&nbsp;
                {positivePoint.point_2.point * positivePoint.point_2.time}
              </p>
            </div>
            <p className={s.note}>
              {positivePoint.point_2.note.length > 0
                ? positivePoint.point_2.note
                : `...`}
            </p>
          </div>
          <hr />
          <div className={s.panel}>
            <div className={s.panel_in4}>
              <p>{positivePoint.point_3.name}</p>
              <p>
                {positivePoint.point_3.point} x {positivePoint.point_3.time}{' '}
                =&nbsp;
                {positivePoint.point_3.point * positivePoint.point_3.time}
              </p>
            </div>
            <p className={s.note}>
              {positivePoint.point_3.note.length > 0
                ? positivePoint.point_3.note
                : '...'}
            </p>
          </div>
          <hr />
          <div className={s.panel}>
            <div className={s.panel_in4}>
              <p>{positivePoint.point_4.name}</p>
              <p>
                {positivePoint.point_4.point} x {positivePoint.point_4.time}{' '}
                =&nbsp;
                {positivePoint.point_4.point * positivePoint.point_4.time}
              </p>
            </div>
            <p className={s.note}>
              {positivePoint.point_4.note.length > 0
                ? positivePoint.point_4.note
                : '...'}
            </p>
          </div>
          <hr />
          <div className={s.panel}>
            <div className={s.panel_in4}>
              <p>{positivePoint.point_5.name}</p>
              <p>
                {positivePoint.point_5.point} x {positivePoint.point_5.time}{' '}
                =&nbsp;
                {positivePoint.point_5.point * positivePoint.point_5.time}
              </p>
            </div>
            <p className={s.note}>
              {positivePoint.point_5.note.length > 0
                ? positivePoint.point_5.note
                : '...'}
            </p>
          </div>
          <hr />
        </div>
        <div className={s.point}>
          <h3 style={{ color: 'var(--red)' }}>Cần cải thiện</h3>
          <div className={s.panel}>
            <div className={s.panel_in4}>
              <p>{negativePoint.point_1.name}</p>
              <p>
                {negativePoint.point_1.point} x {negativePoint.point_1.time}{' '}
                =&nbsp;
                {negativePoint.point_1.point * negativePoint.point_1.time}
              </p>
            </div>
            <p className={s.note}>
              {negativePoint.point_1.note.length > 0
                ? negativePoint.point_1.note
                : '...'}
            </p>
          </div>
          <hr />
          <div className={s.panel}>
            <div className={s.panel_in4}>
              <p>{negativePoint.point_2.name}</p>
              <p>
                {negativePoint.point_2.point} x {negativePoint.point_2.time}{' '}
                =&nbsp;
                {negativePoint.point_2.point * negativePoint.point_2.time}
              </p>
            </div>
            <p className={s.note}>
              {negativePoint.point_2.note.length > 0
                ? negativePoint.point_2.note
                : `...`}
            </p>
          </div>
          <hr />
          <div className={s.panel}>
            <div className={s.panel_in4}>
              <p>{negativePoint.point_3.name}</p>
              <p>
                {negativePoint.point_3.point} x {negativePoint.point_3.time}{' '}
                =&nbsp;
                {negativePoint.point_3.point * negativePoint.point_3.time}
              </p>
            </div>
            <p className={s.note}>
              {negativePoint.point_3.note.length > 0
                ? negativePoint.point_3.note
                : '...'}
            </p>
          </div>
          <hr />
          <div className={s.panel}>
            <div className={s.panel_in4}>
              <p>{negativePoint.point_4.name}</p>
              <p>
                {negativePoint.point_4.point} x {negativePoint.point_4.time}{' '}
                =&nbsp;
                {negativePoint.point_4.point * negativePoint.point_4.time}
              </p>
            </div>
            <p className={s.note}>
              {negativePoint.point_4.note.length > 0
                ? negativePoint.point_4.note
                : '...'}
            </p>
          </div>
          <hr />
          <div className={s.panel}>
            <div className={s.panel_in4}>
              <p>{negativePoint.point_5.name}</p>
              <p>
                {negativePoint.point_5.point} x {negativePoint.point_5.time}{' '}
                =&nbsp;
                {negativePoint.point_5.point * negativePoint.point_5.time}
              </p>
            </div>
            <p className={s.note}>
              {negativePoint.point_5.note.length > 0
                ? negativePoint.point_5.note
                : '...'}
            </p>
          </div>
          <hr />
          <div className={s.panel}>
            <div className={s.panel_in4}>
              <p>{negativePoint.point_6.name}</p>
              <p>
                {negativePoint.point_6.point} x {negativePoint.point_6.time}{' '}
                =&nbsp;
                {negativePoint.point_6.point * negativePoint.point_6.time}
              </p>
            </div>
            <p className={s.note}>
              {negativePoint.point_6.note.length > 0
                ? negativePoint.point_6.note
                : '...'}
            </p>
          </div>
          <hr />
        </div>
      </div>
    </div>
  )
}

export default TableCompetition
