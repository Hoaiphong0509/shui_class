import React from 'react'
import LoaderComponent from 'components/core/LoaderComponent'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { getAllUsers } from 'services/redux/actions/admin'

import s from './styles.module.scss'
import UsersList from 'components/Admin/Parents'
import { ROLES } from 'constants/AppConstants'

const ParentsPage = ({ user: { user, users, loading: ldu }, getAllUsers }) => {
  useEffect(() => {
    getAllUsers()
  }, [getAllUsers])


  if (ldu || users === null || users === undefined) return <LoaderComponent />

  const parents = users?.filter((us) => us.roles.includes(ROLES.PARENT))

  return (
    <div className={s.root}>
      <div className={s.content}>
        <UsersList users={parents} allusers={users} me={user} />
      </div>
    </div>
  )
}

ParentsPage.prototype = {
  user: PropTypes.object,
  getAllUsers: PropTypes.func
}

const mapStateToProps = (state) => ({
  user: state.user
})

export default connect(mapStateToProps, {
  getAllUsers
})(ParentsPage)
