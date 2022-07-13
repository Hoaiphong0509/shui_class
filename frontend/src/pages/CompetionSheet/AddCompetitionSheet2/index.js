import AddCompetition from 'components/Competition/AddCompetition'
import LoaderComponent from 'components/core/LoaderComponent'
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
        <h1>Thêm Điểm thi đua HKII - {profile?.fullName}</h1>
      </div>
      <div className={s.formAddCompetition}>
        <AddCompetition
          hk={2}
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
