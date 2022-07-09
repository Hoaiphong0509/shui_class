import LoaderComponent from 'components/core/LoaderComponent'
import HomeStudentComponent from 'components/Student/HomeStudentComponent'
import HomeTeacherComponent from 'components/Teacher/HomeTeacherComponent'
import { ROLES } from 'constants/AppConstants'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const Home = ({ user: { user, loading } }) => {
  return loading || user === null ? (
    <LoaderComponent />
  ) : user.roles.includes(ROLES.TEACHER) ? (
    <HomeTeacherComponent />
  ) : (
    <HomeStudentComponent />
  )
}

Home.prototype = {
  user: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  user: state.user
})

export default connect(mapStateToProps)(Home)
