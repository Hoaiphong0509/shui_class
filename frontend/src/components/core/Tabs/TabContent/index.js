import React from 'react'
import PropTypes from 'prop-types'

import s from './styles.module.scss'

const TabContent = ({ id, activeTab, children }) => {
  return (
    <div
      className={s.root}
      style={{ display: `${activeTab === id ? 'block' : 'none'}` }}
    >
      {children}
    </div>
  )
}

TabContent.propTypes = {
  id: PropTypes.string,
  activeTab: PropTypes.string
}

export default TabContent
