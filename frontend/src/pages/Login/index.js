import LoginForm from 'components/Auth/LoginForm'
import MenuLogin from 'components/Auth/MenuLogin'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'

const Login = ({ user: { isAuthenticated } }) => {
  const history = useHistory()
  const [loginAs, setLoginAs] = useState()

  if (isAuthenticated) history.replace('/')

  const handlelLoginAs = (role) => {
    setLoginAs(role)
  }
  const goBack = () => {
    setLoginAs(null)
  }

  return loginAs ? (
    <LoginForm loginAs={loginAs} goBack={goBack} />
  ) : (
    <MenuLogin handlelLoginAs={handlelLoginAs} />
  )
}

Login.prototype = {
  user: PropTypes.object
}

const mapStateToProps = (state) => ({
  user: state.user
})

export default connect(mapStateToProps, null)(Login)
