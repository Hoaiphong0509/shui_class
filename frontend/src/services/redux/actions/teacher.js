import api from 'utils/api'

import { CLASSROOM } from 'constants/AppConstants'
import { toast } from 'react-toastify'

export const getStudentMyClassroom = () => async (dispatch) => {
  try {
    const res = await api.get('/teacher/get_student_myclassroom')

    dispatch({
      type: CLASSROOM.GET_CLASSROOM,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: CLASSROOM.ERRORS
    })
  }
}

export const addStudent = (idClassroom, formData) => async (dispatch) => {
  try {
    const res = await api.put(`/teacher/add_student/${idClassroom}`, formData)

    dispatch({
      type: CLASSROOM.UPDATE_CLASSROOM,
      payload: res.data
    })
    toast.success('Thêm học sinh vào lớp học thành công!', {
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
      type: CLASSROOM.ERRORS
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

export const moveStudentToTrash =
  (idClassroom, idStudent) => async (dispatch) => {
    try {
      const res = await api.put(
        `/teacher/move_student_to_trash/${idClassroom}/${idStudent}`
      )
      dispatch({
        type: CLASSROOM.UPDATE_CLASSROOM,
        payload: res.data
      })
      toast.success('Xoá học sinh vào thùng rác thành công!', {
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
        type: CLASSROOM.ERRORS
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

export const restoreStudent = (idClassroom, idStudent) => async (dispatch) => {
  try {
    const res = await api.put(
      `/teacher/restore_student/${idClassroom}/${idStudent}`
    )

    dispatch({
      type: CLASSROOM.UPDATE_CLASSROOM,
      payload: res.data
    })
    toast.success('Khôi phục học sinh thành công!', {
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
      type: CLASSROOM.ERRORS
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


export const deleteStudent = (idClassroom, idStudent) => async (dispatch) => {
  try {
    const res = await api.put(
      `/teacher/delete_student/${idClassroom}/${idStudent}`
    )

    dispatch({
      type: CLASSROOM.UPDATE_CLASSROOM,
      payload: res.data
    })
    toast.success('Xoá học sinh vĩnh viễn thành công!', {
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
      type: CLASSROOM.ERRORS
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
