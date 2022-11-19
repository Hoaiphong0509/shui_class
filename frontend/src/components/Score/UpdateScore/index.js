import React from 'react'
import { Button, Table } from 'react-bootstrap'
import s from './styles.module.scss'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { Link } from 'react-router-dom'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { updateScore } from 'services/redux/actions/score'
import {
  calcAvgPoint,
  CalcTotalPoint,
  classificationPointFunc
} from 'utils/AppUltils'

const UpdateScore = (props) => {
  const {
    hk,
    score,
    studentName,
    studentUsername,
    idStudent,
    updateScore
  } = props

  const {
    math: mth,
    physics: phy,
    chemistry: che,
    literature: lit,
    english: eng,
    biology: bio,
    civic: civ,
    tech: tec,
    geography: geo,
    history: his,
    it: itt,
    dnu: dunn
  } = score
  
  const schema = yup
    .object({
      math: yup.object().shape({
        oral_1: yup.number().min(0).max(10),
        oral_2: yup.number().min(0).max(10),
        test15m_1: yup.number().min(0).max(10),
        test15m_2: yup.number().min(0).max(10),
        test15m_3: yup.number().min(0).max(10),
        test45m_1: yup.number().min(0).max(10),
        test45m_2: yup.number().min(0).max(10),
        final: yup.number().min(0).max(10),
        avg: yup.string()
      }),
      physics: yup.object().shape({
        oral_1: yup.number().min(0).max(10),
        oral_2: yup.number().min(0).max(10),
        test15m_1: yup.number().min(0).max(10),
        test15m_2: yup.number().min(0).max(10),
        test15m_3: yup.number().min(0).max(10),
        test45m_1: yup.number().min(0).max(10),
        test45m_2: yup.number().min(0).max(10),
        final: yup.number().min(0).max(10),
        avg: yup.string()
      }),
      chemistry: yup.object().shape({
        oral_1: yup.number().min(0).max(10),
        oral_2: yup.number().min(0).max(10),
        test15m_1: yup.number().min(0).max(10),
        test15m_2: yup.number().min(0).max(10),
        test15m_3: yup.number().min(0).max(10),
        test45m_1: yup.number().min(0).max(10),
        test45m_2: yup.number().min(0).max(10),
        final: yup.number().min(0).max(10),
        avg: yup.string()
      }),
      literature: yup.object().shape({
        oral_1: yup.number().min(0).max(10),
        oral_2: yup.number().min(0).max(10),
        test15m_1: yup.number().min(0).max(10),
        test15m_2: yup.number().min(0).max(10),
        test15m_3: yup.number().min(0).max(10),
        test45m_1: yup.number().min(0).max(10),
        test45m_2: yup.number().min(0).max(10),
        final: yup.number().min(0).max(10),
        avg: yup.string()
      }),
      english: yup.object().shape({
        oral_1: yup.number().min(0).max(10),
        oral_2: yup.number().min(0).max(10),
        test15m_1: yup.number().min(0).max(10),
        test15m_2: yup.number().min(0).max(10),
        test15m_3: yup.number().min(0).max(10),
        test45m_1: yup.number().min(0).max(10),
        test45m_2: yup.number().min(0).max(10),
        final: yup.number().min(0).max(10),
        avg: yup.string()
      }),
      biology: yup.object().shape({
        oral_1: yup.number().min(0).max(10),
        oral_2: yup.number().min(0).max(10),
        test15m_1: yup.number().min(0).max(10),
        test15m_2: yup.number().min(0).max(10),
        test15m_3: yup.number().min(0).max(10),
        test45m_1: yup.number().min(0).max(10),
        test45m_2: yup.number().min(0).max(10),
        final: yup.number().min(0).max(10),
        avg: yup.string()
      }),
      civic: yup.object().shape({
        oral_1: yup.number().min(0).max(10),
        oral_2: yup.number().min(0).max(10),
        test15m_1: yup.number().min(0).max(10),
        test15m_2: yup.number().min(0).max(10),
        test15m_3: yup.number().min(0).max(10),
        test45m_1: yup.number().min(0).max(10),
        test45m_2: yup.number().min(0).max(10),
        final: yup.number().min(0).max(10),
        avg: yup.string()
      }),
      tech: yup.object().shape({
        oral_1: yup.number().min(0).max(10),
        oral_2: yup.number().min(0).max(10),
        test15m_1: yup.number().min(0).max(10),
        test15m_2: yup.number().min(0).max(10),
        test15m_3: yup.number().min(0).max(10),
        test45m_1: yup.number().min(0).max(10),
        test45m_2: yup.number().min(0).max(10),
        final: yup.number().min(0).max(10),
        avg: yup.string()
      }),
      geography: yup.object().shape({
        oral_1: yup.number().min(0).max(10),
        oral_2: yup.number().min(0).max(10),
        test15m_1: yup.number().min(0).max(10),
        test15m_2: yup.number().min(0).max(10),
        test15m_3: yup.number().min(0).max(10),
        test45m_1: yup.number().min(0).max(10),
        test45m_2: yup.number().min(0).max(10),
        final: yup.number().min(0).max(10),
        avg: yup.string()
      }),
      history: yup.object().shape({
        oral_1: yup.number().min(0).max(10),
        oral_2: yup.number().min(0).max(10),
        test15m_1: yup.number().min(0).max(10),
        test15m_2: yup.number().min(0).max(10),
        test15m_3: yup.number().min(0).max(10),
        test45m_1: yup.number().min(0).max(10),
        test45m_2: yup.number().min(0).max(10),
        final: yup.number().min(0).max(10),
        avg: yup.string()
      }),
      it: yup.object().shape({
        oral_1: yup.number().min(0).max(10),
        oral_2: yup.number().min(0).max(10),
        test15m_1: yup.number().min(0).max(10),
        test15m_2: yup.number().min(0).max(10),
        test15m_3: yup.number().min(0).max(10),
        test45m_1: yup.number().min(0).max(10),
        test45m_2: yup.number().min(0).max(10),
        final: yup.number().min(0).max(10),
        avg: yup.string()
      }),
      dnu: yup.object().shape({
        oral_1: yup.number().min(0).max(10),
        oral_2: yup.number().min(0).max(10),
        test15m_1: yup.number().min(0).max(10),
        test15m_2: yup.number().min(0).max(10),
        test15m_3: yup.number().min(0).max(10),
        test45m_1: yup.number().min(0).max(10),
        test45m_2: yup.number().min(0).max(10),
        final: yup.number().min(0).max(10),
        avg: yup.string()
      })
    })
    .required()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  const avgMath = calcAvgPoint(
    watch('math.oral_1'),
    watch('math.oral_2'),
    watch('math.test15m_1'),
    watch('math.test15m_2'),
    watch('math.test15m_3'),
    watch('math.test45m_1'),
    watch('math.test45m_2'),
    watch('math.final')
  )
  const avgPhysic = calcAvgPoint(
    watch('physics.oral_1'),
    watch('physics.oral_2'),
    watch('physics.test15m_1'),
    watch('physics.test15m_2'),
    watch('physics.test15m_3'),
    watch('physics.test45m_1'),
    watch('physics.test45m_2'),
    watch('physics.final')
  )
  const avgChem = calcAvgPoint(
    watch('chemistry.oral_1'),
    watch('chemistry.oral_2'),
    watch('chemistry.test15m_1'),
    watch('chemistry.test15m_2'),
    watch('chemistry.test15m_3'),
    watch('chemistry.test45m_1'),
    watch('chemistry.test45m_2'),
    watch('chemistry.final')
  )
  const avgLit = calcAvgPoint(
    watch('literature.oral_1'),
    watch('literature.oral_2'),
    watch('literature.test15m_1'),
    watch('literature.test15m_2'),
    watch('literature.test15m_3'),
    watch('literature.test45m_1'),
    watch('literature.test45m_2'),
    watch('literature.final')
  )
  const avgEng = calcAvgPoint(
    watch('english.oral_1'),
    watch('english.oral_2'),
    watch('english.test15m_1'),
    watch('english.test15m_2'),
    watch('english.test15m_3'),
    watch('english.test45m_1'),
    watch('english.test45m_2'),
    watch('english.final')
  )
  const avgBio = calcAvgPoint(
    watch('biology.oral_1'),
    watch('biology.oral_2'),
    watch('biology.test15m_1'),
    watch('biology.test15m_2'),
    watch('biology.test15m_3'),
    watch('biology.test45m_1'),
    watch('biology.test45m_2'),
    watch('biology.final')
  )
  const avgCiv = calcAvgPoint(
    watch('civic.oral_1'),
    watch('civic.oral_2'),
    watch('civic.test15m_1'),
    watch('civic.test15m_2'),
    watch('civic.test15m_3'),
    watch('civic.test45m_1'),
    watch('civic.test45m_2'),
    watch('civic.final')
  )
  const avgTech = calcAvgPoint(
    watch('tech.oral_1'),
    watch('tech.oral_2'),
    watch('tech.test15m_1'),
    watch('tech.test15m_2'),
    watch('tech.test15m_3'),
    watch('tech.test45m_1'),
    watch('tech.test45m_2'),
    watch('tech.final')
  )
  const avgGeo = calcAvgPoint(
    watch('geography.oral_1'),
    watch('geography.oral_2'),
    watch('geography.test15m_1'),
    watch('geography.test15m_2'),
    watch('geography.test15m_3'),
    watch('geography.test45m_1'),
    watch('geography.test45m_2'),
    watch('geography.final')
  )
  const avgHis = calcAvgPoint(
    watch('history.oral_1'),
    watch('history.oral_2'),
    watch('history.test15m_1'),
    watch('history.test15m_2'),
    watch('history.test15m_3'),
    watch('history.test45m_1'),
    watch('history.test45m_2'),
    watch('history.final')
  )
  const avgItt = calcAvgPoint(
    watch('it.oral_1'),
    watch('it.oral_2'),
    watch('it.test15m_1'),
    watch('it.test15m_2'),
    watch('it.test15m_3'),
    watch('it.test45m_1'),
    watch('it.test45m_2'),
    watch('it.final')
  )
  const avgDnu = calcAvgPoint(
    watch('dnu.oral_1'),
    watch('dnu.oral_2'),
    watch('dnu.test15m_1'),
    watch('dnu.test15m_2'),
    watch('dnu.test15m_3'),
    watch('dnu.test45m_1'),
    watch('dnu.test45m_2'),
    watch('dnu.final')
  )

  const totalPoint = CalcTotalPoint(
    avgMath,
    avgLit,
    avgEng,
    avgPhysic,
    avgChem,
    avgBio,
    avgCiv,
    avgTech,
    avgGeo,
    avgHis,
    avgItt,
    avgDnu
  )

  const onSubmit = (data) => {
    const tp = +totalPoint
    const xl = classificationPointFunc(+totalPoint)

    const payload = {
      ...data,
      classification: xl,
      avgAll: +tp,
      hk,
      studentName,
      studentUsername
    }
    updateScore(idStudent, payload)
  }

  return (
    <form className={s.root} onSubmit={handleSubmit(onSubmit)}>
      <div>
        <h3>
          Trung bình cả năm:{' '}
          <b>
            {totalPoint !== 'NaN'
              ? Number.parseFloat(totalPoint).toFixed(2)
              : '0'}
          </b>
        </h3>
        <h3>
          Xếp loại:<b>{classificationPointFunc(+totalPoint)}</b>
        </h3>
      </div>
      <Table className={s.table} bordered responsive hover>
        <thead>
        <tr>
          <th>Môn học</th>
          <th colSpan='2'>Điểm miệng</th>
          <th colSpan='3'>Điểm 15 phút</th>
          <th colSpan='2'>Điểm 1 tiết</th>
          <th>Điểm thi</th>
          <th>Điểm trung bình</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>Toán</td>
          <td>
            <input
              type='number'
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault()
                }
              }}
              defaultValue={mth.oral_1}
              {...register('math.oral_1')}
              className={`${
                errors?.math?.oral_1?.message ? s.error_input : null
              }`}
            />
          </td>
          <td>
            <input
              type='number'
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault()
                }
              }}
              defaultValue={mth.oral_2}
              {...register('math.oral_2')}
              className={`${
                errors?.math?.oral_2?.message ? s.error_input : null
              }`}
            />
          </td>
          <td>
            <input
              type='number'
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault()
                }
              }}
              defaultValue={mth.test15m_1}
              {...register('math.test15m_1')}
              className={`${
                errors?.math?.test15m_1?.message ? s.error_input : null
              }`}
            />
          </td>
          <td>
            <input
              type='number'
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault()
                }
              }}
              defaultValue={mth.test15m_2}
              {...register('math.test15m_2')}
              className={`${
                errors?.math?.test15m_2?.message ? s.error_input : null
              }`}
            />
          </td>
          <td>
            <input
              type='number'
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault()
                }
              }}
              defaultValue={mth.test15m_3}
              {...register('math.test15m_3')}
              className={`${
                errors?.math?.test15m_3?.message ? s.error_input : null
              }`}
            />
          </td>
          <td>
            <input
              type='number'
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault()
                }
              }}
              defaultValue={mth.test45m_1}
              {...register('math.test45m_1')}
              className={`${
                errors?.math?.test45m_1?.message ? s.error_input : null
              }`}
            />
          </td>
          <td>
            <input
              type='number'
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault()
                }
              }}
              defaultValue={mth.test45m_2}
              {...register('math.test45m_2')}
              className={`${
                errors?.math?.test45m_2?.message ? s.error_input : null
              }`}
            />
          </td>
          <td>
            <input
              type='number'
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault()
                }
              }}
              defaultValue={mth.final}
              {...register('math.final')}
              className={`${
                errors?.math?.final?.message ? s.error_input : null
              }`}
            />
          </td>
          <td>
            <input
              type='number'
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault()
                }
              }}

              value={avgMath}
              defaultValue={avgMath}
              {...register('math.avg')}
              className={`${
                errors?.math?.avg?.message ? s.error_input : null
              }`}
            />
          </td>
        </tr>
        <tr>
          <td>Vật lý</td>
          <td>
            <input
              type='number'
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault()
                }
              }}
              defaultValue={phy.oral_1}
              {...register('physics.oral_1')}
              className={`${
                errors?.physics?.oral_1?.message ? s.error_input : null
              }`}
            />
          </td>
          <td>
            <input
              type='number'
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault()
                }
              }}
              defaultValue={phy.oral_2}
              {...register('physics.oral_2')}
              className={`${
                errors?.physics?.oral_2?.message ? s.error_input : null
              }`}
            />
          </td>
          <td>
            <input
              type='number'
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault()
                }
              }}
              defaultValue={phy.test15m_1}
              {...register('physics.test15m_1')}
              className={`${
                errors?.physics?.test15m_1?.message ? s.error_input : null
              }`}
            />
          </td>
          <td>
            <input
              type='number'
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault()
                }
              }}
              defaultValue={phy.test15m_2}
              {...register('physics.test15m_2')}
              className={`${
                errors?.physics?.test15m_2?.message ? s.error_input : null
              }`}
            />
          </td>
          <td>
            <input
              type='number'
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault()
                }
              }}
              defaultValue={phy.test15m_3}
              {...register('physics.test15m_3')}
              className={`${
                errors?.physics?.test15m_3?.message ? s.error_input : null
              }`}
            />
          </td>
          <td>
            <input
              type='number'
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault()
                }
              }}
              defaultValue={phy.test45m_1}
              {...register('physics.test45m_1')}
              className={`${
                errors?.physics?.test45m_1?.message ? s.error_input : null
              }`}
            />
          </td>
          <td>
            <input
              type='number'
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault()
                }
              }}
              defaultValue={phy.test45m_2}
              {...register('physics.test45m_2')}
              className={`${
                errors?.physics?.test45m_2?.message ? s.error_input : null
              }`}
            />
          </td>
          <td>
            <input
              type='number'
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault()
                }
              }}
              defaultValue={phy.final}
              {...register('physics.final')}
              className={`${
                errors?.physics?.final?.message ? s.error_input : null
              }`}
            />
          </td>
          <td>
            <input
              type='number'
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault()
                }
              }}

              value={avgPhysic}
              defaultValue={avgPhysic}
              {...register('physics.avg')}
              className={`${
                errors?.physics?.avg?.message ? s.error_input : null
              }`}
            />
          </td>
        </tr>
        <tr>
          <td>Hoá học</td>
          <td>
            <input
              type='number'
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault()
                }
              }}
              defaultValue={che.oral_1}
              {...register('chemistry.oral_1')}
              className={`${
                errors?.chemistry?.oral_1?.message ? s.error_input : null
              }`}
            />
          </td>
          <td>
            <input
              type='number'
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault()
                }
              }}
              defaultValue={che.oral_2}
              {...register('chemistry.oral_2')}
              className={`${
                errors?.chemistry?.oral_2?.message ? s.error_input : null
              }`}
            />
          </td>
          <td>
            <input
              type='number'
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault()
                }
              }}
              defaultValue={che.test15m_1}
              {...register('chemistry.test15m_1')}
              className={`${
                errors?.chemistry?.test15m_1?.message ? s.error_input : null
              }`}
            />
          </td>
          <td>
            <input
              type='number'
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault()
                }
              }}
              defaultValue={che.test15m_2}
              {...register('chemistry.test15m_2')}
              className={`${
                errors?.chemistry?.test15m_2?.message ? s.error_input : null
              }`}
            />
          </td>
          <td>
            <input
              type='number'
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault()
                }
              }}
              defaultValue={che.test15m_3}
              {...register('chemistry.test15m_3')}
              className={`${
                errors?.chemistry?.test15m_3?.message ? s.error_input : null
              }`}
            />
          </td>
          <td>
            <input
              type='number'
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault()
                }
              }}
              defaultValue={che.test45m_1}
              {...register('chemistry.test45m_1')}
              className={`${
                errors?.chemistry?.test45m_1?.message ? s.error_input : null
              }`}
            />
          </td>
          <td>
            <input
              type='number'
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault()
                }
              }}
              defaultValue={che.test45m_2}
              {...register('chemistry.test45m_2')}
              className={`${
                errors?.chemistry?.test45m_2?.message ? s.error_input : null
              }`}
            />
          </td>
          <td>
            <input
              type='number'
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault()
                }
              }}
              defaultValue={che.final}
              {...register('chemistry.final')}
              className={`${
                errors?.chemistry?.final?.message ? s.error_input : null
              }`}
            />
          </td>
          <td>
            <input
              type='number'
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault()
                }
              }}

              value={avgChem}
              defaultValue={avgChem}
              {...register('chemistry.avg')}
              className={`${
                errors?.chemistry?.avg?.message ? s.error_input : null
              }`}
            />
          </td>
        </tr>
        <tr>
          <td>Ngữ văn</td>
          <td>
            <input
              type='number'
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault()
                }
              }}
              defaultValue={lit.oral_1}
              {...register('literature.oral_1')}
              className={`${
                errors?.literature?.oral_1?.message ? s.error_input : null
              }`}
            />
          </td>
          <td>
            <input
              type='number'
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault()
                }
              }}
              defaultValue={lit.oral_2}
              {...register('literature.oral_2')}
              className={`${
                errors?.literature?.oral_2?.message ? s.error_input : null
              }`}
            />
          </td>
          <td>
            <input
              type='number'
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault()
                }
              }}
              defaultValue={lit.test15m_1}
              {...register('literature.test15m_1')}
              className={`${
                errors?.literature?.test15m_1?.message ? s.error_input : null
              }`}
            />
          </td>
          <td>
            <input
              type='number'
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault()
                }
              }}
              defaultValue={lit.test15m_2}
              {...register('literature.test15m_2')}
              className={`${
                errors?.literature?.test15m_2?.message ? s.error_input : null
              }`}
            />
          </td>
          <td>
            <input
              type='number'
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault()
                }
              }}
              defaultValue={lit.test15m_3}
              {...register('literature.test15m_3')}
              className={`${
                errors?.literature?.test15m_3?.message ? s.error_input : null
              }`}
            />
          </td>
          <td>
            <input
              type='number'
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault()
                }
              }}
              defaultValue={lit.test45m_1}
              {...register('literature.test45m_1')}
              className={`${
                errors?.literature?.test45m_1?.message ? s.error_input : null
              }`}
            />
          </td>
          <td>
            <input
              type='number'
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault()
                }
              }}
              defaultValue={lit.test45m_2}
              {...register('literature.test45m_2')}
              className={`${
                errors?.literature?.test45m_2?.message ? s.error_input : null
              }`}
            />
          </td>
          <td>
            <input
              type='number'
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault()
                }
              }}
              defaultValue={lit.final}
              {...register('literature.final')}
              className={`${
                errors?.literature?.final?.message ? s.error_input : null
              }`}
            />
          </td>
          <td>
            <input
              type='number'
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault()
                }
              }}
              value={avgLit}
              defaultValue={avgLit}
              {...register('literature.avg')}
              className={`${
                errors?.literature?.avg?.message ? s.error_input : null
              }`}
            />
          </td>
        </tr>
        <tr>
          <td>Anh văn</td>
          <td>
            <input
              type='number'
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault()
                }
              }}
              defaultValue={eng.oral_1}
              {...register('english.oral_1')}
              className={`${
                errors?.english?.oral_1?.message ? s.error_input : null
              }`}
            />
          </td>
          <td>
            <input
              type='number'
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault()
                }
              }}
              defaultValue={eng.oral_2}
              {...register('english.oral_2')}
              className={`${
                errors?.english?.oral_2?.message ? s.error_input : null
              }`}
            />
          </td>
          <td>
            <input
              type='number'
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault()
                }
              }}
              defaultValue={eng.test15m_1}
              {...register('english.test15m_1')}
              className={`${
                errors?.english?.test15m_1?.message ? s.error_input : null
              }`}
            />
          </td>
          <td>
            <input
              type='number'
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault()
                }
              }}
              defaultValue={eng.test15m_2}
              {...register('english.test15m_2')}
              className={`${
                errors?.english?.test15m_2?.message ? s.error_input : null
              }`}
            />
          </td>
          <td>
            <input
              type='number'
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault()
                }
              }}
              defaultValue={eng.test15m_3}
              {...register('english.test15m_3')}
              className={`${
                errors?.english?.test15m_3?.message ? s.error_input : null
              }`}
            />
          </td>
          <td>
            <input
              type='number'
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault()
                }
              }}
              defaultValue={eng.test45m_1}
              {...register('english.test45m_1')}
              className={`${
                errors?.english?.test45m_1?.message ? s.error_input : null
              }`}
            />
          </td>
          <td>
            <input
              type='number'
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault()
                }
              }}
              defaultValue={eng.test45m_2}
              {...register('english.test45m_2')}
              className={`${
                errors?.english?.test45m_2?.message ? s.error_input : null
              }`}
            />
          </td>
          <td>
            <input
              type='number'
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault()
                }
              }}
              defaultValue={eng.final}
              {...register('english.final')}
              className={`${
                errors?.english?.final?.message ? s.error_input : null
              }`}
            />
          </td>
          <td>
            <input
              type='number'
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault()
                }
              }}

              value={avgEng}
              defaultValue={avgEng}
              {...register('english.avg')}
              className={`${
                errors?.english?.avg?.message ? s.error_input : null
              }`}
            />
          </td>
        </tr>
        <tr>
          <td>Sinh học</td>
          <td>
            <input
              type='number'
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault()
                }
              }}
              defaultValue={bio.oral_1}
              {...register('biology.oral_1')}
              className={`${
                errors?.biology?.oral_1?.message ? s.error_input : null
              }`}
            />
          </td>
          <td>
            <input
              type='number'
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault()
                }
              }}
              defaultValue={bio.oral_2}
              {...register('biology.oral_2')}
              className={`${
                errors?.biology?.oral_2?.message ? s.error_input : null
              }`}
            />
          </td>
          <td>
            <input
              type='number'
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault()
                }
              }}
              defaultValue={bio.test15m_1}
              {...register('biology.test15m_1')}
              className={`${
                errors?.biology?.test15m_1?.message ? s.error_input : null
              }`}
            />
          </td>
          <td>
            <input
              type='number'
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault()
                }
              }}
              defaultValue={bio.test15m_2}
              {...register('biology.test15m_2')}
              className={`${
                errors?.biology?.test15m_2?.message ? s.error_input : null
              }`}
            />
          </td>
          <td>
            <input
              type='number'
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault()
                }
              }}
              defaultValue={bio.test15m_3}
              {...register('biology.test15m_3')}
              className={`${
                errors?.biology?.test15m_3?.message ? s.error_input : null
              }`}
            />
          </td>
          <td>
            <input
              type='number'
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault()
                }
              }}
              defaultValue={bio.test45m_1}
              {...register('biology.test45m_1')}
              className={`${
                errors?.biology?.test45m_1?.message ? s.error_input : null
              }`}
            />
          </td>
          <td>
            <input
              type='number'
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault()
                }
              }}
              defaultValue={bio.test45m_2}
              {...register('biology.test45m_2')}
              className={`${
                errors?.biology?.test45m_2?.message ? s.error_input : null
              }`}
            />
          </td>
          <td>
            <input
              type='number'
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault()
                }
              }}
              defaultValue={bio.final}
              {...register('biology.final')}
              className={`${
                errors?.biology?.final?.message ? s.error_input : null
              }`}
            />
          </td>
          <td>
            <input
              type='number'
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault()
                }
              }}

              value={avgBio}
              defaultValue={avgBio}
              {...register('biology.avg')}
              className={`${
                errors?.biology?.avg?.message ? s.error_input : null
              }`}
            />
          </td>
        </tr>
        <tr>
          <td>GDCD</td>
          <td>
            <input
              type='number'
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault()
                }
              }}
              defaultValue={civ.oral_1}
              {...register('civic.oral_1')}
              className={`${
                errors?.civic?.oral_1?.message ? s.error_input : null
              }`}
            />
          </td>
          <td>
            <input
              type='number'
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault()
                }
              }}
              defaultValue={civ.oral_2}
              {...register('civic.oral_2')}
              className={`${
                errors?.civic?.oral_2?.message ? s.error_input : null
              }`}
            />
          </td>
          <td>
            <input
              type='number'
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault()
                }
              }}
              defaultValue={civ.test15m_1}
              {...register('civic.test15m_1')}
              className={`${
                errors?.civic?.test15m_1?.message ? s.error_input : null
              }`}
            />
          </td>
          <td>
            <input
              type='number'
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault()
                }
              }}
              defaultValue={civ.test15m_2}
              {...register('civic.test15m_2')}
              className={`${
                errors?.civic?.test15m_2?.message ? s.error_input : null
              }`}
            />
          </td>
          <td>
            <input
              type='number'
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault()
                }
              }}
              defaultValue={civ.test15m_3}
              {...register('civic.test15m_3')}
              className={`${
                errors?.civic?.test15m_3?.message ? s.error_input : null
              }`}
            />
          </td>
          <td>
            <input
              type='number'
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault()
                }
              }}
              defaultValue={civ.test45m_1}
              {...register('civic.test45m_1')}
              className={`${
                errors?.civic?.test45m_1?.message ? s.error_input : null
              }`}
            />
          </td>
          <td>
            <input
              type='number'
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault()
                }
              }}
              defaultValue={civ.test45m_2}
              {...register('civic.test45m_2')}
              className={`${
                errors?.civic?.test45m_2?.message ? s.error_input : null
              }`}
            />
          </td>
          <td>
            <input
              type='number'
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault()
                }
              }}
              defaultValue={civ.final}
              {...register('civic.final')}
              className={`${
                errors?.civic?.final?.message ? s.error_input : null
              }`}
            />
          </td>
          <td>
            <input
              type='number'
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault()
                }
              }}

              value={avgCiv}
              defaultValue={avgCiv}
              {...register('civic.avg')}
              className={`${
                errors?.civic?.avg?.message ? s.error_input : null
              }`}
            />
          </td>
        </tr>
        <tr>
          <td>Công nghệ</td>
          <td>
            <input
              type='number'
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault()
                }
              }}
              defaultValue={tec.oral_1}
              {...register('tech.oral_1')}
              className={`${
                errors?.tech?.oral_1?.message ? s.error_input : null
              }`}
            />
          </td>
          <td>
            <input
              type='number'
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault()
                }
              }}
              defaultValue={tec.oral_2}
              {...register('tech.oral_2')}
              className={`${
                errors?.tech?.oral_2?.message ? s.error_input : null
              }`}
            />
          </td>
          <td>
            <input
              type='number'
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault()
                }
              }}
              defaultValue={tec.test15m_1}
              {...register('tech.test15m_1')}
              className={`${
                errors?.tech?.test15m_1?.message ? s.error_input : null
              }`}
            />
          </td>
          <td>
            <input
              type='number'
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault()
                }
              }}
              defaultValue={tec.test15m_2}
              {...register('tech.test15m_2')}
              className={`${
                errors?.tech?.test15m_2?.message ? s.error_input : null
              }`}
            />
          </td>
          <td>
            <input
              type='number'
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault()
                }
              }}
              defaultValue={tec.test15m_3}
              {...register('tech.test15m_3')}
              className={`${
                errors?.tech?.test15m_3?.message ? s.error_input : null
              }`}
            />
          </td>
          <td>
            <input
              type='number'
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault()
                }
              }}
              defaultValue={tec.test45m_1}
              {...register('tech.test45m_1')}
              className={`${
                errors?.tech?.test45m_1?.message ? s.error_input : null
              }`}
            />
          </td>
          <td>
            <input
              type='number'
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault()
                }
              }}
              defaultValue={tec.test45m_2}
              {...register('tech.test45m_2')}
              className={`${
                errors?.tech?.test45m_2?.message ? s.error_input : null
              }`}
            />
          </td>
          <td>
            <input
              type='number'
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault()
                }
              }}
              defaultValue={tec.final}
              {...register('tech.final')}
              className={`${
                errors?.tech?.final?.message ? s.error_input : null
              }`}
            />
          </td>
          <td>
            <input
              type='number'
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault()
                }
              }}

              value={avgTech}
              defaultValue={avgTech}
              {...register('tech.avg')}
              className={`${
                errors?.tech?.avg?.message ? s.error_input : null
              }`}
            />
          </td>
        </tr>
        <tr>
          <td>Địa lý</td>
          <td>
            <input
              type='number'
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault()
                }
              }}
              defaultValue={geo.oral_1}
              {...register('geography.oral_1')}
              className={`${
                errors?.geography?.oral_1?.message ? s.error_input : null
              }`}
            />
          </td>
          <td>
            <input
              type='number'
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault()
                }
              }}
              defaultValue={geo.oral_2}
              {...register('geography.oral_2')}
              className={`${
                errors?.geography?.oral_2?.message ? s.error_input : null
              }`}
            />
          </td>
          <td>
            <input
              type='number'
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault()
                }
              }}
              defaultValue={geo.test15m_1}
              {...register('geography.test15m_1')}
              className={`${
                errors?.geography?.test15m_1?.message ? s.error_input : null
              }`}
            />
          </td>
          <td>
            <input
              type='number'
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault()
                }
              }}
              defaultValue={geo.test15m_2}
              {...register('geography.test15m_2')}
              className={`${
                errors?.geography?.test15m_2?.message ? s.error_input : null
              }`}
            />
          </td>
          <td>
            <input
              type='number'
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault()
                }
              }}
              defaultValue={geo.test15m_3}
              {...register('geography.test15m_3')}
              className={`${
                errors?.geography?.test15m_3?.message ? s.error_input : null
              }`}
            />
          </td>
          <td>
            <input
              type='number'
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault()
                }
              }}
              defaultValue={geo.test45m_1}
              {...register('geography.test45m_1')}
              className={`${
                errors?.geography?.test45m_1?.message ? s.error_input : null
              }`}
            />
          </td>
          <td>
            <input
              type='number'
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault()
                }
              }}
              defaultValue={geo.test45m_2}
              {...register('geography.test45m_2')}
              className={`${
                errors?.geography?.test45m_2?.message ? s.error_input : null
              }`}
            />
          </td>
          <td>
            <input
              type='number'
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault()
                }
              }}
              defaultValue={geo.final}
              {...register('geography.final')}
              className={`${
                errors?.geography?.final?.message ? s.error_input : null
              }`}
            />
          </td>
          <td>
            <input
              type='number'
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault()
                }
              }}

              value={avgGeo}
              defaultValue={avgGeo}
              {...register('geography.avg')}
              className={`${
                errors?.geography?.avg?.message ? s.error_input : null
              }`}
            />
          </td>
        </tr>
        <tr>
          <td>Lịch sử</td>
          <td>
            <input
              type='number'
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault()
                }
              }}
              defaultValue={his.oral_1}
              {...register('history.oral_1')}
              className={`${
                errors?.history?.oral_1?.message ? s.error_input : null
              }`}
            />
          </td>
          <td>
            <input
              type='number'
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault()
                }
              }}
              defaultValue={his.oral_2}
              {...register('history.oral_2')}
              className={`${
                errors?.history?.oral_2?.message ? s.error_input : null
              }`}
            />
          </td>
          <td>
            <input
              type='number'
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault()
                }
              }}
              defaultValue={his.test15m_1}
              {...register('history.test15m_1')}
              className={`${
                errors?.history?.test15m_1?.message ? s.error_input : null
              }`}
            />
          </td>
          <td>
            <input
              type='number'
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault()
                }
              }}
              defaultValue={his.test15m_2}
              {...register('history.test15m_2')}
              className={`${
                errors?.history?.test15m_2?.message ? s.error_input : null
              }`}
            />
          </td>
          <td>
            <input
              type='number'
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault()
                }
              }}
              defaultValue={his.test15m_3}
              {...register('history.test15m_3')}
              className={`${
                errors?.history?.test15m_3?.message ? s.error_input : null
              }`}
            />
          </td>
          <td>
            <input
              type='number'
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault()
                }
              }}
              defaultValue={his.test45m_1}
              {...register('history.test45m_1')}
              className={`${
                errors?.history?.test45m_1?.message ? s.error_input : null
              }`}
            />
          </td>
          <td>
            <input
              type='number'
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault()
                }
              }}
              defaultValue={his.test45m_2}
              {...register('history.test45m_2')}
              className={`${
                errors?.history?.test45m_2?.message ? s.error_input : null
              }`}
            />
          </td>
          <td>
            <input
              type='number'
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault()
                }
              }}
              defaultValue={his.final}
              {...register('history.final')}
              className={`${
                errors?.history?.final?.message ? s.error_input : null
              }`}
            />
          </td>
          <td>
            <input
              type='number'
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault()
                }
              }}

              value={avgHis}
              defaultValue={avgHis}
              {...register('history.avg')}
              className={`${
                errors?.history?.avg?.message ? s.error_input : null
              }`}
            />
          </td>
        </tr>
        <tr>
          <td>Tin học</td>
          <td>
            <input
              type='number'
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault()
                }
              }}
              defaultValue={itt.oral_1}
              {...register('it.oral_1')}
              className={`${
                errors?.it?.oral_1?.message ? s.error_input : null
              }`}
            />
          </td>
          <td>
            <input
              type='number'
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault()
                }
              }}
              defaultValue={itt.oral_2}
              {...register('it.oral_2')}
              className={`${
                errors?.it?.oral_2?.message ? s.error_input : null
              }`}
            />
          </td>
          <td>
            <input
              type='number'
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault()
                }
              }}
              defaultValue={itt.test15m_1}
              {...register('it.test15m_1')}
              className={`${
                errors?.it?.test15m_1?.message ? s.error_input : null
              }`}
            />
          </td>
          <td>
            <input
              type='number'
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault()
                }
              }}
              defaultValue={itt.test15m_2}
              {...register('it.test15m_2')}
              className={`${
                errors?.it?.test15m_2?.message ? s.error_input : null
              }`}
            />
          </td>
          <td>
            <input
              type='number'
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault()
                }
              }}
              defaultValue={itt.test15m_3}
              {...register('it.test15m_3')}
              className={`${
                errors?.it?.test15m_3?.message ? s.error_input : null
              }`}
            />
          </td>
          <td>
            <input
              type='number'
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault()
                }
              }}
              defaultValue={itt.test45m_1}
              {...register('it.test45m_1')}
              className={`${
                errors?.it?.test45m_1?.message ? s.error_input : null
              }`}
            />
          </td>
          <td>
            <input
              type='number'
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault()
                }
              }}
              defaultValue={itt.test45m_2}
              {...register('it.test45m_2')}
              className={`${
                errors?.it?.test45m_2?.message ? s.error_input : null
              }`}
            />
          </td>
          <td>
            <input
              type='number'
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault()
                }
              }}
              defaultValue={itt.final}
              {...register('it.final')}
              className={`${
                errors?.it?.final?.message ? s.error_input : null
              }`}
            />
          </td>
          <td>
            <input
              type='number'
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault()
                }
              }}

              value={avgItt}
              defaultValue={avgItt}
              {...register('it.avg')}
              className={`${errors?.it?.avg?.message ? s.error_input : null}`}
            />
          </td>
        </tr>
        <tr>
          <td>Quốc phòng</td>
          <td>
            <input
              type='number'
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault()
                }
              }}
              defaultValue={dunn.oral_1}
              {...register('dnu.oral_1')}
              className={`${
                errors?.dnu?.oral_1?.message ? s.error_input : null
              }`}
            />
          </td>
          <td>
            <input
              type='number'
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault()
                }
              }}
              defaultValue={dunn.oral_2}
              {...register('dnu.oral_2')}
              className={`${
                errors?.dnu?.oral_2?.message ? s.error_input : null
              }`}
            />
          </td>
          <td>
            <input
              type='number'
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault()
                }
              }}
              defaultValue={dunn.test15m_1}
              {...register('dnu.test15m_1')}
              className={`${
                errors?.dnu?.test15m_1?.message ? s.error_input : null
              }`}
            />
          </td>
          <td>
            <input
              type='number'
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault()
                }
              }}
              defaultValue={dunn.test15m_2}
              {...register('dnu.test15m_2')}
              className={`${
                errors?.dnu?.test15m_2?.message ? s.error_input : null
              }`}
            />
          </td>
          <td>
            <input
              type='number'
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault()
                }
              }}
              defaultValue={dunn.test15m_3}
              {...register('dnu.test15m_3')}
              className={`${
                errors?.dnu?.test15m_3?.message ? s.error_input : null
              }`}
            />
          </td>
          <td>
            <input
              type='number'
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault()
                }
              }}
              defaultValue={dunn.test45m_1}
              {...register('dnu.test45m_1')}
              className={`${
                errors?.dnu?.test45m_1?.message ? s.error_input : null
              }`}
            />
          </td>
          <td>
            <input
              type='number'
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault()
                }
              }}
              defaultValue={dunn.test45m_2}
              {...register('dnu.test45m_2')}
              className={`${
                errors?.dnu?.test45m_2?.message ? s.error_input : null
              }`}
            />
          </td>
          <td>
            <input
              type='number'
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault()
                }
              }}
              defaultValue={dunn.final}
              {...register('dnu.final')}
              className={`${
                errors?.dnu?.final?.message ? s.error_input : null
              }`}
            />
          </td>
          <td>
            <input
              type='number'
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault()
                }
              }}
              value={avgDnu}
              defaultValue={avgDnu}
              {...register('dnu.avg')}
              className={`${
                errors?.dnu?.avg?.message ? s.error_input : null
              }`}
            />
          </td>
        </tr>
        </tbody>
      </Table>
      <div className={s.buttonArea}>
        <Link to='/'>
          <Button variant='secondary'>Quay lại</Button>
        </Link>
        <Button type='submit'>Lưu điểm</Button>
      </div>
    </form>
  )
}

UpdateScore.prototype = {
  updateScore: PropTypes.func
}

export default connect(null, { updateScore })(UpdateScore)
