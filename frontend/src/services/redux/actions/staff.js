import api from 'utils/api'

import { STAFF } from 'constants/AppConstants'

export const getStaffs = () => async (dispatch) => {
  try {
    const res = await api.get('/staff')

    dispatch({
      type: STAFF.GET_STAFFS,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: STAFF.ERRORS
    })
  }
}
