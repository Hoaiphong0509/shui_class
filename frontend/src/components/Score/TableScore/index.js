import React from 'react'
import { Table } from 'react-bootstrap'
import s from './styles.module.scss'

const TableScore = ({ score }) => {
  const {
    math,
    physics,
    chemistry,
    literature,
    english,
    biology,
    civic,
    tech,
    geography,
    history,
    it,
    dnu
  } = score

  return (
    <Table bordered responsive hover className={s.root}>
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
          <td>{math.name}</td>
          <td>{math.oral_1}</td>
          <td>{math.oral_2}</td>
          <td>{math.test15m_1}</td>
          <td>{math.test15m_2}</td>
          <td>{math.test15m_3}</td>
          <td>{math.test45m_1}</td>
          <td>{math.test45m_2}</td>
          <td>{math.final}</td>
          <td>{math.avg}</td>
        </tr>
        <tr>
          <td>{physics.name}</td>
          <td>{physics.oral_1}</td>
          <td>{physics.oral_2}</td>
          <td>{physics.test15m_1}</td>
          <td>{physics.test15m_2}</td>
          <td>{physics.test15m_3}</td>
          <td>{physics.test45m_1}</td>
          <td>{physics.test45m_2}</td>
          <td>{physics.final}</td>
          <td>{physics.avg}</td>
        </tr>
        <tr>
          <td>{chemistry.name}</td>
          <td>{chemistry.oral_1}</td>
          <td>{chemistry.oral_2}</td>
          <td>{chemistry.test15m_1}</td>
          <td>{chemistry.test15m_2}</td>
          <td>{chemistry.test15m_3}</td>
          <td>{chemistry.test45m_1}</td>
          <td>{chemistry.test45m_2}</td>
          <td>{chemistry.final}</td>
          <td>{chemistry.avg}</td>
        </tr>
        <tr>
          <td>{literature.name}</td>
          <td>{literature.oral_1}</td>
          <td>{literature.oral_2}</td>
          <td>{literature.test15m_1}</td>
          <td>{literature.test15m_2}</td>
          <td>{literature.test15m_3}</td>
          <td>{literature.test45m_1}</td>
          <td>{literature.test45m_2}</td>
          <td>{literature.final}</td>
          <td>{literature.avg}</td>
        </tr>
        <tr>
          <td>{english.name}</td>
          <td>{english.oral_1}</td>
          <td>{english.oral_2}</td>
          <td>{english.test15m_1}</td>
          <td>{english.test15m_2}</td>
          <td>{english.test15m_3}</td>
          <td>{english.test45m_1}</td>
          <td>{english.test45m_2}</td>
          <td>{english.final}</td>
          <td>{english.avg}</td>
        </tr>
        <tr>
          <td>{biology.name}</td>
          <td>{biology.oral_1}</td>
          <td>{biology.oral_2}</td>
          <td>{biology.test15m_1}</td>
          <td>{biology.test15m_2}</td>
          <td>{biology.test15m_3}</td>
          <td>{biology.test45m_1}</td>
          <td>{biology.test45m_2}</td>
          <td>{biology.final}</td>
          <td>{biology.avg}</td>
        </tr>
        <tr>
          <td>{civic.name}</td>
          <td>{civic.oral_1}</td>
          <td>{civic.oral_2}</td>
          <td>{civic.test15m_1}</td>
          <td>{civic.test15m_2}</td>
          <td>{civic.test15m_3}</td>
          <td>{civic.test45m_1}</td>
          <td>{civic.test45m_2}</td>
          <td>{civic.final}</td>
          <td>{civic.avg}</td>
        </tr>
        <tr>
          <td>{tech.name}</td>
          <td>{tech.oral_1}</td>
          <td>{tech.oral_2}</td>
          <td>{tech.test15m_1}</td>
          <td>{tech.test15m_2}</td>
          <td>{tech.test15m_3}</td>
          <td>{tech.test45m_1}</td>
          <td>{tech.test45m_2}</td>
          <td>{tech.final}</td>
          <td>{tech.avg}</td>
        </tr>
        <tr>
          <td>{geography.name}</td>
          <td>{geography.oral_1}</td>
          <td>{geography.oral_2}</td>
          <td>{geography.test15m_1}</td>
          <td>{geography.test15m_2}</td>
          <td>{geography.test15m_3}</td>
          <td>{geography.test45m_1}</td>
          <td>{geography.test45m_2}</td>
          <td>{geography.final}</td>
          <td>{geography.avg}</td>
        </tr>
        <tr>
          <td>{history.name}</td>
          <td>{history.oral_1}</td>
          <td>{history.oral_2}</td>
          <td>{history.test15m_1}</td>
          <td>{history.test15m_2}</td>
          <td>{history.test15m_3}</td>
          <td>{history.test45m_1}</td>
          <td>{history.test45m_2}</td>
          <td>{history.final}</td>
          <td>{history.avg}</td>
        </tr>
        <tr>
          <td>{it.name}</td>
          <td>{it.oral_1}</td>
          <td>{it.oral_2}</td>
          <td>{it.test15m_1}</td>
          <td>{it.test15m_2}</td>
          <td>{it.test15m_3}</td>
          <td>{it.test45m_1}</td>
          <td>{it.test45m_2}</td>
          <td>{it.final}</td>
          <td>{it.avg}</td>
        </tr>
        <tr>
          <td>{dnu.name}</td>
          <td>{dnu.oral_1}</td>
          <td>{dnu.oral_2}</td>
          <td>{dnu.test15m_1}</td>
          <td>{dnu.test15m_2}</td>
          <td>{dnu.test15m_3}</td>
          <td>{dnu.test45m_1}</td>
          <td>{dnu.test45m_2}</td>
          <td>{dnu.final}</td>
          <td>{dnu.avg}</td>
        </tr>
      </tbody>
    </Table>
  )
}

export default TableScore
