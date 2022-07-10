import { PROFILE } from 'constants/AppConstants'

const initialState = {
  profile: null,
  profiles: [],
  loading: true
}

const PROFILEReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case PROFILE.GET_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false
      }
    case PROFILE.GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false
      }
    case PROFILE.UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false
      }
    case PROFILE.ERRORS:
    case PROFILE.CLEAN:
      return {
        ...state,
        profile: null,
        profiles: [],
        loading: false
      }
    default:
      return state
  }
}

export default PROFILEReducer
