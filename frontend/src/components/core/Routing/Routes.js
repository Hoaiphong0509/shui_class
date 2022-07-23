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
import UpdateClassnews from 'pages/Classnews/UpdateClassnews'
import ChildrenPage from 'pages/ChildrenPage'
import ScoreChild from 'pages/ParentPage/ScoreChild'
import CompetitionChild from 'pages/ParentPage/CompetitionChild'
import UpdateStudent from 'pages/Teacher/UpdateStudent'
import ScoreAll from 'pages/Student/ScoreAll'
import CompetitionAll from 'pages/Student/CompetitionAll'
import ParentsList from 'pages/Teacher/ParentsList'
import CreateParent from 'pages/Teacher/CreateParent'
import TrashParent from 'pages/Teacher/TrashParent'
import TeacherChildrenPage from 'pages/Teacher/TeacherChildrenPage'
import UpdateParentnews from 'pages/Parentnews/UpdateParentnews'
import NotifyPages from 'pages/NotifyPages'
import UsersPage from 'pages/Admin/UsersPage'
import TeachersPage from 'pages/Admin/TeachersPage'
import ParentsPage from 'pages/Admin/ParentsPage'
import ClassroomsPage from 'pages/Admin/ClassroomsPage'
import StaffsPage from 'pages/Admin/StaffsPage'

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/register" layout={BlankLayout} component={Register} />
      <Route exact path="/login" layout={BlankLayout} component={Login} />
      <PrivateRoute exact path="/" layout={DefaultLayout} component={Home} />
      <PrivateRoute
        exact
        path="/parents"
        layout={DefaultLayout}
        role={ROLES.TEACHER}
        component={ParentsList}
      />
      <PrivateRoute
        exact
        path="/createStudent"
        layout={DefaultLayout}
        role={ROLES.TEACHER}
        component={CreateStudent}
      />
      <PrivateRoute
        exact
        path="/createParent"
        layout={DefaultLayout}
        role={ROLES.TEACHER}
        component={CreateParent}
      />
      <PrivateRoute
        exact
        path="/detail_parent/:id_parent"
        layout={DefaultLayout}
        role={ROLES.TEACHER}
        component={TeacherChildrenPage}
      />
      <PrivateRoute
        exact
        path="/updateStudent/:id_student"
        layout={DefaultLayout}
        role={ROLES.TEACHER}
        component={UpdateStudent}
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
        path="/trashParent"
        layout={DefaultLayout}
        role={ROLES.TEACHER}
        component={TrashParent}
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
        path="/sheet_all/:id_student"
        layout={DefaultLayout}
        component={ScoreAll}
      />
      <PrivateRoute
        exact
        path="/competition_all/:id_student"
        layout={DefaultLayout}
        component={CompetitionAll}
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
        component={AddCompetitionSheet1}
      />
      <PrivateRoute
        exact
        path="/add_competition_2/:id_student"
        layout={DefaultLayout}
        component={AddCompetitionSheet2}
      />
      <PrivateRoute
        exact
        path="/update_competition_1/:id_student"
        layout={DefaultLayout}
        component={UpdateCompetionSheet1}
      />
      <PrivateRoute
        exact
        path="/update_competition_2/:id_student"
        layout={DefaultLayout}
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
        path="/update_classnews/:id_classnews"
        role={ROLES.TEACHER}
        layout={DefaultLayout}
        component={UpdateClassnews}
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
        path="/update_parentnews/:id_parentnews"
        role={ROLES.TEACHER}
        layout={DefaultLayout}
        component={UpdateParentnews}
      />
      <PrivateRoute
        exact
        path="/detail_in4_student/:id_student"
        role={ROLES.TEACHER}
        layout={DefaultLayout}
        component={DetailIn4Student}
      />
      <PrivateRoute
        exact
        path="/children"
        role={ROLES.PARENT}
        layout={DefaultLayout}
        component={ChildrenPage}
      />
      <PrivateRoute
        exact
        path="/score_child/:id_student"
        role={ROLES.PARENT}
        layout={DefaultLayout}
        component={ScoreChild}
      />
      <PrivateRoute
        exact
        path="/competition_child/:id_student"
        role={ROLES.PARENT}
        layout={DefaultLayout}
        component={CompetitionChild}
      />
      <PrivateRoute
        exact
        path="/notifies"
        layout={DefaultLayout}
        component={NotifyPages}
      />
      <PrivateRoute
        exact
        path="/admin/users"
        role={ROLES.ADMIN}
        layout={DefaultLayout}
        component={UsersPage}
      />
      <PrivateRoute
        exact
        path="/admin/teachers"
        role={ROLES.ADMIN}
        layout={DefaultLayout}
        component={TeachersPage}
      />
      <PrivateRoute
        exact
        path="/admin/parents"
        role={ROLES.ADMIN}
        layout={DefaultLayout}
        component={ParentsPage}
      />
      <PrivateRoute
        exact
        path="/admin/classrooms"
        role={ROLES.ADMIN}
        layout={DefaultLayout}
        component={ClassroomsPage}
      />
      <PrivateRoute
        exact
        path="/admin/staffs"
        role={ROLES.ADMIN}
        layout={DefaultLayout}
        component={StaffsPage}
      />
      <PrivateRoute component={NotFoundPage} layout={DefaultLayout} />
    </Switch>
  )
}

export default Routes
