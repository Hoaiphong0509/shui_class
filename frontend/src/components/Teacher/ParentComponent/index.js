import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import s from './styles.module.scss'

import LoaderComponent from 'components/core/LoaderComponent'
import { useHistory } from 'react-router-dom'
import { getParentsMyClassroom } from 'services/redux/actions/teacher'
import TableParents from './TableParents'

const ParentComponent = ({
  classroom: { classroom, loading },
  getParentsMyClassroom
}) => {
  const history = useHistory()

  useEffect(() => {
    getParentsMyClassroom()
  }, [getParentsMyClassroom])

  if (loading) return <LoaderComponent />
  if (classroom === null)
    return <h1>Bạn chưa là giáo viên chủ nhiệm của lớp nào</h1>

  const { name, parents } = classroom

  const parentsData = parents.filter((s) => !s.isDelete)

  return (
    <div className={s.root}>
      <div className={s.teacherContent}>
        <h1 className={s.title}>Phụ huynh Lớp {name.toUpperCase()}</h1>
        <div className={s.buttonArea}>
          <Button onClick={() => history.push('/createParent')} variant="info">
            Thêm mới
          </Button>
          <Button
            onClick={() => history.push('/trashParent')}
            variant="secondary"
          >
            Thùng rác
          </Button>
        </div>
        <div className={s.table}>
          <TableParents
            idClassroom={classroom._id.toString()}
            parents={parentsData}
          />
        </div>
      </div>
    </div>
  )
}

ParentComponent.prototype = {
  classroom: PropTypes.object,
  getParentsMyClassroom: PropTypes.func
}

const mapStateToProps = (state) => ({
  classroom: state.classroom
})

export default connect(mapStateToProps, { getParentsMyClassroom })(
  ParentComponent
)
