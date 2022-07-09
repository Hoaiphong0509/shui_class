import { Switch } from 'react-router-dom'

import DefaultLayout from 'layout/DefaultLayout'
import Home from 'pages/Home'
import PrivateRoute from './PrivateRoute'

import BlankLayout from 'layout/BlankLayout'
import Login from 'pages/Login'
import NotFoundPage from 'pages/NotFoundPage'
import Register from 'pages/Register'
import Route from './Route'

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/register" layout={BlankLayout} component={Register} />
      <Route exact path="/login" layout={BlankLayout} component={Login} />
      <PrivateRoute exact path="/" layout={DefaultLayout} component={Home} />
      <PrivateRoute component={NotFoundPage} layout={DefaultLayout} />
    </Switch>
  )
}

export default Routes
