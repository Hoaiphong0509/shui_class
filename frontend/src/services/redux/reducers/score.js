import { SCORE } from 'constants/AppConstants'

const initialState = {
  score: null,
  scores: [],
  loading: true
}

const scoreReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case SCORE.GET_SCORE:
      return {
        ...state,
        score: payload,
        loading: false
      }
    case SCORE.GET_SCORES:
      return {
        ...state,
        scores: payload,
        loading: false
      }
    case SCORE.UPDATE_SCORE:
    case SCORE.ADD_SCORE:
      return {
        ...state,
        loading: false
      }
    case SCORE.ERRORS:
    case SCORE.CLEAN:
      return {
        ...state,
        score: null,
        scores: [],
        loading: false
      }
    default:
      return state
  }
}

export default scoreReducer
