import PropTypes from 'prop-types'
import s from './styles.module.scss'

const TabNavItem = ({ id, title, activeTab, setActiveTab }) => {
  const handleClick = () => {
    setActiveTab(id)
  }

  return (
    <li
      onClick={handleClick}
      className={`${s.li} ${activeTab === id ? s.active_tab : null}`}
    >
      {title}
    </li>
  )
}

TabNavItem.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  activeTab: PropTypes.string,
  setActiveTab: PropTypes.func
}

export default TabNavItem
