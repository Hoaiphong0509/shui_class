import api from './api'

const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common = { Authorization: `Bearer ${token}` }
    localStorage.setItem('token', token)
  } else {
    delete api.defaults.headers.common
    localStorage.removeItem('token')
  }
}

export default setAuthToken
