import LoaderComponent from 'components/core/LoaderComponent'
import ScoreSheet from 'components/Parent/ScoreSheet'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { getScoreByStudent } from 'services/redux/actions/score'
import s from './styles.module.scss'

const ScoreChild = ({
  user: { user, loading: ldu },
  score: { score, loading: lds },
  getScoreByStudent,
  match
}) => {
  useEffect(() => {
    getScoreByStudent(match.params.id_student)
  }, [getScoreByStudent, match])

  if (
    lds ||
    ldu ||
    score === null ||
    score === undefined ||
    user === null ||
    user === undefined
  )
    return <LoaderComponent />

  return (
    <div className={s.root}>
      <ScoreSheet score={score} />
    </div>
  )
}

ScoreChild.prototype = {
  score: PropTypes.object,
  user: PropTypes.object,
  getScoreByStudent: PropTypes.func
}

const mapStateToProps = (state) => ({
  score: state.score,
  user: state.user
})

export default connect(mapStateToProps, {
  getScoreByStudent
})(ScoreChild)
