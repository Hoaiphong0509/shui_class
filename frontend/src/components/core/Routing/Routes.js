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
import Sheet1 from 'pages/ScoreSheet/Sheet1'
import Sheet2 from 'pages/ScoreSheet/Sheet2'
import AddScoreSheet1 from 'pages/ScoreSheet/AddScoreSheet1'
import AddScoreSheet2 from 'pages/ScoreSheet/AddScoreSheet2'
import UpdateScoreSheet1 from 'pages/ScoreSheet/UpdateScoreSheet1'
import UpdateScoreSheet2 from 'pages/ScoreSheet/UpdateScoreSheet2'
import DetailsProfile from 'pages/ProfileUser/DetailsProfile'
import UpdateProfile from 'pages/ProfileUser/UpdateProfile'

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
      <PrivateRoute
        exact
        path="/sheet_1/:id_student"
        layout={DefaultLayout}
        component={Sheet1}
      />
      <PrivateRoute
        exact
        path="/sheet_2/:id_student"
        layout={DefaultLayout}
        component={Sheet2}
      />
      <PrivateRoute
        exact
        path="/add_score_1/:id_student"
        layout={DefaultLayout}
        role={ROLES.TEACHER}
        component={AddScoreSheet1}
      />
      <PrivateRoute
        exact
        path="/add_score_2/:id_student"
        layout={DefaultLayout}
        role={ROLES.TEACHER}
        component={AddScoreSheet2}
      />
      <PrivateRoute
        exact
        path="/update_score_1/:id_student"
        layout={DefaultLayout}
        role={ROLES.TEACHER}
        component={UpdateScoreSheet1}
      />
      <PrivateRoute
        exact
        path="/update_score_2/:id_student"
        layout={DefaultLayout}
        role={ROLES.TEACHER}
        component={UpdateScoreSheet2}
      />
      <PrivateRoute
        exact
        path="/my_profile"
        layout={DefaultLayout}
        component={DetailsProfile}
      />
      <PrivateRoute
        exact
        path="/update_profile"
        layout={DefaultLayout}
        component={UpdateProfile}
      />
      <PrivateRoute component={NotFoundPage} layout={DefaultLayout} />
    </Switch>
  )
}

export default Routes
