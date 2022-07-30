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
import { useLocation } from 'react-router-dom'

const Header = ({
  user: { user },
  profile: { myprofile },
  getCurrentProfile,
  logout
}) => {
  const history = useHistory()
  const location = useLocation()
  useEffect(() => {
    getCurrentProfile()
  }, [getCurrentProfile])

  const handleLogout = () => {
    history.replace('/login')
    logout()
  }
  const adminLink = (
    <>
      <Link
        to="/admin/users"
        className={`${location.pathname.includes('users') ? s.active : null}`}
      >
        <p>Danh sách Users</p>
      </Link>
      <Link
        to="/admin/teachers"
        className={`${
          location.pathname.includes('teachers') ? s.active : null
        }`}
      >
        <p>Danh sách giáo viên</p>
      </Link>
      <Link
        to="/admin/parents"
        className={`${location.pathname.includes('parents') ? s.active : null}`}
      >
        <p>Danh sách phụ huynh</p>
      </Link>
      <Link
        to="/admin/classrooms"
        className={`${
          location.pathname.includes('classrooms') ? s.active : null
        }`}
      >
        <p>Danh sách lớp</p>
      </Link>
      <Link
        to="/admin/staffs"
        className={`${location.pathname.includes('staffs') ? s.active : null}`}
      >
        <p>Chức vụ lớp</p>
      </Link>
    </>
  )

  const teacherLink = (
    <>
      <Link
        to="/classnews"
        className={`${
          location.pathname.includes('classnews') ? s.active : null
        }`}
      >
        <p> Bản tin lớp học</p>
      </Link>
      <Link
        to="/parentnews"
        className={`${
          location.pathname.includes('parentnews') ? s.active : null
        }`}
      >
        <p> Bản tin phụ huynh</p>
      </Link>
      <Link
        to="/parents"
        className={`${location.pathname.includes('parents') ? s.active : null}`}
      >
        <p>Danh sách phụ huynh</p>
      </Link>
    </>
  )

  const studentLink = (
    <>
      <Link
        to="/classnews"
        className={`${
          location.pathname.includes('classnews') ? s.active : null
        }`}
      >
        <p> Bản tin lớp học</p>
      </Link>
    </>
  )

  const parentLink = (
    <>
      <Link
        to="/parentnews"
        className={`${
          location.pathname.includes('parentnews') ? s.active : null
        }`}
      >
        <p> Bản tin phụ huynh</p>
      </Link>
    </>
  )

  const linkAuth = () => {
    if (user?.roles.includes(ROLES.ADMIN)) return adminLink
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
          title={myprofile?.fullName ? myprofile?.fullName : 'Menu'}
          // id="input-group-dropdown-2"
          align="end"
        >
          <Dropdown.Item
            as="button"
            className={s.btnItem}
            onClick={() => history.push('/my_profile')}
          >
            Thông tin tài khoản
          </Dropdown.Item>
          <Dropdown.Item
            as="button"
            className={s.btnItem}
            onClick={() => history.push('/update_profile')}
          >
            Cập nhật tài khoản
          </Dropdown.Item>
          {!user?.roles.includes(ROLES.TEACHER) &&
          !user?.roles.includes(ROLES.ADMIN) ? (
            <>
              <Dropdown.Item
                as="button"
                className={s.btnItem}
                onClick={() => history.push('/notifies')}
              >
                Thông báo
              </Dropdown.Item>
            </>
          ) : null}
          {user?.roles.includes(ROLES.PARENT) ? (
            <>
              <Dropdown.Item
                as="button"
                className={s.btnItem}
                onClick={() => history.push('/children')}
              >
                Danh sách học sinh
              </Dropdown.Item>
            </>
          ) : null}
          {user?.roles.includes(ROLES.TEACHER) ? (
            <>
              <Dropdown.Item
                as="button"
                className={s.btnItem}
                onClick={() => history.push('/add_classnews')}
              >
                Thêm bản tin học sinh
              </Dropdown.Item>
              <Dropdown.Item
                as="button"
                className={s.btnItem}
                onClick={() => history.push('/add_parentnews')}
              >
                Thêm bản tin phụ huynh
              </Dropdown.Item>
            </>
          ) : null}
          {user?.roles.includes(ROLES.STUDENT) ? (
            <>
              <Dropdown.Divider />
              <Dropdown.Item
                as="button"
                className={s.btnItem}
                onClick={() =>
                  history.push(`/sheet_score_1/${user._id.toString()}`)
                }
              >
                Bảng điểm HKI
              </Dropdown.Item>
              <Dropdown.Item
                as="button"
                className={s.btnItem}
                onClick={() =>
                  history.push(`/sheet_score_2/${user._id.toString()}`)
                }
              >
                Bảng điểm HKII
              </Dropdown.Item>
              <Dropdown.Item
                as="button"
                className={s.btnItem}
                onClick={() =>
                  history.push(`/sheet_all/${user._id.toString()}`)
                }
              >
                Học tập cả năm
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item
                as="button"
                className={s.btnItem}
                onClick={() =>
                  history.push(`/competition_all/${user._id.toString()}`)
                }
              >
                Thi đua
              </Dropdown.Item>
            </>
          ) : null}
          <Dropdown.Divider />
          <Dropdown.Item
            as="button"
            className={s.btnItem}
            onClick={handleLogout}
          >
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

export default connect(mapStateToProps, {
  logout,
  getCurrentProfile
})(Header)
