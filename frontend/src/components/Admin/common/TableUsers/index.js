import { ROLES } from 'constants/AppConstants'
import moment from 'moment'
import React from 'react'
import { Badge, Table } from 'react-bootstrap'
import s from './styles.module.scss'

const TableUsers = ({ userData }) => {
  const badgeBg = (role) => {
    switch (role) {
      case ROLES.ADMIN:
        return 'primary'
      case ROLES.TEACHER:
        return 'info'
      case ROLES.STUDENT:
        return 'success'
      case ROLES.PARENT:
        return 'warning'
      default:
        break
    }
  }

  return (
    <Table responsive hover className={s.root}>
      <thead>
        <tr>
          <th>STT</th>
          <th>Họ tên</th>
          <th>Username</th>
          <th>Ngày sinh</th>
          <th>Quyền</th>
        </tr>
      </thead>
      <tbody>
        {userData.map((us, idx) => (
          <tr key={idx + 1}>
            <td>{idx + 1}</td>
            <td>
              <img
                src={
                  us._doc.avatar.length > 0
                    ? us._doc.avatar
                    : '/assets/img/avatar.png'
                }
                alt="avatar"
              />
              {us._doc.fullName}
            </td>
            <td>{us.username}</td>
            <td>{moment(us._doc.birthday).format('DD-MM-YYYY')}</td>
            <td>
              <Badge bg={badgeBg(us.roles[0])}>{us.roles[0]}</Badge>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export default TableUsers
