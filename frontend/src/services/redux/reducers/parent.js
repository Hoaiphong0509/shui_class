import { PARENT } from 'constants/AppConstants'

const initialState = {
  parent: null,
  parents: [],
  loading: true
}

const parentReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case PARENT.GET_PARENT:
      return {
        ...state,
        parent: payload,
        loading: false
      }
    case PARENT.GET_PARENTS:
      return {
        ...state,
        parents: payload,
        loading: false
      }
    case PARENT.UPDATE_PARENT:
      return {
        ...state,
        parent: payload,
        loading: false
      }
    case PARENT.ERRORS:
    case PARENT.CLEAN:
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

export default parentReducer
