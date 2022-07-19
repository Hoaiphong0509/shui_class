import api from 'utils/api'

import { PARENTIN4 } from 'constants/AppConstants'
import { toast } from 'react-toastify'

export const getMyParentIn4 = () => async (dispatch) => {
  try {
    const res = await api.get('/parents/me')

    dispatch({
      type: PARENTIN4.GET_PARENTIN4,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: PARENTIN4.ERRORS
    })
  }
}

export const addChildren = (formData) => async (dispatch) => {
  try {
    await api.put(`/parents/add_children`, formData)
    toast.success('Thêm học sinh thành công', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    })
    dispatch({
      type: PARENTIN4.UPDATE_PARENTIN4
    })
    dispatch(getMyParentIn4())
  } catch (err) {
    toast.error(err.response.data.msg, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    })
    dispatch({
      type: PARENTIN4.ERRORS
    })
  }
}

export const removeChildren = (idUser) => async (dispatch) => {
  try {
    await api.put(`/parents/remove_student/${idUser}`)
    toast.success('Xoá học sinh thành công', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    })
    dispatch({
      type: PARENTIN4.UPDATE_PARENTIN4
    })
    dispatch(getMyParentIn4())
  } catch (err) {
    toast.error(err.response.data.msg, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    })
    dispatch({
      type: PARENTIN4.ERRORS
    })
  }
}
