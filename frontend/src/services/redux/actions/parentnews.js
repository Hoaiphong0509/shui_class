import api from 'utils/api'

import { PARENTNEWS } from 'constants/AppConstants'

export const getMyParentnews = () => async (dispatch) => {
  try {
    const res = await api.get('/users/get_myparentnews')

    dispatch({
      type: PARENTNEWS.GET_PARENTNEWSS,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: PARENTNEWS.ERRORS
    })
  }
}
