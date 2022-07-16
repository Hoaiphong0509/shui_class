import api from 'utils/api'

import { CLASSNEWS } from 'constants/AppConstants'

export const getMyClassnews = () => async (dispatch) => {
  try {
    const res = await api.get('/users/get_myclassnews')

    dispatch({
      type: CLASSNEWS.GET_CLASSNEWSS,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: CLASSNEWS.ERRORS
    })
  }
}
