import { STAFF } from 'constants/AppConstants'

const initialState = {
  staff: null,
  staffs: [],
  loading: true
}

const staffReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case STAFF.GET_STAFF:
      return {
        ...state,
        staff: payload,
        loading: false
      }
    case STAFF.GET_STAFFS:
      return {
        ...state,
        staffs: payload,
        loading: false
      }
    case STAFF.ADD_STAFF:
      return {
        ...state,
        staff: payload,
        staffs: [payload, ...state.staffs],
        loading: false
      }
    case STAFF.DELETE_STAFF:
      return {
        ...state,
        staffs: state.staffs.filter((s) => s._id !== payload),
        loading: false
      }
    case STAFF.UPDATE_STAFF:
      return {
        ...state,
        staff: payload,
        loading: false
      }
    case STAFF.ERRORS:
    case STAFF.CLEAN:
      return {
        ...state,
        staff: null,
        staffs: [],
        loading: false
      }
    default:
      return state
  }
}

export default staffReducer
