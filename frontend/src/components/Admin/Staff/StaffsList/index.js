import { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import ModalAddStaff from '../ModalAddStaff'
import TableStaff from '../TableStaff'
import s from './styles.module.scss'

const StaffsList = ({ staffs }) => {
  const [keyword, setKeyword] = useState('')
  const [show, setShow] = useState(false)
  const [staffData, setStaffData] = useState(staffs)
  useEffect(() => {
    setStaffData(staffs)
  }, [staffs])

  const handleSearch = (e) => {
    const value = e.target.value
    if (!value || value.length === 0) setStaffData(staffs)
    setKeyword(value)
    const temp = staffs.filter(
      (c) => c.staffDisplay.includes(value) || c.staffCode === +value
    )
    setStaffData(temp)
  }
  return (
    <div className={s.root}>
      <div className={s.searchInput}>
        <input
          name="keyword"
          placeholder="Tìm chức vụ ban cán sự"
          value={keyword}
          onChange={handleSearch}
        />
      </div>
      <div className={s.btn}>
        <Button onClick={() => setShow(!show)}>Thêm chức vụ ban cán sự</Button>
      </div>
      <div className={s.table}>
        {staffData && <TableStaff staffData={staffData} />}
      </div>
      <ModalAddStaff show={show} setShow={setShow} />
    </div>
  )
}

export default StaffsList
