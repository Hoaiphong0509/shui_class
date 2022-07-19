import LoaderComponent from 'components/core/LoaderComponent'
import UpdateNews from 'components/News/UpdateNews'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { getClassnewsById } from 'services/redux/actions/teacher'
import s from './styles.module.scss'

const UpdateClassnews = ({
  classnews: { classnews, loading: ldc },
  getClassnewsById,
  match
}) => {
  useEffect(() => {
    getClassnewsById(match.params.id_classnews)
  }, [getClassnewsById, match])

  if (ldc || classnews === null) return <LoaderComponent />

  return (
    <div className={s.root}>
      <div className={s.content}>
        <h3>Cập nhật bản tin lớp học</h3>
        <div className={s.formCreate}>
          <UpdateNews asNews="class" news={classnews} />
        </div>
      </div>
    </div>
  )
}

UpdateClassnews.prototype = {
  classnews: PropTypes.object.isRequired,
  getClassnewsById: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  classnews: state.classnews
})

export default connect(mapStateToProps, { getClassnewsById })(UpdateClassnews)
