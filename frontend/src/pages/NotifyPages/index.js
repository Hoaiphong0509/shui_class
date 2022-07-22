import LoaderComponent from 'components/core/LoaderComponent'
import NotifyList from 'components/NotifyComponent/NotifyList'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { getMyNotifies } from 'services/redux/actions/notify'
import s from './styles.module.scss'

const NotifyPages = ({ notify: { notifies, loading: ldn }, getMyNotifies }) => {
  useEffect(() => {
    getMyNotifies()
  }, [getMyNotifies])

  if (ldn || notifies === null || notifies === undefined)
    return <LoaderComponent />

  return (
    <div className={s.root}>
      <div className={s.content}>
        <h3>Thông báo</h3>
        <NotifyList notifies={notifies} />
      </div>
    </div>
  )
}

NotifyPages.prototype = {
  notify: PropTypes.object,
  getMyNotifies: PropTypes.func
}

const mapStateToProps = (state) => ({
  notify: state.notify
})

export default connect(mapStateToProps, {
  getMyNotifies
})(NotifyPages)
