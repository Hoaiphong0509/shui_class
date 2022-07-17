import React from 'react'
import { Button, Table } from 'react-bootstrap'
import s from './styles.module.scss'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { Link } from 'react-router-dom'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addScore } from 'services/redux/actions/score'
import { useHistory } from 'react-router-dom'
import {
  calcAvgPoint,
  CalcTotalPoint,
  classificationPointFunc
} from 'utils/AppUltils'

const AddScore = ({
  hk,
  studentName,
  studentUsername,
  idStudent,
  addScore
}) => {
  const history = useHistory()
  const regexScore = /^[+-]?\d+(\.\d+)?$/

  const schema = yup
    .object({
      math: yup.object().shape({
        oral_1: yup.string().matches(regexScore, 'Điểm không hợp lệ'),
        oral_2: yup.string().matches(regexScore, 'Điểm không hợp lệ'),
        test15m_1: yup.string().matches(regexScore, 'Điểm không hợp lệ'),
        test15m_2: yup.string().matches(regexScore, 'Điểm không hợp lệ'),
        test15m_3: yup.string().matches(regexScore, 'Điểm không hợp lệ'),
        test45m_1: yup.string().matches(regexScore, 'Điểm không hợp lệ'),
        test45m_2: yup.string().matches(regexScore, 'Điểm không hợp lệ'),
        final: yup.string().matches(regexScore, 'Điểm không hợp lệ'),
        avg: yup.string().matches(regexScore, 'Điểm không hợp lệ')
      }),
      physics: yup.object().shape({
        oral_1: yup.string().matches(regexScore, 'Điểm không hợp lệ'),
        oral_2: yup.string().matches(regexScore, 'Điểm không hợp lệ'),
        test15m_1: yup.string().matches(regexScore, 'Điểm không hợp lệ'),
        test15m_2: yup.string().matches(regexScore, 'Điểm không hợp lệ'),
        test15m_3: yup.string().matches(regexScore, 'Điểm không hợp lệ'),
        test45m_1: yup.string().matches(regexScore, 'Điểm không hợp lệ'),
        test45m_2: yup.string().matches(regexScore, 'Điểm không hợp lệ'),
        final: yup.string().matches(regexScore, 'Điểm không hợp lệ'),
        avg: yup.string().matches(regexScore, 'Điểm không hợp lệ')
      }),
      chemistry: yup.object().shape({
        oral_1: yup.string().matches(regexScore, 'Điểm không hợp lệ'),
        oral_2: yup.string().matches(regexScore, 'Điểm không hợp lệ'),
        test15m_1: yup.string().matches(regexScore, 'Điểm không hợp lệ'),
        test15m_2: yup.string().matches(regexScore, 'Điểm không hợp lệ'),
        test15m_3: yup.string().matches(regexScore, 'Điểm không hợp lệ'),
        test45m_1: yup.string().matches(regexScore, 'Điểm không hợp lệ'),
        test45m_2: yup.string().matches(regexScore, 'Điểm không hợp lệ'),
        final: yup.string().matches(regexScore, 'Điểm không hợp lệ'),
        avg: yup.string().matches(regexScore, 'Điểm không hợp lệ')
      }),
      literature: yup.object().shape({
        oral_1: yup.string().matches(regexScore, 'Điểm không hợp lệ'),
        oral_2: yup.string().matches(regexScore, 'Điểm không hợp lệ'),
        test15m_1: yup.string().matches(regexScore, 'Điểm không hợp lệ'),
        test15m_2: yup.string().matches(regexScore, 'Điểm không hợp lệ'),
        test15m_3: yup.string().matches(regexScore, 'Điểm không hợp lệ'),
        test45m_1: yup.string().matches(regexScore, 'Điểm không hợp lệ'),
        test45m_2: yup.string().matches(regexScore, 'Điểm không hợp lệ'),
        final: yup.string().matches(regexScore, 'Điểm không hợp lệ'),
        avg: yup.string().matches(regexScore, 'Điểm không hợp lệ')
      }),
      english: yup.object().shape({
        oral_1: yup.string().matches(regexScore, 'Điểm không hợp lệ'),
        oral_2: yup.string().matches(regexScore, 'Điểm không hợp lệ'),
        test15m_1: yup.string().matches(regexScore, 'Điểm không hợp lệ'),
        test15m_2: yup.string().matches(regexScore, 'Điểm không hợp lệ'),
        test15m_3: yup.string().matches(regexScore, 'Điểm không hợp lệ'),
        test45m_1: yup.string().matches(regexScore, 'Điểm không hợp lệ'),
        test45m_2: yup.string().matches(regexScore, 'Điểm không hợp lệ'),
        final: yup.string().matches(regexScore, 'Điểm không hợp lệ'),
        avg: yup.string().matches(regexScore, 'Điểm không hợp lệ')
      }),
      biology: yup.object().shape({
        oral_1: yup.string().matches(regexScore, 'Điểm không hợp lệ'),
        oral_2: yup.string().matches(regexScore, 'Điểm không hợp lệ'),
        test15m_1: yup.string().matches(regexScore, 'Điểm không hợp lệ'),
        test15m_2: yup.string().matches(regexScore, 'Điểm không hợp lệ'),
        test15m_3: yup.string().matches(regexScore, 'Điểm không hợp lệ'),
        test45m_1: yup.string().matches(regexScore, 'Điểm không hợp lệ'),
        test45m_2: yup.string().matches(regexScore, 'Điểm không hợp lệ'),
        final: yup.string().matches(regexScore, 'Điểm không hợp lệ'),
        avg: yup.string().matches(regexScore, 'Điểm không hợp lệ')
      }),
      civic: yup.object().shape({
        oral_1: yup.string().matches(regexScore, 'Điểm không hợp lệ'),
        oral_2: yup.string().matches(regexScore, 'Điểm không hợp lệ'),
        test15m_1: yup.string().matches(regexScore, 'Điểm không hợp lệ'),
        test15m_2: yup.string().matches(regexScore, 'Điểm không hợp lệ'),
        test15m_3: yup.string().matches(regexScore, 'Điểm không hợp lệ'),
        test45m_1: yup.string().matches(regexScore, 'Điểm không hợp lệ'),
        test45m_2: yup.string().matches(regexScore, 'Điểm không hợp lệ'),
        final: yup.string().matches(regexScore, 'Điểm không hợp lệ'),
        avg: yup.string().matches(regexScore, 'Điểm không hợp lệ')
      }),
      tech: yup.object().shape({
        oral_1: yup.string().matches(regexScore, 'Điểm không hợp lệ'),
        oral_2: yup.string().matches(regexScore, 'Điểm không hợp lệ'),
        test15m_1: yup.string().matches(regexScore, 'Điểm không hợp lệ'),
        test15m_2: yup.string().matches(regexScore, 'Điểm không hợp lệ'),
        test15m_3: yup.string().matches(regexScore, 'Điểm không hợp lệ'),
        test45m_1: yup.string().matches(regexScore, 'Điểm không hợp lệ'),
        test45m_2: yup.string().matches(regexScore, 'Điểm không hợp lệ'),
        final: yup.string().matches(regexScore, 'Điểm không hợp lệ'),
        avg: yup.string().matches(regexScore, 'Điểm không hợp lệ')
      }),
      geography: yup.object().shape({
        oral_1: yup.string().matches(regexScore, 'Điểm không hợp lệ'),
        oral_2: yup.string().matches(regexScore, 'Điểm không hợp lệ'),
        test15m_1: yup.string().matches(regexScore, 'Điểm không hợp lệ'),
        test15m_2: yup.string().matches(regexScore, 'Điểm không hợp lệ'),
        test15m_3: yup.string().matches(regexScore, 'Điểm không hợp lệ'),
        test45m_1: yup.string().matches(regexScore, 'Điểm không hợp lệ'),
        test45m_2: yup.string().matches(regexScore, 'Điểm không hợp lệ'),
        final: yup.string().matches(regexScore, 'Điểm không hợp lệ'),
        avg: yup.string().matches(regexScore, 'Điểm không hợp lệ')
      }),
      history: yup.object().shape({
        oral_1: yup.string().matches(regexScore, 'Điểm không hợp lệ'),
        oral_2: yup.string().matches(regexScore, 'Điểm không hợp lệ'),
        test15m_1: yup.string().matches(regexScore, 'Điểm không hợp lệ'),
        test15m_2: yup.string().matches(regexScore, 'Điểm không hợp lệ'),
        test15m_3: yup.string().matches(regexScore, 'Điểm không hợp lệ'),
        test45m_1: yup.string().matches(regexScore, 'Điểm không hợp lệ'),
        test45m_2: yup.string().matches(regexScore, 'Điểm không hợp lệ'),
        final: yup.string().matches(regexScore, 'Điểm không hợp lệ'),
        avg: yup.string().matches(regexScore, 'Điểm không hợp lệ')
      }),
      it: yup.object().shape({
        oral_1: yup.string().matches(regexScore, 'Điểm không hợp lệ'),
        oral_2: yup.string().matches(regexScore, 'Điểm không hợp lệ'),
        test15m_1: yup.string().matches(regexScore, 'Điểm không hợp lệ'),
        test15m_2: yup.string().matches(regexScore, 'Điểm không hợp lệ'),
        test15m_3: yup.string().matches(regexScore, 'Điểm không hợp lệ'),
        test45m_1: yup.string().matches(regexScore, 'Điểm không hợp lệ'),
        test45m_2: yup.string().matches(regexScore, 'Điểm không hợp lệ'),
        final: yup.string().matches(regexScore, 'Điểm không hợp lệ'),
        avg: yup.string().matches(regexScore, 'Điểm không hợp lệ')
      }),
      dnu: yup.object().shape({
        oral_1: yup.string().matches(regexScore, 'Điểm không hợp lệ'),
        oral_2: yup.string().matches(regexScore, 'Điểm không hợp lệ'),
        test15m_1: yup.string().matches(regexScore, 'Điểm không hợp lệ'),
        test15m_2: yup.string().matches(regexScore, 'Điểm không hợp lệ'),
        test15m_3: yup.string().matches(regexScore, 'Điểm không hợp lệ'),
        test45m_1: yup.string().matches(regexScore, 'Điểm không hợp lệ'),
        test45m_2: yup.string().matches(regexScore, 'Điểm không hợp lệ'),
        final: yup.string().matches(regexScore, 'Điểm không hợp lệ'),
        avg: yup.string().matches(regexScore, 'Điểm không hợp lệ')
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
    const payload = {
      classification: classificationPointFunc(+totalPoint),
      avgAll: +totalPoint,
      hk,
      studentName,
      studentUsername,
      ...data
    }
    addScore(idStudent, payload)
    history.push('/')
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
            <th colSpan="2">Điểm miệng</th>
            <th colSpan="3">Điểm 15 phút</th>
            <th colSpan="2">Điểm 1 tiết</th>
            <th>Điểm thi</th>
            <th>Điểm trung bình</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Toán</td>
            <td>
              <input
                type="text"
                defaultValue="0"
                {...register('math.oral_1')}
                className={`${
                  errors?.math?.oral_1?.message ? s.error_input : null
                }`}
              />
            </td>
            <td>
              <input
                type="text"
                defaultValue="0"
                {...register('math.oral_2')}
                className={`${
                  errors?.math?.oral_2?.message ? s.error_input : null
                }`}
              />
            </td>
            <td>
              <input
                type="text"
                defaultValue="0"
                {...register('math.test15m_1')}
                className={`${
                  errors?.math?.test15m_1?.message ? s.error_input : null
                }`}
              />
            </td>
            <td>
              <input
                type="text"
                defaultValue="0"
                {...register('math.test15m_2')}
                className={`${
                  errors?.math?.test15m_2?.message ? s.error_input : null
                }`}
              />
            </td>
            <td>
              <input
                type="text"
                defaultValue="0"
                {...register('math.test15m_3')}
                className={`${
                  errors?.math?.test15m_3?.message ? s.error_input : null
                }`}
              />
            </td>
            <td>
              <input
                type="text"
                defaultValue="0"
                {...register('math.test45m_1')}
                className={`${
                  errors?.math?.test45m_1?.message ? s.error_input : null
                }`}
              />
            </td>
            <td>
              <input
                type="text"
                defaultValue="0"
                {...register('math.test45m_2')}
                className={`${
                  errors?.math?.test45m_2?.message ? s.error_input : null
                }`}
              />
            </td>
            <td>
              <input
                type="text"
                defaultValue="0"
                {...register('math.final')}
                className={`${
                  errors?.math?.final?.message ? s.error_input : null
                }`}
              />
            </td>
            <td>
              <input
                type="text"
                disabled
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
                type="text"
                defaultValue="0"
                {...register('physics.oral_1')}
                className={`${
                  errors?.physics?.oral_1?.message ? s.error_input : null
                }`}
              />
            </td>
            <td>
              <input
                type="text"
                defaultValue="0"
                {...register('physics.oral_2')}
                className={`${
                  errors?.physics?.oral_2?.message ? s.error_input : null
                }`}
              />
            </td>
            <td>
              <input
                type="text"
                defaultValue="0"
                {...register('physics.test15m_1')}
                className={`${
                  errors?.physics?.test15m_1?.message ? s.error_input : null
                }`}
              />
            </td>
            <td>
              <input
                type="text"
                defaultValue="0"
                {...register('physics.test15m_2')}
                className={`${
                  errors?.physics?.test15m_2?.message ? s.error_input : null
                }`}
              />
            </td>
            <td>
              <input
                type="text"
                defaultValue="0"
                {...register('physics.test15m_3')}
                className={`${
                  errors?.physics?.test15m_3?.message ? s.error_input : null
                }`}
              />
            </td>
            <td>
              <input
                type="text"
                defaultValue="0"
                {...register('physics.test45m_1')}
                className={`${
                  errors?.physics?.test45m_1?.message ? s.error_input : null
                }`}
              />
            </td>
            <td>
              <input
                type="text"
                defaultValue="0"
                {...register('physics.test45m_2')}
                className={`${
                  errors?.physics?.test45m_2?.message ? s.error_input : null
                }`}
              />
            </td>
            <td>
              <input
                type="text"
                defaultValue="0"
                {...register('physics.final')}
                className={`${
                  errors?.physics?.final?.message ? s.error_input : null
                }`}
              />
            </td>
            <td>
              <input
                type="text"
                disabled
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
                type="text"
                defaultValue="0"
                {...register('chemistry.oral_1')}
                className={`${
                  errors?.chemistry?.oral_1?.message ? s.error_input : null
                }`}
              />
            </td>
            <td>
              <input
                type="text"
                defaultValue="0"
                {...register('chemistry.oral_2')}
                className={`${
                  errors?.chemistry?.oral_2?.message ? s.error_input : null
                }`}
              />
            </td>
            <td>
              <input
                type="text"
                defaultValue="0"
                {...register('chemistry.test15m_1')}
                className={`${
                  errors?.chemistry?.test15m_1?.message ? s.error_input : null
                }`}
              />
            </td>
            <td>
              <input
                type="text"
                defaultValue="0"
                {...register('chemistry.test15m_2')}
                className={`${
                  errors?.chemistry?.test15m_2?.message ? s.error_input : null
                }`}
              />
            </td>
            <td>
              <input
                type="text"
                defaultValue="0"
                {...register('chemistry.test15m_3')}
                className={`${
                  errors?.chemistry?.test15m_3?.message ? s.error_input : null
                }`}
              />
            </td>
            <td>
              <input
                type="text"
                defaultValue="0"
                {...register('chemistry.test45m_1')}
                className={`${
                  errors?.chemistry?.test45m_1?.message ? s.error_input : null
                }`}
              />
            </td>
            <td>
              <input
                type="text"
                defaultValue="0"
                {...register('chemistry.test45m_2')}
                className={`${
                  errors?.chemistry?.test45m_2?.message ? s.error_input : null
                }`}
              />
            </td>
            <td>
              <input
                type="text"
                defaultValue="0"
                {...register('chemistry.final')}
                className={`${
                  errors?.chemistry?.final?.message ? s.error_input : null
                }`}
              />
            </td>
            <td>
              <input
                type="text"
                disabled
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
                type="text"
                defaultValue="0"
                {...register('literature.oral_1')}
                className={`${
                  errors?.literature?.oral_1?.message ? s.error_input : null
                }`}
              />
            </td>
            <td>
              <input
                type="text"
                defaultValue="0"
                {...register('literature.oral_2')}
                className={`${
                  errors?.literature?.oral_2?.message ? s.error_input : null
                }`}
              />
            </td>
            <td>
              <input
                type="text"
                defaultValue="0"
                {...register('literature.test15m_1')}
                className={`${
                  errors?.literature?.test15m_1?.message ? s.error_input : null
                }`}
              />
            </td>
            <td>
              <input
                type="text"
                defaultValue="0"
                {...register('literature.test15m_2')}
                className={`${
                  errors?.literature?.test15m_2?.message ? s.error_input : null
                }`}
              />
            </td>
            <td>
              <input
                type="text"
                defaultValue="0"
                {...register('literature.test15m_3')}
                className={`${
                  errors?.literature?.test15m_3?.message ? s.error_input : null
                }`}
              />
            </td>
            <td>
              <input
                type="text"
                defaultValue="0"
                {...register('literature.test45m_1')}
                className={`${
                  errors?.literature?.test45m_1?.message ? s.error_input : null
                }`}
              />
            </td>
            <td>
              <input
                type="text"
                defaultValue="0"
                {...register('literature.test45m_2')}
                className={`${
                  errors?.literature?.test45m_2?.message ? s.error_input : null
                }`}
              />
            </td>
            <td>
              <input
                type="text"
                defaultValue="0"
                {...register('literature.final')}
                className={`${
                  errors?.literature?.final?.message ? s.error_input : null
                }`}
              />
            </td>
            <td>
              <input
                type="text"
                disabled
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
                type="text"
                defaultValue="0"
                {...register('english.oral_1')}
                className={`${
                  errors?.english?.oral_1?.message ? s.error_input : null
                }`}
              />
            </td>
            <td>
              <input
                type="text"
                defaultValue="0"
                {...register('english.oral_2')}
                className={`${
                  errors?.english?.oral_2?.message ? s.error_input : null
                }`}
              />
            </td>
            <td>
              <input
                type="text"
                defaultValue="0"
                {...register('english.test15m_1')}
                className={`${
                  errors?.english?.test15m_1?.message ? s.error_input : null
                }`}
              />
            </td>
            <td>
              <input
                type="text"
                defaultValue="0"
                {...register('english.test15m_2')}
                className={`${
                  errors?.english?.test15m_2?.message ? s.error_input : null
                }`}
              />
            </td>
            <td>
              <input
                type="text"
                defaultValue="0"
                {...register('english.test15m_3')}
                className={`${
                  errors?.english?.test15m_3?.message ? s.error_input : null
                }`}
              />
            </td>
            <td>
              <input
                type="text"
                defaultValue="0"
                {...register('english.test45m_1')}
                className={`${
                  errors?.english?.test45m_1?.message ? s.error_input : null
                }`}
              />
            </td>
            <td>
              <input
                type="text"
                defaultValue="0"
                {...register('english.test45m_2')}
                className={`${
                  errors?.english?.test45m_2?.message ? s.error_input : null
                }`}
              />
            </td>
            <td>
              <input
                type="text"
                defaultValue="0"
                {...register('english.final')}
                className={`${
                  errors?.english?.final?.message ? s.error_input : null
                }`}
              />
            </td>
            <td>
              <input
                type="text"
                disabled
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
                type="text"
                defaultValue="0"
                {...register('biology.oral_1')}
                className={`${
                  errors?.biology?.oral_1?.message ? s.error_input : null
                }`}
              />
            </td>
            <td>
              <input
                type="text"
                defaultValue="0"
                {...register('biology.oral_2')}
                className={`${
                  errors?.biology?.oral_2?.message ? s.error_input : null
                }`}
              />
            </td>
            <td>
              <input
                type="text"
                defaultValue="0"
                {...register('biology.test15m_1')}
                className={`${
                  errors?.biology?.test15m_1?.message ? s.error_input : null
                }`}
              />
            </td>
            <td>
              <input
                type="text"
                defaultValue="0"
                {...register('biology.test15m_2')}
                className={`${
                  errors?.biology?.test15m_2?.message ? s.error_input : null
                }`}
              />
            </td>
            <td>
              <input
                type="text"
                defaultValue="0"
                {...register('biology.test15m_3')}
                className={`${
                  errors?.biology?.test15m_3?.message ? s.error_input : null
                }`}
              />
            </td>
            <td>
              <input
                type="text"
                defaultValue="0"
                {...register('biology.test45m_1')}
                className={`${
                  errors?.biology?.test45m_1?.message ? s.error_input : null
                }`}
              />
            </td>
            <td>
              <input
                type="text"
                defaultValue="0"
                {...register('biology.test45m_2')}
                className={`${
                  errors?.biology?.test45m_2?.message ? s.error_input : null
                }`}
              />
            </td>
            <td>
              <input
                type="text"
                defaultValue="0"
                {...register('biology.final')}
                className={`${
                  errors?.biology?.final?.message ? s.error_input : null
                }`}
              />
            </td>
            <td>
              <input
                type="text"
                disabled
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
                type="text"
                defaultValue="0"
                {...register('civic.oral_1')}
                className={`${
                  errors?.civic?.oral_1?.message ? s.error_input : null
                }`}
              />
            </td>
            <td>
              <input
                type="text"
                defaultValue="0"
                {...register('civic.oral_2')}
                className={`${
                  errors?.civic?.oral_2?.message ? s.error_input : null
                }`}
              />
            </td>
            <td>
              <input
                type="text"
                defaultValue="0"
                {...register('civic.test15m_1')}
                className={`${
                  errors?.civic?.test15m_1?.message ? s.error_input : null
                }`}
              />
            </td>
            <td>
              <input
                type="text"
                defaultValue="0"
                {...register('civic.test15m_2')}
                className={`${
                  errors?.civic?.test15m_2?.message ? s.error_input : null
                }`}
              />
            </td>
            <td>
              <input
                type="text"
                defaultValue="0"
                {...register('civic.test15m_3')}
                className={`${
                  errors?.civic?.test15m_3?.message ? s.error_input : null
                }`}
              />
            </td>
            <td>
              <input
                type="text"
                defaultValue="0"
                {...register('civic.test45m_1')}
                className={`${
                  errors?.civic?.test45m_1?.message ? s.error_input : null
                }`}
              />
            </td>
            <td>
              <input
                type="text"
                defaultValue="0"
                {...register('civic.test45m_2')}
                className={`${
                  errors?.civic?.test45m_2?.message ? s.error_input : null
                }`}
              />
            </td>
            <td>
              <input
                type="text"
                defaultValue="0"
                {...register('civic.final')}
                className={`${
                  errors?.civic?.final?.message ? s.error_input : null
                }`}
              />
            </td>
            <td>
              <input
                type="text"
                disabled
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
                type="text"
                defaultValue="0"
                {...register('tech.oral_1')}
                className={`${
                  errors?.tech?.oral_1?.message ? s.error_input : null
                }`}
              />
            </td>
            <td>
              <input
                type="text"
                defaultValue="0"
                {...register('tech.oral_2')}
                className={`${
                  errors?.tech?.oral_2?.message ? s.error_input : null
                }`}
              />
            </td>
            <td>
              <input
                type="text"
                defaultValue="0"
                {...register('tech.test15m_1')}
                className={`${
                  errors?.tech?.test15m_1?.message ? s.error_input : null
                }`}
              />
            </td>
            <td>
              <input
                type="text"
                defaultValue="0"
                {...register('tech.test15m_2')}
                className={`${
                  errors?.tech?.test15m_2?.message ? s.error_input : null
                }`}
              />
            </td>
            <td>
              <input
                type="text"
                defaultValue="0"
                {...register('tech.test15m_3')}
                className={`${
                  errors?.tech?.test15m_3?.message ? s.error_input : null
                }`}
              />
            </td>
            <td>
              <input
                type="text"
                defaultValue="0"
                {...register('tech.test45m_1')}
                className={`${
                  errors?.tech?.test45m_1?.message ? s.error_input : null
                }`}
              />
            </td>
            <td>
              <input
                type="text"
                defaultValue="0"
                {...register('tech.test45m_2')}
                className={`${
                  errors?.tech?.test45m_2?.message ? s.error_input : null
                }`}
              />
            </td>
            <td>
              <input
                type="text"
                defaultValue="0"
                {...register('tech.final')}
                className={`${
                  errors?.tech?.final?.message ? s.error_input : null
                }`}
              />
            </td>
            <td>
              <input
                type="text"
                disabled
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
                type="text"
                defaultValue="0"
                {...register('geography.oral_1')}
                className={`${
                  errors?.geography?.oral_1?.message ? s.error_input : null
                }`}
              />
            </td>
            <td>
              <input
                type="text"
                defaultValue="0"
                {...register('geography.oral_2')}
                className={`${
                  errors?.geography?.oral_2?.message ? s.error_input : null
                }`}
              />
            </td>
            <td>
              <input
                type="text"
                defaultValue="0"
                {...register('geography.test15m_1')}
                className={`${
                  errors?.geography?.test15m_1?.message ? s.error_input : null
                }`}
              />
            </td>
            <td>
              <input
                type="text"
                defaultValue="0"
                {...register('geography.test15m_2')}
                className={`${
                  errors?.geography?.test15m_2?.message ? s.error_input : null
                }`}
              />
            </td>
            <td>
              <input
                type="text"
                defaultValue="0"
                {...register('geography.test15m_3')}
                className={`${
                  errors?.geography?.test15m_3?.message ? s.error_input : null
                }`}
              />
            </td>
            <td>
              <input
                type="text"
                defaultValue="0"
                {...register('geography.test45m_1')}
                className={`${
                  errors?.geography?.test45m_1?.message ? s.error_input : null
                }`}
              />
            </td>
            <td>
              <input
                type="text"
                defaultValue="0"
                {...register('geography.test45m_2')}
                className={`${
                  errors?.geography?.test45m_2?.message ? s.error_input : null
                }`}
              />
            </td>
            <td>
              <input
                type="text"
                defaultValue="0"
                {...register('geography.final')}
                className={`${
                  errors?.geography?.final?.message ? s.error_input : null
                }`}
              />
            </td>
            <td>
              <input
                type="text"
                disabled
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
                type="text"
                defaultValue="0"
                {...register('history.oral_1')}
                className={`${
                  errors?.history?.oral_1?.message ? s.error_input : null
                }`}
              />
            </td>
            <td>
              <input
                type="text"
                defaultValue="0"
                {...register('history.oral_2')}
                className={`${
                  errors?.history?.oral_2?.message ? s.error_input : null
                }`}
              />
            </td>
            <td>
              <input
                type="text"
                defaultValue="0"
                {...register('history.test15m_1')}
                className={`${
                  errors?.history?.test15m_1?.message ? s.error_input : null
                }`}
              />
            </td>
            <td>
              <input
                type="text"
                defaultValue="0"
                {...register('history.test15m_2')}
                className={`${
                  errors?.history?.test15m_2?.message ? s.error_input : null
                }`}
              />
            </td>
            <td>
              <input
                type="text"
                defaultValue="0"
                {...register('history.test15m_3')}
                className={`${
                  errors?.history?.test15m_3?.message ? s.error_input : null
                }`}
              />
            </td>
            <td>
              <input
                type="text"
                defaultValue="0"
                {...register('history.test45m_1')}
                className={`${
                  errors?.history?.test45m_1?.message ? s.error_input : null
                }`}
              />
            </td>
            <td>
              <input
                type="text"
                defaultValue="0"
                {...register('history.test45m_2')}
                className={`${
                  errors?.history?.test45m_2?.message ? s.error_input : null
                }`}
              />
            </td>
            <td>
              <input
                type="text"
                defaultValue="0"
                {...register('history.final')}
                className={`${
                  errors?.history?.final?.message ? s.error_input : null
                }`}
              />
            </td>
            <td>
              <input
                type="text"
                disabled
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
                type="text"
                defaultValue="0"
                {...register('it.oral_1')}
                className={`${
                  errors?.it?.oral_1?.message ? s.error_input : null
                }`}
              />
            </td>
            <td>
              <input
                type="text"
                defaultValue="0"
                {...register('it.oral_2')}
                className={`${
                  errors?.it?.oral_2?.message ? s.error_input : null
                }`}
              />
            </td>
            <td>
              <input
                type="text"
                defaultValue="0"
                {...register('it.test15m_1')}
                className={`${
                  errors?.it?.test15m_1?.message ? s.error_input : null
                }`}
              />
            </td>
            <td>
              <input
                type="text"
                defaultValue="0"
                {...register('it.test15m_2')}
                className={`${
                  errors?.it?.test15m_2?.message ? s.error_input : null
                }`}
              />
            </td>
            <td>
              <input
                type="text"
                defaultValue="0"
                {...register('it.test15m_3')}
                className={`${
                  errors?.it?.test15m_3?.message ? s.error_input : null
                }`}
              />
            </td>
            <td>
              <input
                type="text"
                defaultValue="0"
                {...register('it.test45m_1')}
                className={`${
                  errors?.it?.test45m_1?.message ? s.error_input : null
                }`}
              />
            </td>
            <td>
              <input
                type="text"
                defaultValue="0"
                {...register('it.test45m_2')}
                className={`${
                  errors?.it?.test45m_2?.message ? s.error_input : null
                }`}
              />
            </td>
            <td>
              <input
                type="text"
                defaultValue="0"
                {...register('it.final')}
                className={`${
                  errors?.it?.final?.message ? s.error_input : null
                }`}
              />
            </td>
            <td>
              <input
                type="text"
                disabled
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
                type="text"
                defaultValue="0"
                {...register('dnu.oral_1')}
                className={`${
                  errors?.dnu?.oral_1?.message ? s.error_input : null
                }`}
              />
            </td>
            <td>
              <input
                type="text"
                defaultValue="0"
                {...register('dnu.oral_2')}
                className={`${
                  errors?.dnu?.oral_2?.message ? s.error_input : null
                }`}
              />
            </td>
            <td>
              <input
                type="text"
                defaultValue="0"
                {...register('dnu.test15m_1')}
                className={`${
                  errors?.dnu?.test15m_1?.message ? s.error_input : null
                }`}
              />
            </td>
            <td>
              <input
                type="text"
                defaultValue="0"
                {...register('dnu.test15m_2')}
                className={`${
                  errors?.dnu?.test15m_2?.message ? s.error_input : null
                }`}
              />
            </td>
            <td>
              <input
                type="text"
                defaultValue="0"
                {...register('dnu.test15m_3')}
                className={`${
                  errors?.dnu?.test15m_3?.message ? s.error_input : null
                }`}
              />
            </td>
            <td>
              <input
                type="text"
                defaultValue="0"
                {...register('dnu.test45m_1')}
                className={`${
                  errors?.dnu?.test45m_1?.message ? s.error_input : null
                }`}
              />
            </td>
            <td>
              <input
                type="text"
                defaultValue="0"
                {...register('dnu.test45m_2')}
                className={`${
                  errors?.dnu?.test45m_2?.message ? s.error_input : null
                }`}
              />
            </td>
            <td>
              <input
                type="text"
                defaultValue="0"
                {...register('dnu.final')}
                className={`${
                  errors?.dnu?.final?.message ? s.error_input : null
                }`}
              />
            </td>
            <td>
              <input
                type="text"
                disabled
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
        <Link to="/">
          <Button variant="secondary">Quay lại</Button>
        </Link>
        <Button type="submit">Lưu điểm</Button>
      </div>
    </form>
  )
}

AddScore.prototype = {
  addScore: PropTypes.func
}

export default connect(null, { addScore })(AddScore)
