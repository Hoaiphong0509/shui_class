import LoaderComponent from 'components/core/LoaderComponent'
import StudentHome from 'components/Home/StudentHome'
import TeacherHome from 'components/Home/TeacherHome'
import { ROLES } from 'constants/AppConstants'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const Home = ({ user: { user, loading } }) => {
  return loading || user === null ? (
    <LoaderComponent />
  ) : user.roles.includes(ROLES.TEACHER) ? (
    <TeacherHome />
  ) : (
    <StudentHome />
  )
}

Home.prototype = {
  user: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  user: state.user
})

export default connect(mapStateToProps)(Home)
