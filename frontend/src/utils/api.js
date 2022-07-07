import axios from 'axios'
import store from 'services/store'
import { USERS } from 'constants/AppConstants'

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response.status === 401) {
      store.dispatch({ type: USERS.LOGOUT })
    }
    return Promise.reject(err)
  }
)

export default api
