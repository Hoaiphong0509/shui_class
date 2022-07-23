import React, { useEffect, useState } from 'react'
import TableUsers from '../common/TableUsers'
import s from './styles.module.scss'

const UsersList = ({ users }) => {
  const [keyword, setKeyword] = useState('')
  const [userData, setUserData] = useState(users)

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
  return (
    <div className={s.root}>
      <div className={s.searchInput}>
        <input
          name="keyword"
          placeholder="Tìm kiếm user"
          value={keyword}
          onChange={handleSearch}
        />
      </div>
      <div>{userData && <TableUsers userData={userData} />}</div>
    </div>
  )
}

export default UsersList
