import api from 'utils/api'

import { CLASSNEWS, STUDENT } from 'constants/AppConstants'
import { toast } from 'react-toastify'

export const getStudents = () => async (dispatch) => {
  try {
    const res = await api.get('/student')

    dispatch({
      type: STUDENT.GET_STUDENTS,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: STUDENT.ERRORS
    })
  }
}

export const getGuests = () => async (dispatch) => {
  try {
    const res = await api.get('/student/guest')

    dispatch({
      type: STUDENT.GET_STUDENTS,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: STUDENT.ERRORS
    })
  }
}


export const likeClassnews = (id_classnews) => async (dispatch) => {
  try {
    const res = await api.put(`/student/like_classnews/${id_classnews}`)
    dispatch({
      type: CLASSNEWS.UPDATE_CLASSNEWS,
      payload: res.data
    })
    toast.success('Đã like 💘', {
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
  }
}

export const unlikeClassnews = (id_classnews) => async (dispatch) => {
  try {
    const res = await api.put(`/student/unlike_classnews/${id_classnews}`)
    dispatch({
      type: CLASSNEWS.UPDATE_CLASSNEWS,
      payload: res.data
    })

    toast.warn('Đã unlike 💔', {
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
  }
}

export const addCommentClassnews =
  (id_classnews, formData) => async (dispatch) => {
    try {
      const res = await api.put(
        `/student/add_comment/${id_classnews}`,
        formData
      )
      dispatch({
        type: CLASSNEWS.UPDATE_CLASSNEWS,
        payload: res.data
      })
      toast.success('Bạn đã gửi comment', {
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
    }
  }

export const deleteCommentClassnews =
  (id_classnews, idCmt) => async (dispatch) => {
    try {
      const res = await api.put(
        `/student/delete_comment/${id_classnews}/${idCmt}`
      )
      dispatch({
        type: CLASSNEWS.UPDATE_CLASSNEWS,
        payload: res.data
      })
      toast.success('Xoá comment thành công', {
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
    }
  }
