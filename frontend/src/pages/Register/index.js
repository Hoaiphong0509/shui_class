import RegisterForm from 'components/Auth/RegisterForm'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'

const Register = ({ user: { isAuthenticated } }) => {
  const history = useHistory()

  if (isAuthenticated) history.replace('/')
  
  return <RegisterForm />
}

Register.prototype = {
  user: PropTypes.object
}

const mapStateToProps = (state) => ({
  user: state.user
})

export default connect(mapStateToProps, null)(Register)
