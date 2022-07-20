import s from './styles.module.scss'

import ParentComponent from 'components/Teacher/ParentComponent'

const ParentsList = () => {
  return (
    <div className={s.root}>
      <ParentComponent />
    </div>
  )
}

export default ParentsList
