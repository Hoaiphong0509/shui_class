import api from 'utils/api'

import { PROFILE } from 'constants/AppConstants'

export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await api.get('/profile/me')

    dispatch({
      type: PROFILE.GET_PROFILE,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: PROFILE.ERRORS
    })
  }
}

export const getProfileByUserId = (userId) => async (dispatch) => {
  try {
    const res = await api.get(`/profile/${userId}`)

    dispatch({
      type: PROFILE.GET_PROFILE,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: PROFILE.ERRORS
    })
  }
}
