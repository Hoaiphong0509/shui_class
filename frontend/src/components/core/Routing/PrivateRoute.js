import BlankLayout from 'layout/BlankLayout'
import NotFoundPage from 'pages/NotFoundPage'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect, Route as DefaultRoute } from 'react-router-dom'
import LoaderComponent from '../LoaderComponent'

const PrivateRoute = ({
  component: Component,
  layout: Layout = BlankLayout,
  user: { user, isAuthenticated, loading },
  role = '',
  ...rest
}) => {
  return (
    <DefaultRoute
      {...rest}
      render={(props) =>
        loading ? (
          <LoaderComponent />
        ) : isAuthenticated ? (
          role.length > 0 && user ? (
            user.roles.includes(role) ? (
              <Layout>
                <Component {...props} />
              </Layout>
            ) : (
              <NotFoundPage />
            )
          ) : (
            <Layout>
              <Component {...props} />
            </Layout>
          )
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  )
}

PrivateRoute.propTypes = {
  user: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  user: state.user
})

export default connect(mapStateToProps)(PrivateRoute)
