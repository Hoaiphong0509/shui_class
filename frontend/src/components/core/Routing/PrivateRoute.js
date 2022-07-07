import BlankLayout from 'layout/BlankLayout'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect, Route as DefaultRoute } from 'react-router-dom'

const PrivateRoute = ({
  component: Component,
  layout: Layout = BlankLayout,
  user: { isAuthenticated },
  ...rest
}) => (
  <DefaultRoute
    {...rest}
    render={(props) =>
      isAuthenticated ? (
        <Layout>
          <Component {...props} />
        </Layout>
      ) : (
        <Redirect to='/login' />
      )
    }
  />
)

PrivateRoute.propTypes = {
  user: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  user: state.user,
})

export default connect(mapStateToProps)(PrivateRoute)
