import { STUDENT } from 'constants/AppConstants'

const initialState = {
  student: null,
  students: [],
  loading: true
}

const studentReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case STUDENT.GET_STUDENT:
      return {
        ...state,
        student: payload,
        loading: false
      }
    case STUDENT.GET_STUDENTS:
      return {
        ...state,
        students: payload,
        loading: false
      }
    case STUDENT.UPDATE_STUDENT:
      return {
        ...state,
        student: payload,
        loading: false
      }
    case STUDENT.ERRORS:
    case STUDENT.CLEAN:
      return {
        ...state,
        student: null,
        students: [],
        loading: false
      }
    default:
      return state
  }
}

export default studentReducer
