import api from 'utils/api'

import { NOTIFY } from 'constants/AppConstants'
import { toast } from 'react-toastify'

export const getMyNotifies = () => async (dispatch) => {
  try {
    const res = await api.get('/notify/me')

    dispatch({
      type: NOTIFY.GET_NOTIFIES,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: NOTIFY.ERRORS
    })
  }
}

export const deleteNotify = (idNoty) => async (dispatch) => {
  try {
    await api.put(`/notify/delete_notify/${idNoty}`)
    dispatch({
      type: NOTIFY.DELETE_NOTIFY,
      payload: idNoty
    })
    toast.success('Xoá thông báo thành công', {
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
      type: NOTIFY.ERRORS
    })
  }
}
