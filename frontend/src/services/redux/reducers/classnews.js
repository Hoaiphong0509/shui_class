import { CLASSNEWS } from 'constants/AppConstants'

const initialState = {
  classnews: null,
  classnewss: [],
  loading: true
}

const classReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case CLASSNEWS.GET_CLASSNEWS:
      return {
        ...state,
        classnews: payload,
        loading: false
      }
    case CLASSNEWS.GET_CLASSNEWSS:
      return {
        ...state,
        classnewss: payload,
        loading: false
      }
    case CLASSNEWS.UPDATE_CLASSNEWS:
      return {
        ...state,
        loading: false
      }
    case CLASSNEWS.ERRORS:
    case CLASSNEWS.CLEAN:
      return {
        ...state,
        classnews: null,
        classnewss: [],
        loading: false
      }
    default:
      return state
  }
}

export default classReducer
