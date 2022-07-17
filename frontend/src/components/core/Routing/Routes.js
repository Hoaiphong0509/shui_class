import { Switch } from 'react-router-dom'

import DefaultLayout from 'layout/DefaultLayout'

import PrivateRoute from './PrivateRoute'

import { ROLES } from 'constants/AppConstants'
import BlankLayout from 'layout/BlankLayout'
import AddCompetitionSheet1 from 'pages/CompetionSheet/AddCompetitionSheet1'
import AddCompetitionSheet2 from 'pages/CompetionSheet/AddCompetitionSheet2'
import SheetCompetion1 from 'pages/CompetionSheet/SheetCompetion1'
import SheetCompetion2 from 'pages/CompetionSheet/SheetCompetion2'
import UpdateCompetionSheet1 from 'pages/CompetionSheet/UpdateCompetionSheet1'
import UpdateCompetionSheet2 from 'pages/CompetionSheet/UpdateCompetionSheet2'
import Home from 'pages/Home'
import Login from 'pages/Login'
import NotFoundPage from 'pages/NotFoundPage'
import DetailsProfile from 'pages/ProfileUser/DetailsProfile'
import UpdateProfile from 'pages/ProfileUser/UpdateProfile'
import Register from 'pages/Register'
import AddScoreSheet1 from 'pages/ScoreSheet/AddScoreSheet1'
import AddScoreSheet2 from 'pages/ScoreSheet/AddScoreSheet2'
import SheetScore1 from 'pages/ScoreSheet/SheetScore1'
import SheetScore2 from 'pages/ScoreSheet/SheetScore2'
import UpdateScoreSheet1 from 'pages/ScoreSheet/UpdateScoreSheet1'
import UpdateScoreSheet2 from 'pages/ScoreSheet/UpdateScoreSheet2'
import CreateStudent from 'pages/Teacher/CreateStudent'
import TrashStudent from 'pages/Teacher/TrashStudent'
import Route from './Route'
import Classnews from 'pages/Classnews'
import CreateClassnews from 'pages/Classnews/CreateClassnews'
import Parentnews from 'pages/Parentnews'
import CreateParentnews from 'pages/Parentnews/CreateParentnews'
import DetailIn4Student from 'pages/DetailIn4Student'

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
        path="/sheet_score_1/:id_student"
        layout={DefaultLayout}
        component={SheetScore1}
      />
      <PrivateRoute
        exact
        path="/sheet_score_2/:id_student"
        layout={DefaultLayout}
        component={SheetScore2}
      />
      <PrivateRoute
        exact
        path="/sheet_competition_1/:id_student"
        layout={DefaultLayout}
        component={SheetCompetion1}
      />
      <PrivateRoute
        exact
        path="/sheet_competition_2/:id_student"
        layout={DefaultLayout}
        component={SheetCompetion2}
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
        path="/add_competition_1/:id_student"
        layout={DefaultLayout}
        role={ROLES.TEACHER}
        component={AddCompetitionSheet1}
      />
      <PrivateRoute
        exact
        path="/add_competition_2/:id_student"
        layout={DefaultLayout}
        role={ROLES.TEACHER}
        component={AddCompetitionSheet2}
      />
      <PrivateRoute
        exact
        path="/update_competition_1/:id_student"
        layout={DefaultLayout}
        role={ROLES.TEACHER}
        component={UpdateCompetionSheet1}
      />
      <PrivateRoute
        exact
        path="/update_competition_2/:id_student"
        layout={DefaultLayout}
        role={ROLES.TEACHER}
        component={UpdateCompetionSheet2}
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
      <PrivateRoute
        exact
        path="/classnews"
        layout={DefaultLayout}
        component={Classnews}
      />
      <PrivateRoute
        exact
        path="/add_classnews"
        role={ROLES.TEACHER}
        layout={DefaultLayout}
        component={CreateClassnews}
      />
      <PrivateRoute
        exact
        path="/parentnews"
        layout={DefaultLayout}
        component={Parentnews}
      />
      <PrivateRoute
        exact
        path="/add_parentnews"
        role={ROLES.TEACHER}
        layout={DefaultLayout}
        component={CreateParentnews}
      />
      <PrivateRoute
        exact
        path="/detail_in4_student/:id_student"
        role={ROLES.TEACHER}
        layout={DefaultLayout}
        component={DetailIn4Student}
      />
      <PrivateRoute component={NotFoundPage} layout={DefaultLayout} />
    </Switch>
  )
}

export default Routes
