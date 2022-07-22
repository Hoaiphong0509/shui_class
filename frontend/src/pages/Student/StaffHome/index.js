import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import s from './styles.module.scss'

import LoaderComponent from 'components/core/LoaderComponent'
import TableStaffStudent from 'components/Student/TableStaffStudent'
import { getMyClassroom } from 'services/redux/actions/classroom'

const StaffHome = ({ classroom: { classroom, loading }, getMyClassroom }) => {
  useEffect(() => {
    getMyClassroom()
  }, [getMyClassroom])

  if (loading) return <LoaderComponent />
  if (classroom === null || classroom === undefined)
    return <h1>Bạn chưa là Học sinh của lớp nào</h1>

  const { name, students } = classroom

  const studentsData = students?.filter((s) => !s.isDelete)

  return (
    <div className={s.root}>
      <div className={s.teacherContent}>
        <h1 className={s.title}>Lớp {name.toUpperCase()}</h1>
        <div className={s.table}>
          <TableStaffStudent students={studentsData} />
        </div>
      </div>
    </div>
  )
}

StaffHome.prototype = {
  classroom: PropTypes.object,
  getMyClassroom: PropTypes.func
}

const mapStateToProps = (state) => ({
  classroom: state.classroom
})

export default connect(mapStateToProps, { getMyClassroom })(StaffHome)
