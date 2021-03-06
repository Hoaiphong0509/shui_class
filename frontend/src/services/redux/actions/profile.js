import api from 'utils/api'

import { PROFILE } from 'constants/AppConstants'
import { toast } from 'react-toastify'

export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await api.get('/profile/me')

    dispatch({
      type: PROFILE.GET_MYPROFILE,
      payload: res.data
    })
    return
  } catch (err) {
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

export const getProfileByUserId = (userId) => async (dispatch) => {
  try {
    const res = await api.get(`/profile/${userId}`)
    dispatch({
      type: PROFILE.GET_PROFILE,
      payload: res.data
    })
    return
    
  } catch (err) {
    toast.error('Something wrong', {
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

export const updateMyProfile = (formData) => async (dispatch) => {
  try {
    await api.put('/profile/me', formData)

    dispatch({
      type: PROFILE.UPDATE_PROFILE
    })

    toast.success('Cập nhật hồ sơ thành công', {
      position: 'top-right',
      autoClose: 1200,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    })
  } catch (err) {
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

export const changeAvatar = (formData) => async (dispatch) => {
  try {
    await api.put('/profile/change_avatar', formData)

    dispatch({
      type: PROFILE.UPDATE_PROFILE
    })

    toast.success('Thay đổi ảnh đại diên thành công!', {
      position: 'top-right',
      autoClose: 1200,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    })
  } catch (err) {
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
