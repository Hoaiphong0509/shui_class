import api from 'utils/api'

import { PROFILES, USERS } from 'constants/AppConstants'
import { toast } from 'react-toastify'

export const loadUser = () => async (dispatch) => {
  try {
    const res = await api.get('/users/auth')

    dispatch({
      type: USERS.AUTH,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: USERS.ERRORS
    })
  }
}

export const logout = () => async (dispatch) => {
  dispatch({
    type: USERS.LOGOUT
  })
  dispatch({
    type: PROFILES.CLEAN
  })
}

export const registerAccount = (formData) => async (dispatch) => {
  try {
    const res = await api.post('/users/register', formData)
    dispatch({
      type: USERS.REGISTER,
      payload: res.data
    })
    toast.success('Đăng ký tài khoản thành công', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    })
    dispatch(loadUser())
  } catch (err) {
    dispatch({
      type: USERS.ERRORS
    })
    toast.error(err.response.data.msg, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    })
  }
}

export const login = (formData) => async (dispatch) => {
  try {
    const res = await api.post('/users/login', formData)

    dispatch({
      type: USERS.LOGIN,
      payload: res.data
    })

    dispatch(loadUser())
    toast.success('Đăng nhập tài khoản thành công', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    })
  } catch (err) {
    dispatch({
      type: USERS.ERRORS
    })
    toast.error(err.response.data.msg, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    })
  }
}
