import PropTypes from 'prop-types'
import { Button, Table } from 'react-bootstrap'
import s from './styles.module.scss'

import { connect } from 'react-redux'
import { deleteStaff } from 'services/redux/actions/admin'
import moment from 'moment'
import { useState } from 'react'
import Swal from 'sweetalert2'
import ModalEditStaff from '../ModalEditStaff'

const TableStaff = ({ staffData, deleteStaff }) => {
  const [staffTemp, setStaffTemp] = useState()
  const [show, setShow] = useState(false)

  const handleEdit = (staff) => {
    Swal.fire({
      title: 'Xác nhận',
      text: `Các học sinh được lưu chức vụ ${staff.staffDisplay} từ trước sẽ không cập nhật sự thay đổi này. Sự chỉnh sửa này chỉ ảnh hướng đến các học sinh trong tương lai!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e63c49',
      cancelButtonColor: '#ccc',
      confirmButtonText: 'Tiếp tục chỉnh sửa',
      cancelButtonText: 'Huỷ'
    }).then(async (result) => {
      if (result.isConfirmed) {
        setShow(!show)
        setStaffTemp(staff)
      } else setStaffTemp(null)
    })
  }

  const handleDelete = (staff) => {
    Swal.fire({
      title: 'Xác nhận',
      text: `Các học sinh được lưu chức vụ ${staff.staffDisplay} từ trước sẽ không cập nhật sự thay đổi này. Sự xoá này chỉ ảnh hướng đến các học sinh trong tương lai!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e63c49',
      cancelButtonColor: '#ccc',
      confirmButtonText: 'Tiếp tục xoá',
      cancelButtonText: 'Huỷ'
    }).then(async (result) => {
      if (result.isConfirmed) {
        deleteStaff(staff._id)
      }
    })
  }
  return (
    <>
      <Table responsive hover className={s.root}>
        <thead>
          <tr>
            <th>STT</th>
            <th>Mã ban các sự</th>
            <th>Tên ban các sự</th>
            <th>Ngày tạo</th>
            <th>#</th>
          </tr>
        </thead>
        <tbody>
          {staffData &&
            staffData.map((staff, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{staff.staffCode}</td>
                <td>{staff.staffDisplay}</td>
                <td>{moment(staff.date).format('DD-MM-YYYY')}</td>
                <td>
                  <Button className={s.btnInfo} onClick={() => handleEdit(staff)}>
                    Sửa
                  </Button>
                  <Button
                    className={s.btnDanger}
                    onClick={() => handleDelete(staff)}
                  >
                    Xoá
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      {staffTemp && (
        <ModalEditStaff show={show} setShow={setShow} staff={staffTemp} />
      )}
    </>
  )
}

TableStaff.prototype = {
  deleteStaff: PropTypes.func
}

export default connect(null, {
  deleteStaff
})(TableStaff)
