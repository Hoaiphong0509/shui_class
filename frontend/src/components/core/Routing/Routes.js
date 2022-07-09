import { Switch } from 'react-router-dom'

import DefaultLayout from 'layout/DefaultLayout'

import PrivateRoute from './PrivateRoute'

import { ROLES } from 'constants/AppConstants'
import BlankLayout from 'layout/BlankLayout'
import Home from 'pages/Home'
import Login from 'pages/Login'
import NotFoundPage from 'pages/NotFoundPage'
import Register from 'pages/Register'
import CreateStudent from 'pages/Teacher/CreateStudent'
import TrashStudent from 'pages/Teacher/TrashStudent'
import Route from './Route'

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/register" layout={BlankLayout} component={Register} />
      <Route exact path="/login" layout={BlankLayout} component={Login} />
      <PrivateRoute exact path="/" layout={DefaultLayout} component={Home} />
      <PrivateRoute
        exact
        path="/createStudent"
        layout={DefaultLayout}
        role={ROLES.TEACHER}
        component={CreateStudent}
      />
      <PrivateRoute
        exact
        path="/trashStudent"
        layout={DefaultLayout}
        role={ROLES.TEACHER}
        component={TrashStudent}
      />
      <PrivateRoute component={NotFoundPage} layout={DefaultLayout} />
    </Switch>
  )
}

export default Routes
