import { ROLES } from 'constants/AppConstants'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import TableUsers from '../common/TableUsers'
import ModalAddAdmin from './ModalAddAdmin'
import s from './styles.module.scss'

const UsersList = ({ users, allusers, me }) => {
  const [keyword, setKeyword] = useState('')
  const [userData, setUserData] = useState(users)
  const [show, setShow] = useState(false)

  useEffect(() => {
    setUserData(users)
  }, [users])

  const handleSearch = (e) => {
    const value = e.target.value
    if (!value || value.length === 0) setUserData(users)
    setKeyword(value)
    const temp = users.filter(
      (us) => us.username.includes(value) || us._doc.fullName.includes(value)
    )
    setUserData(temp)
  }

  let duplicates = []
  let unique = []
  for (let s of users) {
    if (allusers.some((c) => c._id === s._id)) {
      duplicates.push(s)
    } else {
      unique.push(s)
    }
  }
  for (let c of allusers) {
    if (!duplicates.some((dup) => dup._id === c._id)) {
      unique.push(c)
    }
  }

  const adminAvaible = allusers.filter((u) => u.roles.includes(ROLES.GUEST))

  return (
    <div className={s.root}>
      <div className={s.searchInput}>
        <input
          name="keyword"
          placeholder="Tìm kiếm admin"
          value={keyword}
          onChange={handleSearch}
        />
      </div>
      <div className={s.addTeacher}>
        <Button onClick={() => setShow(!show)}>Thêm admin</Button>
      </div>
      <div>{userData && <TableUsers userData={userData} />}</div>
      {adminAvaible && (
        <ModalAddAdmin
          show={show}
          setShow={setShow}
          adminAvaible={adminAvaible}
          me={me}
        />
      )}
    </div>
  )
}

export default UsersList
