import { combineReducers } from 'redux'
import user from './user'
import classroom from './classroom'
import student from './student'
import parent from './parent'
import staff from './staff'
import score from './score'
import profile from './profile'
import competition from './competition'
import classnews from './classnews'
import parentnews from './parentnews'
import parentIn4 from './parentIn4'

export default combineReducers({
  user,
  classroom,
  student,
  parent,
  staff,
  score,
  profile,
  competition,
  classnews,
  parentnews,
  parentIn4,
})
