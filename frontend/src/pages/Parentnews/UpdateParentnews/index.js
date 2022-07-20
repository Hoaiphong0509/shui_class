import LoaderComponent from 'components/core/LoaderComponent'
import UpdateNews from 'components/News/UpdateNews'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { getParentnewsById } from 'services/redux/actions/teacher'
import s from './styles.module.scss'

const UpdateParentnews = ({
  parentnews: { parentnews, loading: ldc },
  getParentnewsById,
  match
}) => {
  useEffect(() => {
    getParentnewsById(match.params.id_parentnews)
  }, [getParentnewsById, match])

  if (ldc || parentnews === null) return <LoaderComponent />

  return (
    <div className={s.root}>
      <div className={s.content}>
        <h3>Cập nhật bản tin phụ huynh</h3>
        <div className={s.formCreate}>
          <UpdateNews asNews="parent" news={parentnews} />
        </div>
      </div>
    </div>
  )
}

UpdateParentnews.prototype = {
  parentnews: PropTypes.object.isRequired,
  getParentnewsById: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  parentnews: state.parentnews
})

export default connect(mapStateToProps, { getParentnewsById })(UpdateParentnews)
