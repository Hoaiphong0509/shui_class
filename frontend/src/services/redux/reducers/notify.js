import { NOTIFY } from 'constants/AppConstants'

const initialState = {
  notify: null,
  notifies: [],
  loading: true
}

const notifyReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case NOTIFY.GET_NOTIFIES:
      return {
        ...state,
        notifies: payload,
        loading: false
      }
    case NOTIFY.UPDATE_NOTIFY:
    case NOTIFY.GET_NOTIFY:
      return {
        ...state,
        notify: payload,
        loading: false
      }
    case NOTIFY.DELETE_NOTIFY:
      return {
        ...state,
        notifies: state.notifies.filter((n) => n._id.toString() !== payload),
        loading: false
      }
    case NOTIFY.ERRORS:
    case NOTIFY.CLEAN:
      return {
        ...state,
        notify: null,
        notifies: [],
        loading: false
      }
    default:
      return state
  }
}

export default notifyReducer
