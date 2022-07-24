import LoaderComponent from 'components/core/LoaderComponent'
import HomeTeacherComponent from 'components/Teacher/HomeTeacherComponent'
import AdminDashboard from 'pages/Admin/AdminDashboard'
import Classnews from 'pages/Classnews'
import Parentnews from 'pages/Parentnews'
import StaffHome from 'pages/Student/StaffHome'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { getCurrentProfile } from 'services/redux/actions/profile'
import { normalizeRole } from 'utils/AppUltils'

const Home = ({
  user: { user, loading: ldu },
  profile: { myprofile, loading: ldp },
  getCurrentProfile
}) => {
  useEffect(() => {
    getCurrentProfile()
  }, [getCurrentProfile])
  console.log('myprofile', myprofile)
  const renderHome = () => {
    switch (normalizeRole(user)) {
      case 'admin':
        return <AdminDashboard />
      case 'student':
        if (myprofile?.staffClass.some((s) => +s.staffCode === 0))
          return <Classnews />
        else return <StaffHome />
      case 'teacher':
        return <HomeTeacherComponent />
      case 'parent':
        return <Parentnews />
      default:
        break
    }
  }

  return ldu || ldp || user === null || myprofile === null ? (
    <LoaderComponent />
  ) : (
    renderHome()
  )
}

Home.prototype = {
  user: PropTypes.object.isRequired,
  profile: PropTypes.object,
  getCurrentProfile: PropTypes.func
}

const mapStateToProps = (state) => ({
  user: state.user,
  profile: state.profile
})

export default connect(mapStateToProps, { getCurrentProfile })(Home)
