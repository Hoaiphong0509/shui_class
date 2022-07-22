import React from 'react'
import NotifyItem from '../NotifyItem'
import s from './styles.module.scss'

const NotifyList = ({ notifies }) => {
  return (
    <div className={s.root}>
      {notifies.map((n, idx) => (
        <div key={idx} className={s.item}>
          <NotifyItem notify={n} />
        </div>
      ))}
    </div>
  )
}

export default NotifyList
