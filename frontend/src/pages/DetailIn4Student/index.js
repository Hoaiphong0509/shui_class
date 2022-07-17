import TabContent from 'components/core/Tabs/TabContent'
import TabNavItem from 'components/core/Tabs/TabNavItem'
import { useState } from 'react'
import s from './styles.module.scss'

import LoaderComponent from 'components/core/LoaderComponent'
import Competition from 'components/DetailsIn4StudentComponent/Competition'
import General from 'components/DetailsIn4StudentComponent/General'
import Score from 'components/DetailsIn4StudentComponent/Score'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { getClassroomUserId } from 'services/redux/actions/classroom'
import { getCompetitionByStudent } from 'services/redux/actions/competition'
import { getProfileByUserId } from 'services/redux/actions/profile'
import { getScoreByStudent } from 'services/redux/actions/score'

const DetailIn4Student = ({
  profile: { profile, loading: ldp },
  user: { user, loading: ldu },
  classroom: { classroom, loading: ldcl },
  competition: { competition, loading: ldc },
  score: { score, loading: lds },
  getProfileByUserId,
  getClassroomUserId,
  getScoreByStudent,
  getCompetitionByStudent,
  match
}) => {
  useEffect(() => {
    getProfileByUserId(match.params.id_student)
  }, [getProfileByUserId, match])
  useEffect(() => {
    getClassroomUserId(match.params.id_student)
  }, [getClassroomUserId, match])
  useEffect(() => {
    getScoreByStudent(match.params.id_student)
  }, [getScoreByStudent, match])
  useEffect(() => {
    getCompetitionByStudent(match.params.id_student)
  }, [getCompetitionByStudent, match])

  const [activeTab, setActiveTab] = useState('tab1')

  if (
    ldc ||
    lds ||
    ldp ||
    ldu ||
    ldcl ||
    user === null ||
    profile === null ||
    classroom === null ||
    score === null ||
    competition === null
  )
    return <LoaderComponent />

  return (
    <div className={s.root}>
      <div className={s.content}>
        <ul className={s.tabs}>
          <TabNavItem
            title="Thông tin"
            id="tab1"
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <TabNavItem
            title="Học tập"
            id="tab2"
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <TabNavItem
            title="Thi đua"
            id="tab3"
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </ul>
        <div className={s.tabsContent}>
          <TabContent id="tab1" activeTab={activeTab}>
            <General profile={profile} classroom={classroom} user={user} />
          </TabContent>
          <TabContent id="tab2" activeTab={activeTab}>
            <Score score={score} studentId={profile.user} />
          </TabContent>
          <TabContent id="tab3" activeTab={activeTab}>
            <Competition competition={competition} studentId={profile.user} />
          </TabContent>
        </div>
      </div>
    </div>
  )
}

DetailIn4Student.prototype = {
  user: PropTypes.object,
  profile: PropTypes.object,
  score: PropTypes.object,
  classroom: PropTypes.object,
  competition: PropTypes.object,
  getProfileByUserId: PropTypes.func,
  getClassroomUserId: PropTypes.func,
  getScoreByStudent: PropTypes.func,
  getCompetitionByStudent: PropTypes.func
}

const mapStateToProps = (state) => ({
  profile: state.profile,
  user: state.profile,
  classroom: state.classroom,
  score: state.score,
  competition: state.competition
})

export default connect(mapStateToProps, {
  getProfileByUserId,
  getClassroomUserId,
  getScoreByStudent,
  getCompetitionByStudent
})(DetailIn4Student)
