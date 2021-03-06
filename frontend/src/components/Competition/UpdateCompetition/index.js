import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import * as yup from 'yup'
import s from './styles.module.scss'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { updateCompetition } from 'services/redux/actions/competition'
import { classificationFunc } from 'utils/AppUltils'

const UpdateCompetition = ({
  hk,
  competition,
  idStudent,
  studentName,
  studentUsername,
  updateCompetition
}) => {
  const { negativePoint, positivePoint } = competition
  const history = useHistory()
  const schema = yup
    .object({
      positivePoint: yup.object({
        point_1: yup.object({
          time: yup.number().default(0),
          note: yup.string()
        }),
        point_2: yup.object({
          time: yup.number().default(0),
          note: yup.string()
        }),
        point_3: yup.object({
          time: yup.number().default(0),
          note: yup.string()
        }),
        point_4: yup.object({
          time: yup.number().default(0),
          note: yup.string()
        }),
        point_5: yup.object({
          time: yup.number().default(0),
          note: yup.string()
        })
      }),
      negativePoint: yup.object({
        point_1: yup.object({
          time: yup.number().default(0),
          note: yup.string()
        }),
        point_2: yup.object({
          time: yup.number().default(0),
          note: yup.string()
        }),
        point_3: yup.object({
          time: yup.number().default(0),
          note: yup.string()
        }),
        point_4: yup.object({
          time: yup.number().default(0),
          note: yup.string()
        }),
        point_5: yup.object({
          time: yup.number().default(0),
          note: yup.string()
        }),
        point_6: yup.object({
          time: yup.number().default(0),
          note: yup.string()
        })
      })
    })
    .required()
  const { register, handleSubmit, watch } = useForm({
    resolver: yupResolver(schema)
  })

  const totalPoints =
    100 +
    10 *
      (+watch('positivePoint.point_1.time') +
        +watch('positivePoint.point_2.time') +
        +watch('positivePoint.point_3.time') +
        +watch('positivePoint.point_4.time') +
        +watch('positivePoint.point_5.time') -
        +watch('negativePoint.point_1.time') -
        +watch('negativePoint.point_2.time') -
        +watch('negativePoint.point_3.time') -
        +watch('negativePoint.point_4.time') -
        +watch('negativePoint.point_5.time') -
        +watch('negativePoint.point_6.time'))

  const onSubmit = (data) => {
    const payload = {
      studentName,
      studentUsername,
      hk,
      avgAll: isNaN(totalPoints) ? 100 : totalPoints,
      classification: classificationFunc(
        isNaN(totalPoints) ? 100 : totalPoints
      ),
      ...data
    }
    updateCompetition(idStudent, payload)
  }

  return (
    <div className={s.root}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={s.overview}>
          <div>??i???m t???ng: {totalPoints ? totalPoints : 100}</div>
          <div>X???p lo???i: {classificationFunc(+totalPoints)}</div>
        </div>
        <div className={s.detailsPoint}>
          <div className={s.point}>
            <h3 style={{ color: 'var(--green)' }}>T??ch c???c</h3>
            <div className={s.panel}>
              <div className={s.panel_in4}>
                <div>Tham gia x??y d???ng b??i</div>
                <div className={s.panel_input}>
                  10 x{' '}
                  <input
                    type="number"
                    min={0}
                    step={1}
                    defaultValue={positivePoint.point_1.time}
                    value={positivePoint.point_1.time}
                    {...register('positivePoint.point_1.time')}
                  />{' '}
                  ={' '}
                  {10 *
                    (watch('positivePoint.point_1.time')
                      ? +watch('positivePoint.point_1.time')
                      : 0)}
                </div>
              </div>
              <input
                className={s.note}
                placeholder="Ghi ch??"
                defaultValue={positivePoint.point_1.note}
                value={positivePoint.point_1.note}
                {...register('positivePoint.point_1.note')}
              />
            </div>
            <hr />
            <div className={s.panel}>
              <div className={s.panel_in4}>
                <div>Tham gia phong tr??o</div>
                <div className={s.panel_input}>
                  10 x{' '}
                  <input
                    type="number"
                    min="0"
                    step="1"
                    defaultValue={positivePoint.point_2.time}
                    value={positivePoint.point_2.time}
                    {...register('positivePoint.point_2.time')}
                  />{' '}
                  ={' '}
                  {10 *
                    (watch('positivePoint.point_2.time')
                      ? watch('positivePoint.point_2.time')
                      : 0)}
                </div>
              </div>
              <input
                className={s.note}
                placeholder="Ghi ch??"
                defaultValue={positivePoint.point_2.note}
                value={positivePoint.point_2.note}
                {...register('positivePoint.point_2.note')}
              />
            </div>
            <hr />
            <div className={s.panel}>
              <div className={s.panel_in4}>
                <div>Ng?????i t???t vi???c t???t</div>
                <div className={s.panel_input}>
                  10 x{' '}
                  <input
                    type="number"
                    min="0"
                    step="1"
                    defaultValue={positivePoint.point_3.time}
                    value={positivePoint.point_3.time}
                    {...register('positivePoint.point_3.time')}
                  />{' '}
                  ={' '}
                  {10 *
                    (watch('positivePoint.point_3.time')
                      ? +watch('positivePoint.point_3.time')
                      : 0)}
                </div>
              </div>
              <input
                className={s.note}
                placeholder="Ghi ch??"
                defaultValue={positivePoint.point_3.note}
                value={positivePoint.point_3.note}
                {...register('positivePoint.point_3.note')}
              />
            </div>
            <hr />
            <div className={s.panel}>
              <div className={s.panel_in4}>
                <div>K???t qu??? h???c t???p c???i thi???n</div>
                <div className={s.panel_input}>
                  10 x{' '}
                  <input
                    type="number"
                    min="0"
                    step="1"
                    defaultValue={positivePoint.point_4.time}
                    value={positivePoint.point_4.time}
                    {...register('positivePoint.point_4.time')}
                  />{' '}
                  ={' '}
                  {10 *
                    (watch('positivePoint.point_4.time')
                      ? +watch('positivePoint.point_4.time')
                      : 0)}
                </div>
              </div>
              <input
                className={s.note}
                placeholder="Ghi ch??"
                defaultValue={positivePoint.point_4.note}
                value={positivePoint.point_4.note}
                {...register('positivePoint.point_4.note')}
              />
            </div>
            <hr />
            <div className={s.panel}>
              <div className={s.panel_in4}>
                <div>Kh??c</div>
                <div className={s.panel_input}>
                  10 x{' '}
                  <input
                    type="number"
                    min="0"
                    step="1"
                    defaultValue={positivePoint.point_5.time}
                    value={positivePoint.point_5.time}
                    {...register('positivePoint.point_5.time')}
                  />{' '}
                  ={' '}
                  {10 *
                    (watch('positivePoint.point_5.time')
                      ? +watch('positivePoint.point_5.time')
                      : 0)}
                </div>
              </div>
              <input
                className={s.note}
                placeholder="Ghi ch??"
                defaultValue={positivePoint.point_5.note}
                value={positivePoint.point_5.note}
                {...register('positivePoint.point_5.note')}
              />
            </div>
            <hr />
          </div>
          <div className={s.point}>
            <h3 style={{ color: 'var(--red)' }}>C???n c???i thi???n</h3>
            <div className={s.panel}>
              <div className={s.panel_in4}>
                <div>L??m vi???c ri??ng trong gi??? h???c</div>
                <div className={s.panel_input}>
                  10 x{' '}
                  <input
                    type="number"
                    min="0"
                    step="1"
                    defaultValue={negativePoint.point_1.time}
                    value={negativePoint.point_1.time}
                    {...register('negativePoint.point_1.time')}
                  />{' '}
                  ={' '}
                  {10 *
                    (watch('negativePoint.point_1.time')
                      ? +watch('negativePoint.point_1.time')
                      : 0)}
                </div>
              </div>
              <input
                className={s.note}
                placeholder="Ghi ch??"
                defaultValue={negativePoint.point_1.note}
                value={negativePoint.point_1.note}
                {...register('negativePoint.point_1.note')}
              />
            </div>
            <hr />
            <div className={s.panel}>
              <div className={s.panel_in4}>
                <div>??i h???c tr???</div>
                <div className={s.panel_input}>
                  10 x{' '}
                  <input
                    type="number"
                    min="0"
                    step="1"
                    defaultValue={negativePoint.point_2.time}
                    value={negativePoint.point_2.time}
                    {...register('negativePoint.point_2.time')}
                  />{' '}
                  ={' '}
                  {10 *
                    (watch('negativePoint.point_2.time')
                      ? +watch('negativePoint.point_2.time')
                      : 0)}
                </div>
              </div>
              <input
                className={s.note}
                placeholder="Ghi ch??"
                defaultValue={negativePoint.point_2.note}
                value={negativePoint.point_2.note}
                {...register('negativePoint.point_2.note')}
              />
            </div>
            <hr />
            <div className={s.panel}>
              <div className={s.panel_in4}>
                <div>Ngh??? h???c kh??ng ph??p</div>
                <div className={s.panel_input}>
                  10 x{' '}
                  <input
                    type="number"
                    min="0"
                    step="1"
                    defaultValue={negativePoint.point_3.time}
                    value={negativePoint.point_3.time}
                    {...register('negativePoint.point_3.time')}
                  />{' '}
                  ={' '}
                  {10 *
                    (watch('negativePoint.point_3.time')
                      ? +watch('negativePoint.point_3.time')
                      : 0)}
                </div>
              </div>
              <input
                className={s.note}
                placeholder="Ghi ch??"
                defaultValue={negativePoint.point_3.note}
                value={negativePoint.point_3.note}
                {...register('negativePoint.point_3.note')}
              />
            </div>
            <hr />
            <div className={s.panel}>
              <div className={s.panel_in4}>
                <div>Kh??ng ho??n th??nh b??i t???p, chu???n b??? b??i tr?????c</div>
                <div className={s.panel_input}>
                  10 x{' '}
                  <input
                    type="number"
                    min="0"
                    step="1"
                    defaultValue={negativePoint.point_4.time}
                    value={negativePoint.point_4.time}
                    {...register('negativePoint.point_4.time')}
                  />{' '}
                  ={' '}
                  {10 *
                    (watch('negativePoint.point_4.time')
                      ? +watch('negativePoint.point_4.time')
                      : 0)}
                </div>
              </div>
              <input
                className={s.note}
                placeholder="Ghi ch??"
                defaultValue={negativePoint.point_4.note}
                value={negativePoint.point_4.note}
                {...register('negativePoint.point_4.note')}
              />
            </div>
            <hr />
            <div className={s.panel}>
              <div className={s.panel_in4}>
                <div>S??? d???ng xe ph??n kh???i l???n</div>
                <div className={s.panel_input}>
                  10 x{' '}
                  <input
                    type="number"
                    min="0"
                    step="1"
                    defaultValue={negativePoint.point_5.time}
                    value={negativePoint.point_5.time}
                    {...register('negativePoint.point_5.time')}
                  />{' '}
                  ={' '}
                  {10 *
                    (watch('negativePoint.point_5.time')
                      ? +watch('negativePoint.point_5.time')
                      : 0)}
                </div>
              </div>
              <input
                className={s.note}
                placeholder="Ghi ch??"
                defaultValue={negativePoint.point_5.note}
                value={negativePoint.point_5.note}
                {...register('negativePoint.point_5.note')}
              />
            </div>
            <hr />
            <div className={s.panel}>
              <div className={s.panel_in4}>
                <div>Kh??c</div>
                <div className={s.panel_input}>
                  10 x{' '}
                  <input
                    type="number"
                    min="0"
                    step="1"
                    defaultValue={negativePoint.point_6.time}
                    value={negativePoint.point_6.time}
                    {...register('negativePoint.point_6.time')}
                  />{' '}
                  ={' '}
                  {10 *
                    (watch('negativePoint.point_6.time')
                      ? +watch('negativePoint.point_6.time')
                      : 0)}
                </div>
              </div>
              <input
                className={s.note}
                placeholder="Ghi ch??"
                defaultValue={negativePoint.point_6.note}
                value={negativePoint.point_6.note}
                {...register('negativePoint.point_6.note')}
              />
            </div>
            <hr />
          </div>
        </div>
        <div className={s.btnArea}>
          <Button variant="secondary" onClick={() => history.push('/')}>
            Quay v???
          </Button>
          <Button variant="success" type="submit">
            L??u
          </Button>
        </div>
      </form>
    </div>
  )
}

UpdateCompetition.prototype = {
  updateCompetition: PropTypes.func
}

export default connect(null, { updateCompetition })(UpdateCompetition)
