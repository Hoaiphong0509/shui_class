import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import s from './styles.module.scss'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logout } from 'services/redux/actions/user'
import { useHistory } from 'react-router-dom'
import { getCurrentProfile } from 'services/redux/actions/profile'
import { useEffect } from 'react'

const Header = ({ profile: { profile }, getCurrentProfile, logout }) => {
  const history = useHistory()

  useEffect(() => {
    getCurrentProfile()
  }, [getCurrentProfile])

  const handleLogout = () => {
    history.replace('/login')
    logout()
  }

  return (
    <div className={s.root}>
      <p>SHUI CLASS</p>
      <div className={s.in4}>
        <img
          src={
            profile?.avatar.length > 0
              ? profile?.avatar
              : '/assets/img/avatar.png'
          }
          alt="Avatar"
        />
        <DropdownButton
          className={s.menu}
          variant="primary"
          title={profile?.fullName ? profile?.fullName : 'Menu'}
          id="input-group-dropdown-2"
          align="end"
        >
          <Dropdown.Item
            as="button"
            onClick={() => history.push('/my_profile')}
          >
            Thông tin tài khoản
          </Dropdown.Item>
          <Dropdown.Item
            as="button"
            onClick={() => history.push('/update_profile')}
          >
            Cập nhật tài khoản
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item as="button" onClick={handleLogout}>
            Đăng xuất
          </Dropdown.Item>
        </DropdownButton>
      </div>
    </div>
  )
}

Header.prototype = {
  profile: PropTypes.object,
  getCurrentProfile: PropTypes.func,
  logout: PropTypes.func
}

const mapStateToProps = (state) => ({
  profile: state.profile
})

export default connect(mapStateToProps, { logout, getCurrentProfile })(Header)
