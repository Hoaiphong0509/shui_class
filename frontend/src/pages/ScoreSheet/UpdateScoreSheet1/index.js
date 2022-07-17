import LoaderComponent from 'components/core/LoaderComponent'
import UpdateScore from 'components/Score/UpdateScore'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getProfileByUserId } from 'services/redux/actions/profile'
import { getScoreByStudent } from 'services/redux/actions/score'
import s from './styles.module.scss'

const UpdateScoreSheet1 = ({
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
  const tempScoreObj = score?.filter((s) => s.hk === 1)

  return (
    <div className={s.root}>
      {score === null ||
      score === undefined ||
      tempScoreObj === null ||
      tempScoreObj === undefined ||
      tempScoreObj.length === 0 ? (
        <>
          <h1>Học sinh này chưa có điểm HKI</h1>
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
                history.push(`/add_score_1/${match.params.id_student}`)
              }}
            >
              Thêm điểm HKI
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className={s.in4}>
            <h1>Cập nhật điểm HKI - {profile?.fullName}</h1>
          </div>
          <div className={s.formAddScore}>
            <UpdateScore
              hk={1}
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

UpdateScoreSheet1.prototype = {
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
})(UpdateScoreSheet1)
