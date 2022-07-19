import api from 'utils/api'

import { CLASSNEWS, CLASSROOM, PARENTNEWS } from 'constants/AppConstants'
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
      autoClose: 2000,
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
      autoClose: 2000,
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
        autoClose: 2000,
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
        autoClose: 2000,
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
      autoClose: 2000,

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
      autoClose: 2000,

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
      autoClose: 2000,

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
      autoClose: 2000,

      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    })
  }
}

export const getClassnewsById = (idClassnews) => async (dispatch) => {
  try {
    const res = await api.get(`/teacher/get_classnews/${idClassnews}`)

    dispatch({
      type: CLASSNEWS.GET_CLASSNEWS,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: CLASSNEWS.ERRORS
    })
  }
}

export const getParentnewsById = (idParentnews) => async (dispatch) => {
  try {
    const res = await api.get(`/teacher/get_parentnews/${idParentnews}`)

    dispatch({
      type: PARENTNEWS.GET_PARENTNEWS,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: PARENTNEWS.ERRORS
    })
  }
}

export const addClassnews = (formData) => async (dispatch) => {
  try {
    const res = await api.post(`/teacher/add_classnews`, formData)

    dispatch({
      type: CLASSNEWS.ADD_CLASSNEWS,
      payload: res.data
    })
    toast.success('Thêm bản tin lớp thành công!', {
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
      type: CLASSNEWS.ERRORS
    })
    toast.error(err.response.data.msg, {
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

export const addParentnews = (formData) => async (dispatch) => {
  try {
    const res = await api.post(`/teacher/add_parentnews`, formData)
    dispatch({
      type: PARENTNEWS.ADD_PARENTNEWS,
      payload: res.data
    })
    toast.success('Thêm bản tin phụ huynh thành công!', {
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
      type: PARENTNEWS.ERRORS
    })
    toast.error(err.response.data.msg, {
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

export const deleteClassnews = (idClassnews) => async (dispatch) => {
  try {
    await api.delete(`/teacher/delete_classnews/${idClassnews}`)

    dispatch({
      type: CLASSNEWS.DELETE_CLASSNEWS,
      payload: idClassnews
    })
    toast.success('Xoá bản tin thành công!', {
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
      type: CLASSNEWS.ERRORS
    })
    toast.error(err.response.data.msg, {
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

export const deleteParentnews = (idParentnews) => async (dispatch) => {
  try {
    await api.delete(`/teacher/delete_parentnews/${idParentnews}`)

    dispatch({
      type: PARENTNEWS.DELETE_PARENTNEWS,
      payload: idParentnews
    })
    toast.success('Xoá bản tin thành công!', {
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
      type: CLASSNEWS.ERRORS
    })
    toast.error(err.response.data.msg, {
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
