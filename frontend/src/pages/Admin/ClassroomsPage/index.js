import ClassromsList from 'components/Admin/Classroms/ClassromsList'
import LoaderComponent from 'components/core/LoaderComponent'
import { ROLES } from 'constants/AppConstants'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { getAllClassrooms, getAllUsers } from 'services/redux/actions/admin'
import s from './styles.module.scss'

const ClassroomsPage = ({
  user: { user, users, loading: ldu },
  classroom: { classrooms, loading: lds },
  getAllClassrooms,
  getAllUsers
}) => {
  useEffect(() => {
    getAllClassrooms()
  }, [getAllClassrooms])
  useEffect(() => {
    getAllUsers()
  }, [getAllUsers])

  if (
    lds ||
    ldu ||
    user === null ||
    user === undefined ||
    users === null ||
    users === undefined ||
    classrooms === null ||
    classrooms === undefined
  )
    return <LoaderComponent />
  const teachers = users?.filter((us) => us.roles.includes(ROLES.TEACHER))
  return (
    <div className={s.root}>
      <div className={s.content}>
        <ClassromsList
          classrooms={classrooms}
          teachers={teachers}
          allusers={users}
          me={user}
        />
      </div>
    </div>
  )
}

ClassroomsPage.prototype = {
  classroom: PropTypes.object,
  user: PropTypes.object,
  getAllClassrooms: PropTypes.func,
  getAllUsers: PropTypes.func
}

const mapStateToProps = (state) => ({
  classroom: state.classroom,
  user: state.user
})

export default connect(mapStateToProps, {
  getAllClassrooms,
  getAllUsers
})(ClassroomsPage)
