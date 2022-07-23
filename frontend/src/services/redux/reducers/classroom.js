import { CLASSROOM } from 'constants/AppConstants'

const initialState = {
  classroom: null,
  classrooms: [],
  loading: true
}

const classReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case CLASSROOM.GET_CLASSROOM:
      return {
        ...state,
        classroom: payload,
        loading: false
      }
    case CLASSROOM.GET_CLASSROOMS:
      return {
        ...state,
        classrooms: payload,
        loading: false
      }
    case CLASSROOM.UPDATE_CLASSROOM:
      return {
        ...state,
        classroom: payload,
        loading: false
      }
    case CLASSROOM.ADD_CLASSROOM:
      return {
        ...state,
        classroom: payload,
        classrooms: [payload, ...state.classrooms],
        loading: false
      }
    case CLASSROOM.ERRORS:
    case CLASSROOM.CLEAN:
      return {
        ...state,
        classroom: null,
        classrooms: [],
        loading: false
      }
    default:
      return state
  }
}

export default classReducer
