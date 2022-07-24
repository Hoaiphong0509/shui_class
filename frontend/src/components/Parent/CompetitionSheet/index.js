import TableCompetition from 'components/Competition/TableCompetition'
import TabContent from 'components/core/Tabs/TabContent'
import TabNavItem from 'components/core/Tabs/TabNavItem'
import { useState } from 'react'
import TotalCompetition from '../TotalCompetition'
import s from './styles.module.scss'

const CompetitionSheet = ({ competition }) => {
  const [activeTab, setActiveTab] = useState('tab1')

  const tempCompetition1Obj = competition?.filter((s) => s.hk === 1)
  const tempCompetition2Obj = competition?.filter((s) => s.hk === 2)

  return (
    <div className={s.root}>
      <div className={s.content}>
        <h3 className={s.title}>Kết quả thi đua</h3>
        <div className={s.tabScore}>
          <ul className={s.tabs}>
            <TabNavItem
              title="Điểm HKI"
              id="tab1"
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
            <TabNavItem
              title="Điểm HKII"
              id="tab2"
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
            <TabNavItem
              title="Cả năm"
              id="tab3"
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </ul>
          <div className={s.tabsContent}>
            <TabContent id="tab1" activeTab={activeTab}>
              {tempCompetition1Obj[0] === null ||
              tempCompetition1Obj[0] === undefined ||
              tempCompetition1Obj.length === 0 ? (
                <h3>Chưa có điểm thi đua HKI</h3>
              ) : (
                <TableCompetition dataCompetitions={tempCompetition1Obj[0]} />
              )}
            </TabContent>
            <TabContent id="tab2" activeTab={activeTab}>
              {tempCompetition2Obj[0] === null ||
              tempCompetition2Obj[0] === undefined ||
              tempCompetition2Obj.length === 0 ? (
                <h3>Chưa có điểm thi đua HKII</h3>
              ) : (
                <TableCompetition dataCompetitions={tempCompetition2Obj[0]} />
              )}
            </TabContent>
            <TabContent id="tab3" activeTab={activeTab}>
              <TotalCompetition competition={competition} />
            </TabContent>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CompetitionSheet
