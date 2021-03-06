import api from 'utils/api'

import { PARENTIN4, PARENTNEWS, PARENT } from 'constants/AppConstants'
import { toast } from 'react-toastify'

export const getParents = () => async (dispatch) => {
  try {
    const res = await api.get('/parents')

    dispatch({
      type: PARENT.GET_PARENTS,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: PARENT.ERRORS
    })
  }
}

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

export const likeParentnews = (id_parentnews) => async (dispatch) => {
  try {
    await api.put(`/parents/like_parentnews/${id_parentnews}`)

    toast.success('Đã like 💘', {
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
      type: PARENTNEWS.ERRORS
    })
  }
}

export const unlikeParentnews = (id_parentnews) => async (dispatch) => {
  try {
    await api.put(`/parents/unlike_parentnews/${id_parentnews}`)

    toast.warn('Đã unlike 💔', {
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
      type: PARENTNEWS.ERRORS
    })
  }
}

export const addCommentParentnews =
  (id_parentnews, formData) => async (dispatch) => {
    try {
      const res = await api.put(
        `/parents/add_comment/${id_parentnews}`,
        formData
      )
      dispatch({
        type: PARENTNEWS.UPDATE_PARENTNEWS,
        payload: res.data
      })
      toast.success('Bạn đã gửi comment', {
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
        type: PARENTNEWS.ERRORS
      })
    }
  }

export const deleteCommentParentnews =
  (id_parentnews, idCmt) => async (dispatch) => {
    try {
      const res = await api.put(
        `/parents/delete_comment/${id_parentnews}/${idCmt}`
      )
      dispatch({
        type: PARENTNEWS.UPDATE_PARENTNEWS,
        payload: res.data
      })
      toast.success('Xoá comment thành công', {
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
        type: PARENTNEWS.ERRORS
      })
    }
  }
