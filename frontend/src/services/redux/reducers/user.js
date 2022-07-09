import { USERS } from 'constants/AppConstants'

const initialState = {
  user: null,
  users: [],
  loading: true,
  token: localStorage.getItem('token'),
  isAuthenticated: null
}

const userReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case USERS.AUTH:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload
      }
    case USERS.LOGIN:
    case USERS.REGISTER:
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      }
    case USERS.GET_USERS:
      return {
        ...state,
        users: payload,
        loading: false
      }
    case USERS.UPDATE_USER:
      return {
        ...state,
        user: payload,
        loading: false
      }
    case USERS.GET_USER:
      return {
        ...state,
        user: payload,
        loading: false
      }
    case USERS.ERRORS:
      return {
        ...state,
        user: null,
        token: null,
        loading: false
      }
    case USERS.LOGOUT:
    case USERS.CLEAN:
      return {
        ...state,
        user: null,
        users: [],
        token: null,
        isAuthenticated: false,
        searchResult: null,
        loading: false
      }
    default:
      return state
  }
}

export default userReducer
