import { PARENTNEWS } from 'constants/AppConstants'

const initialState = {
  parentnews: null,
  parentnewss: [],
  loading: true
}

const classReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case PARENTNEWS.GET_PARENTNEWS:
      return {
        ...state,
        parentnews: payload,
        loading: false
      }
    case PARENTNEWS.GET_PARENTNEWSS:
      return {
        ...state,
        parentnewss: payload,
        loading: false
      }
    case PARENTNEWS.UPDATE_PARENTNEWS:
      return {
        ...state,
        loading: false
      }
    case PARENTNEWS.ADD_PARENTNEWS:
      return {
        ...state,
        parentnews: payload,
        parentnewss: [payload, ...state.parentnewss],
        loading: false
      }
    case PARENTNEWS.DELETE_PARENTNEWS:
      return {
        ...state,
        parentnewss: state.parentnewss.filter(
          (c) => c._id.toString() !== payload
        ),
        loading: false
      }
    case PARENTNEWS.ERRORS:
    case PARENTNEWS.CLEAN:
      return {
        ...state,
        parentnews: null,
        parentnewss: [],
        loading: false
      }
    default:
      return state
  }
}

export default classReducer
