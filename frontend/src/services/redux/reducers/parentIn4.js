import { PARENTIN4 } from 'constants/AppConstants'

const initialState = {
  parentIn4: null,
  parentIn4s: [],
  loading: true
}

const parentIn4Reducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case PARENTIN4.GET_PARENTIN4:
      return {
        ...state,
        parentIn4: payload,
        loading: false
      }
    case PARENTIN4.GET_PARENTIN4S:
      return {
        ...state,
        parentIn4s: payload,
        loading: false
      }
    case PARENTIN4.UPDATE_PARENTIN4:
      return {
        ...state,
        loading: false
      }
    case PARENTIN4.ADD_PARENTIN4:
      return {
        ...state,
        parentIn4: payload,
        parentIn4s: [payload, ...state.parentIn4s],
        loading: false
      }
    case PARENTIN4.DELETE_PARENTIN4:
      return {
        ...state,
        parentIn4s: state.parentIn4s.filter(
          (c) => c._id.toString() !== payload
        ),
        loading: false
      }
    case PARENTIN4.ERRORS:
    case PARENTIN4.CLEAN:
      return {
        ...state,
        parentIn4: null,
        parentIn4s: [],
        loading: false
      }
    default:
      return state
  }
}

export default parentIn4Reducer
