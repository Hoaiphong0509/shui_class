import { CLASSNEWS } from 'constants/AppConstants'

const initialState = {
  classnews: null,
  classnewss: [],
  loading: true
}

const classnewsReducer = (state = initialState, action) => {
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
        classnews: payload,
        loading: false
      }
    case CLASSNEWS.ADD_CLASSNEWS:
      return {
        ...state,
        classnews: payload,
        classnewss: [payload, ...state.classnewss],
        loading: false
      }
    case CLASSNEWS.DELETE_CLASSNEWS:
      return {
        ...state,
        classnewss: state.classnewss.filter(
          (c) => c._id.toString() !== payload
        ),
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

export default classnewsReducer
