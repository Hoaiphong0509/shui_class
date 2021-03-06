import api from 'utils/api'

import {
  CLASSNEWS,
  CLASSROOM,
  PARENTIN4,
  PARENTNEWS
} from 'constants/AppConstants'
import { toast } from 'react-toastify'

export const getStudentsMyClassroom = () => async (dispatch) => {
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

export const getParentsMyClassroom = () => async (dispatch) => {
  try {
    const res = await api.get('/teacher/get_parent_myclassroom')

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

export const getParentsIn4ById = (idParent) => async (dispatch) => {
  try {
    const res = await api.get(`/parents/${idParent}`)

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

export const addStudent = (idClassroom, formData) => async (dispatch) => {
  try {
    await api.put(`/teacher/add_student/${idClassroom}`, formData)

    dispatch(getStudentsMyClassroom())
    toast.success('Thêm học sinh vào lớp học thành công!', {
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
      type: CLASSROOM.ERRORS
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

export const updateStudent = (idStudent, formData) => async (dispatch) => {
  try {
    await api.put(`/teacher/update_student/${idStudent}`, formData)

    toast.success('Cập nhật học sinh thành công!', {
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
      type: CLASSROOM.ERRORS
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

export const moveStudentToTrash =
  (idClassroom, idStudent) => async (dispatch) => {
    try {
      await api.put(
        `/teacher/move_student_to_trash/${idClassroom}/${idStudent}`
      )
      dispatch(getStudentsMyClassroom())
      toast.success('Xoá học sinh vào thùng rác thành công!', {
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
        type: CLASSROOM.ERRORS
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

export const restoreStudent = (idClassroom, idStudent) => async (dispatch) => {
  try {
    await api.put(`/teacher/restore_student/${idClassroom}/${idStudent}`)

    dispatch(getStudentsMyClassroom())
    toast.success('Khôi phục học sinh thành công!', {
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
      type: CLASSROOM.ERRORS
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

export const deleteStudent = (idClassroom, idStudent) => async (dispatch) => {
  try {
    await api.put(`/teacher/delete_student/${idClassroom}/${idStudent}`)
    dispatch(getStudentsMyClassroom())
    toast.success('Xoá học sinh vĩnh viễn thành công!', {
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

export const addParent = (idClassroom, formData) => async (dispatch) => {
  try {
    const res = await api.put(`/teacher/add_parent/${idClassroom}`, formData)

    dispatch({
      type: CLASSROOM.UPDATE_CLASSROOM,
      payload: res.data
    })
    toast.success('Thêm phụ huynh vào lớp học thành công!', {
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

export const moveParentToTrash =
  (idClassroom, idParent) => async (dispatch) => {
    try {
      const res = await api.put(
        `/teacher/move_parent_to_trash/${idClassroom}/${idParent}`
      )
      dispatch({
        type: CLASSROOM.UPDATE_CLASSROOM,
        payload: res.data
      })
      toast.success('Xoá phụ huynh vào thùng rác thành công!', {
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

export const restoreParent = (idClassroom, idParent) => async (dispatch) => {
  try {
    const res = await api.put(
      `/teacher/restore_parent/${idClassroom}/${idParent}`
    )

    dispatch({
      type: CLASSROOM.UPDATE_CLASSROOM,
      payload: res.data
    })
    toast.success('Khôi phục phụ huynh thành công!', {
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

export const deleteParent = (idClassroom, idParent) => async (dispatch) => {
  try {
    const res = await api.put(
      `/teacher/delete_parent/${idClassroom}/${idParent}`
    )

    dispatch({
      type: CLASSROOM.UPDATE_CLASSROOM,
      payload: res.data
    })
    toast.success('Xoá phụ huynh vĩnh viễn thành công!', {
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

export const getClassnewsById = (idClassnews) => async (dispatch) => {
  try {
    const res = await api.get(`/teacher/get_classnews/${idClassnews}`)

    dispatch({
      type: CLASSNEWS.GET_CLASSNEWS,
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

export const getParentnews = () => async (dispatch) => {
  try {
    const res = await api.get(`/teacher/get_myparentnews`)

    dispatch({
      type: PARENTNEWS.GET_PARENTNEWSS,
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

export const addChildren = (formData, idParent) => async (dispatch) => {
  try {
    await api.put(`/teacher/add_children/${idParent}`, formData)
    toast.success('Thêm học sinh thành công', {
      position: 'top-right',
      autoClose: 1200,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    })
    dispatch({
      type: PARENTIN4.UPDATE_PARENTIN4
    })
    dispatch(getParentsIn4ById(idParent))
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

export const removeChildren = (idParent, idStudent) => async (dispatch) => {
  try {
    await api.put(`/teacher/remove_student/${idParent}/${idStudent}`)
    toast.success('Xoá học sinh thành công', {
      position: 'top-right',
      autoClose: 1200,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    })
    dispatch({
      type: PARENTIN4.UPDATE_PARENTIN4
    })
    dispatch(getParentsIn4ById(idParent))
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

export const addClassnews = (formData) => async (dispatch) => {
  try {
    const res = await api.post(`/teacher/add_classnews`, formData)

    dispatch({
      type: CLASSNEWS.ADD_CLASSNEWS,
      payload: res.data
    })
    toast.success('Thêm bản tin lớp thành công!', {
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

export const updateClassnews = (idnews, formData) => async (dispatch) => {
  try {
    const res = await api.put(`/teacher/update_classnews/${idnews}`, formData)

    dispatch({
      type: CLASSNEWS.UPDATE_CLASSNEWS,
      payload: res.data
    })
    toast.success('Cập nhật bản tin lớp thành công!', {
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

export const addParentnews = (formData) => async (dispatch) => {
  try {
    const res = await api.post(`/teacher/add_parentnews`, formData)
    dispatch({
      type: PARENTNEWS.ADD_PARENTNEWS,
      payload: res.data
    })
    toast.success('Thêm bản tin phụ huynh thành công!', {
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

export const updateParentnews = (idnews, formData) => async (dispatch) => {
  try {
    const res = await api.put(`/teacher/update_parentnews/${idnews}`, formData)

    dispatch({
      type: PARENTNEWS.UPDATE_PARENTNEWS,
      payload: res.data
    })
    toast.success('Cập nhật bản tin lớp thành công!', {
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

export const deleteClassnews = (idClassnews) => async (dispatch) => {
  try {
    await api.delete(`/teacher/delete_classnews/${idClassnews}`)

    dispatch({
      type: CLASSNEWS.DELETE_CLASSNEWS,
      payload: idClassnews
    })
    toast.success('Xoá bản tin thành công!', {
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

export const deleteParentnews = (idParentnews) => async (dispatch) => {
  try {
    await api.delete(`/teacher/delete_parentnews/${idParentnews}`)

    dispatch({
      type: PARENTNEWS.DELETE_PARENTNEWS,
      payload: idParentnews
    })
    toast.success('Xoá bản tin thành công!', {
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
