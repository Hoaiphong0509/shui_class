import api from 'utils/api'

import { COMPETITION } from 'constants/AppConstants'
import { toast } from 'react-toastify'

export const getCompetitionByStudent = (idStudent) => async (dispatch) => {
  try {
    const res = await api.get(`/competition/${idStudent}`)

    dispatch({
      type: COMPETITION.GET_COMPETITION,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: COMPETITION.ERRORS
    })
  }
}

export const addCompetition = (idStudent, formData) => async (dispatch) => {
  try {
    await api.post(`/competition/${idStudent}`, formData)

    dispatch({
      type: COMPETITION.ADD_COMPETITION
    })

    toast.success('Thêm điểm thi đua thành công', {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    })
  } catch (err) {
    dispatch({
      type: COMPETITION.ERRORS
    })

    toast.error('Thêm điểm thi đua thất bại, vui lòng thử lại sau!', {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    })
  }
}

export const updateCompetition = (idStudent, formData) => async (dispatch) => {
  try {
    await api.put(`/competition/${idStudent}`, formData)

    dispatch({
      type: COMPETITION.UPDATE_COMPETITION
    })

    toast.success('Cập nhật điểm thi đua thành công', {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    })
  } catch (err) {
    dispatch({
      type: COMPETITION.ERRORS
    })

    toast.error('Cập nhật điểm thi đua thất bại, vui lòng thử lại sau!', {
      position: 'top-right',
      autoClose: 2000,
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
    type: COMPETITION.CLEAN
  })
}
