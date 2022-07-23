import api from 'utils/api'

import {
  CLASSNEWS,
  CLASSROOM,
  PARENTNEWS,
  STAFF,
  USERS
} from 'constants/AppConstants'
import { toast } from 'react-toastify'

export const getAllUsers = () => async (dispatch) => {
  try {
    const res = await api.get('/admin/users')

    dispatch({
      type: USERS.GET_USERS,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: USERS.ERRORS
    })
  }
}

export const getAllTeachers = () => async (dispatch) => {
  try {
    const res = await api.get('/admin/teacher')

    dispatch({
      type: USERS.GET_USERS,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: USERS.ERRORS
    })
  }
}
export const getAllParents = () => async (dispatch) => {
  try {
    const res = await api.get('/admin/parent')

    dispatch({
      type: USERS.GET_USERS,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: USERS.ERRORS
    })
  }
}

export const getAllClassrooms = () => async (dispatch) => {
  try {
    const res = await api.get('/classroom')

    dispatch({
      type: CLASSROOM.GET_CLASSROOMS,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: USERS.ERRORS
    })
  }
}

export const getAllClassnews = () => async (dispatch) => {
  try {
    const res = await api.get('/admin/classnews')

    dispatch({
      type: CLASSNEWS.GET_CLASSNEWSS,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: CLASSNEWS.ERRORS
    })
  }
}
export const getAllParentnews = () => async (dispatch) => {
  try {
    const res = await api.get('/admin/parentnews')

    dispatch({
      type: PARENTNEWS.GET_PARENTNEWSS,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: PARENTNEWS.ERRORS
    })
  }
}

export const addTeacher = (formData) => async (dispatch) => {
  try {
    await api.put('/admin/add_teacher', formData)
    dispatch(getAllTeachers())
    toast.success('Thêm giáo viên thành công', {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    })
  } catch (err) {
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

export const addParent = (formData) => async (dispatch) => {
  try {
    await api.put('/admin/add_parent', formData)
    dispatch(getAllParents())
    toast.success('Thêm phụ huynh thành công', {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    })
  } catch (err) {
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

export const addClassroom = (formData) => async (dispatch) => {
  try {
    const res = await api.post('/classroom', formData)
    dispatch({
      type: CLASSROOM.ADD_CLASSROOM,
      payload: res.data
    })
    toast.success('Thêm lớp học thành công', {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    })
  } catch (err) {
    console.log('err', err)
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

export const addTeacherIntoClass =
  (idClassroom, formData) => async (dispatch) => {
    try {
      await api.put(`/admin/add_teacher_into_class/${idClassroom}`, formData)
      dispatch(getAllClassrooms())
      toast.success('Thêm lớp GVCN thành công', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      })
    } catch (err) {
      console.log('err', err)
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

export const removeTeacherOutoClass = (idClassroom) => async (dispatch) => {
  try {
    await api.put(`/admin/remove_teacher_outo_class/${idClassroom}`)
    dispatch(getAllClassrooms())
    toast.success('Xoá GVCN thành công', {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    })
  } catch (err) {
    console.log('err', err)
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

export const getStaffs = () => async (dispatch) => {
  try {
    const res = await api.get(`/staff`)
    dispatch({
      type: STAFF.GET_STAFFS,
      payload: res.data
    })
  } catch (err) {
    console.log('err', err)
    dispatch({
      type: STAFF.ERRORS
    })
  }
}

export const addStaff = (formData) => async (dispatch) => {
  try {
    const res = await api.post(`/staff`, formData)
    dispatch({
      type: STAFF.ADD_STAFF,
      payload: res.data
    })
    toast.success('Thêm chức vụ ban cán sự thành công', {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    })
  } catch (err) {
    console.log('err', err)
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

export const editStaff = (idStaff, formData) => async (dispatch) => {
  try {
    const res = await api.put(`/staff/edit/${idStaff}`, formData)
    dispatch({
      type: STAFF.UPDATE_STAFF,
      payload: res.data
    })
    dispatch(getStaffs())
    toast.success('Chỉnh sửa chức vụ ban cán sự thành công', {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    })
  } catch (err) {
    console.log('err', err)
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

export const deleteStaff = (idStaff) => async (dispatch) => {
  try {
    await api.delete(`/staff/${idStaff}`)
    dispatch({
      type: STAFF.DELETE_STAFF,
      payload: idStaff
    })
    toast.success('Xoá chức vụ ban cán sự thành công', {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    })
  } catch (err) {
    console.log('err', err)
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
