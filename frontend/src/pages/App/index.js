import Route from 'components/core/Routing/Route'
import Routes from 'components/core/Routing/Routes'
import { USERS } from 'constants/AppConstants'
import 'devextreme/dist/css/dx.light.css'
import { Fragment, useEffect } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { loadUser } from 'services/redux/actions/user'
import store from 'services/store'
import { isServer } from 'utils/AppUltils'
import setAuthToken from 'utils/setAuthToken'

const App = () => {
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token)
    }
    store.dispatch(loadUser())

    if (isServer)
      window.addEventListener('storage', () => {
        if (!localStorage.token) store.dispatch({ type: USERS.LOGOUT })
      })
  }, [])

  return (
    <Provider store={store}>
      <Router basename="/">
        <Fragment>
          <Route component={Routes} />
        </Fragment>
      </Router>
      <ToastContainer autoClose="5000" />
    </Provider>
  )
}

export default App
