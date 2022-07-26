import api from 'utils/api'

import { COMPETITION } from 'constants/AppConstants'
import { toast } from 'react-toastify'

export const getCompetitionByStudent = (idStudent) => async (dispatch) => {
  try {
    const res = await api.get(`/competition/${idStudent}`)
    dispatch({
      type: COMPETITION.GET_COMPETITIONS,
      payload: res.data
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

export const addCompetition = (idStudent, formData) => async (dispatch) => {
  try {
    await api.post(`/competition/${idStudent}`, formData)

    dispatch(getCompetitionByStudent(idStudent))

    toast.success('Thêm điểm thi đua thành công', {
      position: 'top-right',
      autoClose: 1200,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    })
  } catch (err) {
    toast.error('Thêm điểm thi đua thất bại, vui lòng thử lại sau!', {
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

export const updateCompetition = (idStudent, formData) => async (dispatch) => {
  try {
    await api.put(`/competition/${idStudent}`, formData)

    dispatch(getCompetitionByStudent(idStudent))
    toast.success('Cập nhật điểm thi đua thành công', {
      position: 'top-right',
      autoClose: 1200,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    })
  } catch (err) {
    toast.error('Cập nhật điểm thi đua thất bại, vui lòng thử lại sau!', {
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
