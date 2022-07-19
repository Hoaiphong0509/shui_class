import TabContent from 'components/core/Tabs/TabContent'
import TabNavItem from 'components/core/Tabs/TabNavItem'
import TableScore from 'components/Score/TableScore'
import { useState } from 'react'
import TotalScore from '../TotalScore'
import s from './styles.module.scss'
const ScoreSheet = ({ score }) => {
  const [activeTab, setActiveTab] = useState('tab1')
  // console.log('score', score)

  const tempScore1Obj = score?.filter((s) => s.hk === 1)
  const tempScore2Obj = score?.filter((s) => s.hk === 2)

  return (
    <div className={s.root}>
      <div className={s.content}>
        <h3 className={s.title}>Kết quả học tập</h3>
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
              {tempScore1Obj[0] === null ||
              tempScore1Obj[0] === undefined ||
              tempScore1Obj.length === 0 ? (
                <h3>Chưa có điểm HKI</h3>
              ) : (
                <TableScore score={tempScore1Obj[0]} />
              )}
            </TabContent>
            <TabContent id="tab2" activeTab={activeTab}>
              {tempScore2Obj[0] === null ||
              tempScore2Obj[0] === undefined ||
              tempScore2Obj.length === 0 ? (
                <h3>Chưa có điểm HKII</h3>
              ) : (
                <TableScore score={tempScore2Obj[0]} />
              )}
            </TabContent>
            <TabContent id="tab3" activeTab={activeTab}>
              <TotalScore score={score} />
            </TabContent>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ScoreSheet
