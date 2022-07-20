import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import s from './styles.module.scss'

import LoaderComponent from 'components/core/LoaderComponent'
import TrashParents from 'components/Teacher/TrashParents'
import { Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { getParentsMyClassroom } from 'services/redux/actions/teacher'

const TrashParent = ({
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

  const { parents } = classroom

  const parentsData = parents.filter((s) => s.isDelete)

  return (
    <div className={s.root}>
      <div className={s.container}>
        <h1 className={s.title}>Phụ huynh ĐÃ XOÁ</h1>
        <div className={s.table}>
          <TrashParents
            idClassroom={classroom._id.toString()}
            parents={parentsData}
          />
        </div>
        <div className={s.buttonArea}>
          <Button onClick={() => history.push('/')} variant="secondary">
            Quay lại
          </Button>
        </div>
      </div>
    </div>
  )
}

TrashParent.prototype = {
  classroom: PropTypes.object,
  getParentsMyClassroom: PropTypes.func
}

const mapStateToProps = (state) => ({
  classroom: state.classroom
})

export default connect(mapStateToProps, { getParentsMyClassroom })(TrashParent)
