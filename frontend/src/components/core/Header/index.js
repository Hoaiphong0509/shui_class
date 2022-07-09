import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import s from './styles.module.scss'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logout } from 'services/redux/actions/user'
import { useHistory } from 'react-router-dom'

const Header = ({ logout }) => {
  const history = useHistory()

  const handleLogout =  () => {
    history.replace('/login')
    logout()
  }

  return (
    <div className={s.root}>
      <p>SHUI CLASS</p>
      <DropdownButton
        className={s.menu}
        variant="primary"
        title="Menu"
        id="input-group-dropdown-2"
        align="end"
      >
        <Dropdown.Item href="#">Danh sách lớp</Dropdown.Item>
        <Dropdown.Item href="#">Thông tin tài khoản</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item as="button" onClick={handleLogout}>
          Đăng xuất
        </Dropdown.Item>
      </DropdownButton>
    </div>
  )
}

Header.prototype = {
  logout: PropTypes.func
}

export default connect(null, { logout })(Header)
