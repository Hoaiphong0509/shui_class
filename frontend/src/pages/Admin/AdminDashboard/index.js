import Dashboard from 'components/Admin/Dashboard'

import LoaderComponent from 'components/core/LoaderComponent'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import {
  getAllClassnews,
  getAllClassrooms,
  getAllParentnews,
  getAllUsers
} from 'services/redux/actions/admin'
import s from './styles.module.scss'

const AdminDashboard = ({
  user: { users, loading: ldu },
  classroom: { classrooms, loading: lds },
  classnews: { classnewss, loading: ldcn },
  parentnews: { parentnewss, loading: ldpn },
  getAllUsers,
  getAllClassrooms,
  getAllClassnews,
  getAllParentnews
}) => {
  useEffect(() => {
    getAllUsers()
  }, [getAllUsers])
  useEffect(() => {
    getAllClassrooms()
  }, [getAllClassrooms])
  useEffect(() => {
    getAllClassnews()
  }, [getAllClassnews])
  useEffect(() => {
    getAllParentnews()
  }, [getAllParentnews])

  if (
    lds ||
    ldu ||
    ldcn ||
    ldpn ||
    users === null ||
    users === undefined ||
    classrooms === null ||
    classrooms === undefined ||
    classnewss === null ||
    classnewss === undefined ||
    parentnewss === null ||
    parentnewss === undefined
  )
    return <LoaderComponent />

  return (
    <div className={s.root}>
      <div className={s.content}>
        <Dashboard
          users={users}
          classrooms={classrooms}
          classnewss={classnewss}
          parentnewss={parentnewss}
        />
      </div>
    </div>
  )
}

AdminDashboard.prototype = {
  classroom: PropTypes.object,
  classnews: PropTypes.object,
  parentnews: PropTypes.object,
  user: PropTypes.object,
  getAllUsers: PropTypes.func,
  getAllClassrooms: PropTypes.func,
  getAllClassnews: PropTypes.func,
  getAllParentnews: PropTypes.func
}

const mapStateToProps = (state) => ({
  classroom: state.classroom,
  classnews: state.classnews,
  parentnews: state.parentnews,
  user: state.user
})

export default connect(mapStateToProps, {
  getAllUsers,
  getAllClassrooms,
  getAllClassnews,
  getAllParentnews
})(AdminDashboard)
