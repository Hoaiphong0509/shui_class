import api from 'utils/api'

import { CLASSROOM } from 'constants/AppConstants'

export const getMyClassroom = () => async (dispatch) => {
  try {
    const res = await api.get('/classroom/get_myclassroom')

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

export const getClassroomUserId = (userId) => async (dispatch) => {
  try {
    const res = await api.get(`/classroom/get_classroom_user/${userId}`)

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
