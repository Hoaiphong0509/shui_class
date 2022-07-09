import api from 'utils/api'

import { STUDENT } from 'constants/AppConstants'

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
