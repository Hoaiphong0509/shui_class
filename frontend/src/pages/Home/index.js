import LoaderComponent from 'components/core/LoaderComponent'
import HomeStudentComponent from 'components/Student/HomeStudentComponent'
import HomeTeacherComponent from 'components/Teacher/HomeTeacherComponent'
import { ROLES } from 'constants/AppConstants'
import Classnews from 'pages/Classnews'
import Parentnews from 'pages/Parentnews'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { normalizeRole } from 'utils/AppUltils'

const Home = ({ user: { user, loading } }) => {
  const renderHome = () => {
    switch (normalizeRole(user)) {
      case 'admin':
        break
      case 'student':
        return <Classnews />
      case 'teacher':
        return <HomeTeacherComponent />
      case 'parent':
        return <Parentnews />
      default:
        break
    }
  }

  return loading || user === null ? <LoaderComponent /> : renderHome()
}

Home.prototype = {
  user: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  user: state.user
})

export default connect(mapStateToProps)(Home)
