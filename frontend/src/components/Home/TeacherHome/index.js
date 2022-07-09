import { Button } from 'react-bootstrap'
import React from 'react'
import s from './styles.module.scss'
import TableStudent from './TableStudent'

const TeacherHome = () => {
  return (
    <div className={s.root}>
      <div className={s.container}>
        <h1 className={s.title}>Lớp 9A2</h1>
        <div className={s.buttonArea}>
          <Button variant="info">Thêm mới</Button>
          <Button variant="secondary">Thùng rác</Button>
        </div>
        <div className={s.table}>
          <TableStudent />
        </div>
      </div>
    </div>
  )
}

export default TeacherHome
