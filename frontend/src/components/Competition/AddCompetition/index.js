import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import * as yup from 'yup'
import s from './styles.module.scss'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addCompetition } from 'services/redux/actions/competition'
import { classificationFunc } from 'utils/AppUltils'

const AddCompetition = ({
  hk,
  idStudent,
  studentName,
  studentUsername,
  addCompetition
}) => {
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

  const onSubmit = (data) => {
    const payload = {
      studentName,
      studentUsername,
      hk,
      avgAll: totalPoints,
      classification: classificationFunc(totalPoints),
      ...data
    }
    addCompetition(idStudent, payload)
  }

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

  return (
    <div className={s.root}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={s.overview}>
          <div>Điểm tổng: {totalPoints ? totalPoints : 100}</div>
          <div>Xếp loại: {classificationFunc(+totalPoints)}</div>
        </div>
        <div className={s.detailsPoint}>
          <div className={s.point}>
            <h3 style={{ color: 'var(--green)' }}>Tích cực</h3>
            <div className={s.panel}>
              <div className={s.panel_in4}>
                <div>Tham gia xây dựng bài</div>
                <div className={s.panel_input}>
                  10 x{' '}
                  <input
                    type="number"
                    min={0}
                    step={1}
                    defaultValue={0}
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
                placeholder="Ghi chú"
                {...register('positivePoint.point_1.note')}
              />
            </div>
            <hr />
            <div className={s.panel}>
              <div className={s.panel_in4}>
                <div>Tham gia phong trào</div>
                <div className={s.panel_input}>
                  10 x{' '}
                  <input
                    type="number"
                    min="0"
                    step="1"
                    defaultValue="0"
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
                placeholder="Ghi chú"
                {...register('positivePoint.point_2.note')}
              />
            </div>
            <hr />
            <div className={s.panel}>
              <div className={s.panel_in4}>
                <div>Người tốt việc tốt</div>
                <div className={s.panel_input}>
                  10 x{' '}
                  <input
                    type="number"
                    min="0"
                    step="1"
                    defaultValue="0"
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
                placeholder="Ghi chú"
                {...register('positivePoint.point_3.note')}
              />
            </div>
            <hr />
            <div className={s.panel}>
              <div className={s.panel_in4}>
                <div>Kết quả học tập cải thiện</div>
                <div className={s.panel_input}>
                  10 x{' '}
                  <input
                    type="number"
                    min="0"
                    step="1"
                    defaultValue="0"
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
                placeholder="Ghi chú"
                {...register('positivePoint.point_4.note')}
              />
            </div>
            <hr />
            <div className={s.panel}>
              <div className={s.panel_in4}>
                <div>Khác</div>
                <div className={s.panel_input}>
                  10 x{' '}
                  <input
                    type="number"
                    min="0"
                    step="1"
                    defaultValue="0"
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
                placeholder="Ghi chú"
                {...register('positivePoint.point_5.note')}
              />
            </div>
            <hr />
          </div>
          <div className={s.point}>
            <h3 style={{ color: 'var(--red)' }}>Cần cải thiện</h3>
            <div className={s.panel}>
              <div className={s.panel_in4}>
                <div>Làm việc riêng trong giờ học</div>
                <div className={s.panel_input}>
                  10 x{' '}
                  <input
                    type="number"
                    min="0"
                    step="1"
                    defaultValue="0"
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
                placeholder="Ghi chú"
                {...register('negativePoint.point_1.note')}
              />
            </div>
            <hr />
            <div className={s.panel}>
              <div className={s.panel_in4}>
                <div>Đi học trễ</div>
                <div className={s.panel_input}>
                  10 x{' '}
                  <input
                    type="number"
                    min="0"
                    step="1"
                    defaultValue="0"
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
                placeholder="Ghi chú"
                {...register('negativePoint.point_2.note')}
              />
            </div>
            <hr />
            <div className={s.panel}>
              <div className={s.panel_in4}>
                <div>Nghỉ học không phép</div>
                <div className={s.panel_input}>
                  10 x{' '}
                  <input
                    type="number"
                    min="0"
                    step="1"
                    defaultValue="0"
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
                placeholder="Ghi chú"
                {...register('negativePoint.point_3.note')}
              />
            </div>
            <hr />
            <div className={s.panel}>
              <div className={s.panel_in4}>
                <div>Không hoàn thành bài tập, chuẩn bị bài trước</div>
                <div className={s.panel_input}>
                  10 x{' '}
                  <input
                    type="number"
                    min="0"
                    step="1"
                    defaultValue="0"
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
                placeholder="Ghi chú"
                {...register('negativePoint.point_4.note')}
              />
            </div>
            <hr />
            <div className={s.panel}>
              <div className={s.panel_in4}>
                <div>Sử dụng xe phân khối lớn</div>
                <div className={s.panel_input}>
                  10 x{' '}
                  <input
                    type="number"
                    min="0"
                    step="1"
                    defaultValue="0"
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
                placeholder="Ghi chú"
                {...register('negativePoint.point_5.note')}
              />
            </div>
            <hr />
            <div className={s.panel}>
              <div className={s.panel_in4}>
                <div>Khác</div>
                <div className={s.panel_input}>
                  10 x{' '}
                  <input
                    type="number"
                    min="0"
                    step="1"
                    defaultValue="0"
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
                placeholder="Ghi chú"
                {...register('negativePoint.point_6.note')}
              />
            </div>
            <hr />
          </div>
        </div>
        <div className={s.btnArea}>
          <Button variant="secondary" onClick={() => history.push('/')}>
            Quay về
          </Button>
          <Button variant="success" type="submit">
            Lưu
          </Button>
        </div>
      </form>
    </div>
  )
}

AddCompetition.prototype = {
  addCompetition: PropTypes.func
}

export default connect(null, { addCompetition })(AddCompetition)
