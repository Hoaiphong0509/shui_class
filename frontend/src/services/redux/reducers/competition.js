import { COMPETITION } from 'constants/AppConstants'

const initialState = {
  competition: null,
  competitions: [],
  loading: true
}

const competitionReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case COMPETITION.GET_COMPETITION:
      return {
        ...state,
        competition: payload,
        loading: false
      }
    case COMPETITION.GET_COMPETITIONS:
      return {
        ...state,
        competitions: payload,
        loading: false
      }
    case COMPETITION.UPDATE_COMPETITION:
    case COMPETITION.ADD_COMPETITION:
      return {
        ...state,
        loading: false
      }
    case COMPETITION.ERRORS:
    case COMPETITION.CLEAN:
      return {
        ...state,
        competition: null,
        competitions: [],
        loading: false
      }
    default:
      return state
  }
}

export default competitionReducer
