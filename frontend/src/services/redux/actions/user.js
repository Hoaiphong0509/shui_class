import api from 'utils/api'

import { PROFILES, USERS } from 'constants/AppConstants'

export const loadUser = () => async (dispatch) => {
  try {
    const res = await api.get('/users/auth')

    dispatch({
      type: USERS.AUTH,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: USERS.ERRORS,
    })
  }
}

export const logout = () => async (dispatch) => {
  dispatch({
    type: USERS.LOGOUT,
    payload: null,
  })
  dispatch({
    type: USERS.CLEAN,
    payload: null,
  })
  dispatch({
    type: PROFILES.CLEAR_PROFILE,
    payload: null,
  })
}

export const register = (formData) => async (dispatch) => {
  try {
    const res = await api.post('/users/register', formData)
    dispatch({
      type: USERS.REGISTER,
      payload: res.data,
    })

    dispatch(loadUser())
  } catch (error) {
    dispatch({
      type: USERS.ERRORS,
    })
  }
}

export const login = (formData) => async (dispatch) => {
  try {
    const res = await api.post('/users/login', formData)

    dispatch({
      type: USERS.LOGIN,
      payload: res.data,
    })
    dispatch(loadUser())
  } catch (err) {
    dispatch({
      type: USERS.ERRORS,
      payload: { msg: err },
    })
  }
}
