import LoaderComponent from 'components/core/LoaderComponent'
import AddScore from 'components/Competition/AddScore'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { getProfileByUserId } from 'services/redux/actions/profile'
import s from './styles.module.scss'

const AddCompetitionSheet1 = ({
  profile: { profile, loading },
  getProfileByUserId,
  match
}) => {
  useEffect(() => {
    getProfileByUserId(match.params.id_student)
  }, [getProfileByUserId, match])

  if (loading || profile === null || profile === undefined)
    return <LoaderComponent />

  return (
    <div className={s.root}>
      <div className={s.in4}>
        <h1>Thêm Điểm Thi Đua HKI - {profile?.fullName}</h1>
      </div>
      <div className={s.formAddScore}>
        <AddScore
          hk={1}
          idStudent={match.params.id_student}
          studentName={profile?.fullName}
          studentUsername={profile?.username}
        />
      </div>
    </div>
  )
}

AddCompetitionSheet1.prototype = {
  profile: PropTypes.object,
  getProfileByUserId: PropTypes.func
}

const mapStateToProps = (state) => ({
  profile: state.profile
})

export default connect(mapStateToProps, {
  getProfileByUserId
})(AddCompetitionSheet1)
