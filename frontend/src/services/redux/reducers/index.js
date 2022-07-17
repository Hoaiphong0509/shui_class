import { combineReducers } from 'redux'
import user from './user'
import classroom from './classroom'
import student from './student'
import staff from './staff'
import score from './score'
import profile from './profile'
import competition from './competition'
import classnews from './classnews'
import parentnews from './parentnews'

export default combineReducers({
  user,
  classroom,
  student,
  staff,
  score,
  profile,
  competition,
  classnews,
  parentnews
})
