import LoaderComponent from 'components/core/LoaderComponent'
import CompetitionSheet from 'components/Parent/CompetitionSheet'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { getCompetitionByStudent } from 'services/redux/actions/competition'
import s from './styles.module.scss'

const CompetitionChild = ({
  user: { user, loading: ldu },
  competition: { competition, loading: lds },
  getCompetitionByStudent,
  match
}) => {
  useEffect(() => {
    getCompetitionByStudent(match.params.id_student)
  }, [getCompetitionByStudent, match])

  if (
    lds ||
    ldu ||
    competition === null ||
    competition === undefined ||
    user === null ||
    user === undefined
  )
    return <LoaderComponent />

  return (
    <div className={s.root}>
      <CompetitionSheet competition={competition} />
    </div>
  )
}

CompetitionChild.prototype = {
  competition: PropTypes.object,
  user: PropTypes.object,
  getCompetitionByStudent: PropTypes.func
}

const mapStateToProps = (state) => ({
  competition: state.competition,
  user: state.user
})

export default connect(mapStateToProps, {
  getCompetitionByStudent
})(CompetitionChild)
