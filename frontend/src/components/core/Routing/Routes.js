import { Switch } from 'react-router-dom'

import DefaultLayout from 'layout/DefaultLayout'
import Home from 'pages/Home'
import PrivateRoute from './PrivateRoute'

import BlankLayout from 'layout/BlankLayout'
import NotFoundPage from 'pages/NotFoundPage'
import Login from 'pages/Login'
import Route from './Route'

const Routes = () => {
  return (
    <section className='container'>
      <Switch>
        <PrivateRoute exact path='/' layout={DefaultLayout} component={Home} />
        <Route exact path='/login' layout={BlankLayout} component={Login} />
        <PrivateRoute component={NotFoundPage} layout={DefaultLayout} />
      </Switch>
    </section>
  )
}

export default Routes
