import { configureStore, applyMiddleware } from '@reduxjs/toolkit'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import setAuthToken from 'utils/setAuthToken'
import rootReducer from '../redux/reducers'

const middleware = [thunk]

const store = configureStore(
  {
    reducer: rootReducer,
  },
  composeWithDevTools(applyMiddleware(...middleware))
)

let currentState = store.getState()

store.subscribe(() => {
  let previousState = currentState
  currentState = store.getState()

  if (previousState.user.token !== currentState.user.token) {
    const token = currentState.user.token
    setAuthToken(token)
  }
})

export default store
