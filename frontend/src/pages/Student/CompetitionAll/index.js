import LoaderComponent from 'components/core/LoaderComponent'
import CompetitionComponent from 'components/DetailsIn4StudentComponent/CompetitionComponent'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { getCompetitionByStudent } from 'services/redux/actions/competition'
import s from './styles.module.scss'
import { useHistory } from 'react-router-dom'

const CompetitionAll = ({
  user: { user, loading: ldu },
  competition: { competitions, loading: ldc },
  getCompetitionByStudent,
  match
}) => {
  const history = useHistory()
  useEffect(() => {
    getCompetitionByStudent(match.params.id_student)
  }, [getCompetitionByStudent, match])
  if (ldc || ldu || user === null || competitions === null)
    return <LoaderComponent />
  return (
    <div className={s.root}>
      <div className={s.scorePanel}>
        {competitions && competitions.length > 0 ? (
          <>
            <CompetitionComponent competitions={competitions} />
            <div className={s.btn}>
              <Button variant="secondary" onClick={() => history.goBack()}>
                Quay lại
              </Button>
            </div>
          </>
        ) : (
          <>
            <h2>Chưa có điểm thi đua</h2>
            <div className={s.btn}>
              <Button
                variant="secondary"
                onClick={() => history.goBack()}
                style={{ display: 'flex', justifyContent: 'flex-start' }}
              >
                Quay lại
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

CompetitionAll.prototype = {
  user: PropTypes.object,
  competitions: PropTypes.object,
  getProfileByUserId: PropTypes.func,
  getCompetitionByStudent: PropTypes.func
}

const mapStateToProps = (state) => ({
  user: state.user,
  competition: state.competition
})

export default connect(mapStateToProps, {
  getCompetitionByStudent
})(CompetitionAll)
