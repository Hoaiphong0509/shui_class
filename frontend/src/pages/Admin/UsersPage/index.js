import React from 'react'
import LoaderComponent from 'components/core/LoaderComponent'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { getAllUsers } from 'services/redux/actions/admin'

import s from './styles.module.scss'
import UsersList from 'components/Admin/Users'
import { ROLES } from '../../../constants/AppConstants'

const UsersPage = ({ user: { users, loading: ldu }, getAllUsers }) => {
  useEffect(() => {
    getAllUsers()
  }, [getAllUsers])
  if (ldu || users === null || users === undefined) return <LoaderComponent />
  const guest = users?.filter((us) => us.roles.includes(ROLES.GUEST))
  return (
    <div className={s.root}>
      <div className={s.content}>
        <UsersList users={guest}/>
      </div>
    </div>
  )
}

UsersPage.prototype = {
  user: PropTypes.object,
  getAllUsers: PropTypes.func
}

const mapStateToProps = (state) => ({
  user: state.user
})

export default connect(mapStateToProps, {
  getAllUsers
})(UsersPage)
