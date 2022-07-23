import { ROLES } from 'constants/AppConstants'
import React from 'react'
import s from './styles.module.scss'
import CardItem from './CardItem'

const Dashboard = ({ users, classrooms, classnewss, parentnewss }) => {
  const teachers = users.filter((u) => u.roles.includes(ROLES.TEACHER))
  return (
    <div className={s.root}>
      <div>
        <CardItem title="Người dùng" num={users.length} icon="user" bgColor='#ff99c8' />
      </div>
      <div>
        <CardItem title="Giáo viên" num={teachers.length} icon="teacher" bgColor='#fcf6bd'/>
      </div>
      <div>
        <CardItem title="Lớp" num={classrooms.length} icon="class" bgColor='#d0f4de' />
      </div>
      <div>
        <CardItem
          title="Bản tin"
          num={classnewss.length + parentnewss.length}
          icon="news"
          bgColor='#a9def9'
        />
      </div>
    </div>
  )
}

export default Dashboard
