import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import s from './styles.module.scss'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logout } from 'services/redux/actions/user'
import { Link, useHistory } from 'react-router-dom'
import { getCurrentProfile } from 'services/redux/actions/profile'
import { useEffect } from 'react'
import { ROLES } from 'constants/AppConstants'

const Header = ({
  user: { user },
  profile: { myprofile },
  getCurrentProfile,
  logout
}) => {
  const history = useHistory()

  useEffect(() => {
    getCurrentProfile()
  }, [getCurrentProfile])

  const handleLogout = () => {
    history.replace('/login')
    logout()
  }

  const teacherLink = (
    <>
      <Link to="/classnews">
        <p> Bản tin lớp học</p>
      </Link>
      <Link to="/classnews">
        <p> Bản tin phụ huynh</p>
      </Link>
    </>
  )

  const studentLink = (
    <>
      <Link to="/classnews">
        <p> Bản tin lớp học</p>
      </Link>
    </>
  )

  const parentLink = (
    <>
      <Link to="/classnews">
        <p> Bản tin phụ huynh</p>
      </Link>
    </>
  )

  const linkAuth = () => {
    if (user?.roles.includes(ROLES.TEACHER)) return teacherLink
    if (user?.roles.includes(ROLES.STUDENT)) return studentLink
    if (user?.roles.includes(ROLES.PARENT)) return parentLink
  }

  return (
    <div className={s.root}>
      <div className={s.title}>
        <Link to="/">
          <h4>SHUI CLASS</h4>
        </Link>
        {linkAuth()}
      </div>
      <div className={s.in4}>
        <img
          src={
            myprofile?.avatar.length > 0
              ? myprofile?.avatar
              : '/assets/img/avatar.png'
          }
          alt="Avatar"
        />
        <DropdownButton
          className={s.menu}
          variant="primary"
          title={myprofile?.fullName ? myprofile?.fullName : 'Menu'}
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
  user: PropTypes.object,
  getCurrentProfile: PropTypes.func,
  logout: PropTypes.func
}

const mapStateToProps = (state) => ({
  profile: state.profile,
  user: state.user
})

export default connect(mapStateToProps, { logout, getCurrentProfile })(Header)
