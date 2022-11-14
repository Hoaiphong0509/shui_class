import React from 'react'
import LoaderComponent from 'components/core/LoaderComponent'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { getAllUsers } from 'services/redux/actions/admin'

import s from './styles.module.scss'
import UsersList from 'components/Admin/Admins'
import { ROLES } from '../../../constants/AppConstants'

const AdminsPage = ({ user: { user, users, loading: ldu }, getAllUsers }) => {
  useEffect(() => {
    getAllUsers()
  }, [getAllUsers])
  if (
    ldu ||
    user === null ||
    user === undefined ||
    users === null ||
    users === undefined
  )
    return <LoaderComponent />

  const admins = users?.filter((us) => us.roles.includes(ROLES.ADMIN))
  return (
    <div className={s.root}>
      <div className={s.content}>
        <UsersList users={admins} allusers={users} me={user}/>
      </div>
    </div>
  )
}

AdminsPage.prototype = {
  user: PropTypes.object,
  getAllUsers: PropTypes.func
}

const mapStateToProps = (state) => ({
  user: state.user
})

export default connect(mapStateToProps, {
  getAllUsers
})(AdminsPage)
