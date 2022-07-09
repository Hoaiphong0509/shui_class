import { combineReducers } from 'redux'
import user from './user'
import classroom from './classroom'
import student from './student'
import staff from './staff'

export default combineReducers({
  user,
  classroom,
  student,
  staff
})
