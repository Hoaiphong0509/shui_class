import UpdateCompetition from 'components/Competition/UpdateCompetition'
import LoaderComponent from 'components/core/LoaderComponent'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getProfileByUserId } from 'services/redux/actions/profile'
import { getScoreByStudent } from 'services/redux/actions/score'
import s from './styles.module.scss'

const UpdateCompetionSheet1 = ({
  profile: { profile, loading: ldp },
  score: { score, loading: ldSc },
  getProfileByUserId,
  getScoreByStudent,
  match
}) => {
  const history = useHistory()
  useEffect(() => {
    getProfileByUserId(match.params.id_student)
  }, [getProfileByUserId, match])

  useEffect(() => {
    getScoreByStudent(match.params.id_student)
  }, [getScoreByStudent, match])

  if (
    ldp ||
    ldSc ||
    profile === null ||
    profile === undefined ||
    score === null ||
    score === undefined
  )
    return <LoaderComponent />

  const tempScoreObj = score?.filter((s) => s.hk === 2)

  return (
    <div className={s.root}>
      {score === null ||
      score === undefined ||
      tempScoreObj === null ||
      tempScoreObj === undefined ||
      tempScoreObj.length === 0 ? (
        <>
          <h1>Học sinh này chưa có điểm HKII</h1>
          <div>
            <Button
              style={{ marginRight: '5px' }}
              variant="secondary"
              onClick={() => history.push('/')}
            >
              Quay lại
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                history.push(`/add_competition_2/${match.params.id_student}`)
              }}
            >
              Thêm điểm thi đua HKI
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className={s.in4}>
            <h1>Cập nhật điểm thi đua HKII - {profile?.fullName}</h1>
          </div>
          <div className={s.formAddCompetition}>
            <UpdateCompetition
              hk={2}
              score={tempScoreObj[0]}
              idStudent={match.params.id_student}
              studentName={profile?.fullName}
              studentUsername={profile?.username}
            />
          </div>
        </>
      )}
    </div>
  )
}

UpdateCompetionSheet1.prototype = {
  profile: PropTypes.object,
  getProfileByUserId: PropTypes.func,
  getScoreByStudent: PropTypes.func
}

const mapStateToProps = (state) => ({
  profile: state.profile,
  score: state.score
})

export default connect(mapStateToProps, {
  getProfileByUserId,
  getScoreByStudent
})(UpdateCompetionSheet1)