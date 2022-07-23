import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import ModalAddClassroom from '../ModalAddClassroom'
import TableClassroom from '../TableClassroom'
import s from './styles.module.scss'

const ClassromsList = ({ classrooms, teachers, allusers, me }) => {
  const [keyword, setKeyword] = useState('')
  const [show, setShow] = useState(false)
  const [classroomData, setClassroomData] = useState(classrooms)
  useEffect(() => {
    setClassroomData(classrooms)
  }, [classrooms])

  const handleSearch = (e) => {
    const value = e.target.value
    if (!value || value.length === 0) setClassroomData(classrooms)
    setKeyword(value)
    const temp = classrooms.filter((c) => c.name.includes(value))
    setClassroomData(temp)
  }
  return (
    <div className={s.root}>
      <div className={s.searchInput}>
        <input
          name="keyword"
          placeholder="Tìm kiếm lớp học"
          value={keyword}
          onChange={handleSearch}
        />
      </div>
      <div className={s.btn}>
        <Button onClick={() => setShow(!show)}>Thêm lớp</Button>
      </div>
      <div className={s.table}>
        {classroomData && (
          <TableClassroom
            classrooms={classroomData}
            teachers={teachers}
            allusers={allusers}
            me={me}
          />
        )}
      </div>
      <ModalAddClassroom show={show} setShow={setShow} />
    </div>
  )
}

export default ClassromsList
