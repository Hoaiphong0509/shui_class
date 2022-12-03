import api from 'utils/api'

import { PROFILE, USERS } from 'constants/AppConstants'
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
    type: PROFILE.CLEAN
  })
}

export const registerAccount = (formData, fnc) => async (dispatch) => {
  try {
    await api.post('/users/register', formData)
    toast.success(
      'Đăng ký tài khoản thành công. Bạn vui lòng đợi quản trị viên thêm quyền truy cập vào hệ thống',
      {
        position: 'top-right',
        autoClose: 1200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      }
    )
    if(typeof fnc ==="function")fnc()
  } catch (err) {
    // dispatch({
    //   type: USERS.ERRORS
    // })
    toast.error(err.response.data.msg, {
      position: 'top-right',
      autoClose: 1200,
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
      autoClose: 1200,
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
      autoClose: 1200,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    })
  }
}
