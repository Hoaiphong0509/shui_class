import api from 'utils/api'

import { SCORE } from 'constants/AppConstants'
import { toast } from 'react-toastify'

export const getScoreByStudent = (idStudent) => async (dispatch) => {
  try {
    const res = await api.get(`/score/${idStudent}`)

    dispatch({
      type: SCORE.GET_SCORE,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: SCORE.ERRORS
    })
  }
}

export const addScore = (idStudent, formData) => async (dispatch) => {
  try {
    await api.post(`/score/${idStudent}`, formData)

    dispatch({
      type: SCORE.ADD_SCORE
    })

    toast.success('Thêm điểm thành công', {
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
      type: SCORE.ERRORS
    })

    toast.error('Thêm điểm thất bại, vui lòng thử lại sau!', {
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

export const updateScore = (idStudent, formData) => async (dispatch) => {
  try {
    await api.put(`/score/${idStudent}`, formData)

    dispatch({
      type: SCORE.UPDATE_SCORE
    })

    toast.success('Cập nhật điểm thành công', {
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
      type: SCORE.ERRORS
    })

    toast.error('Cập nhật thất bại, vui lòng thử lại sau!', {
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

export const cleanScore = () => async (dispatch) => {
  dispatch({
    type: SCORE.CLEAN
  })
}