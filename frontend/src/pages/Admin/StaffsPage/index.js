
import StaffsList from 'components/Admin/Staff/StaffsList'
import LoaderComponent from 'components/core/LoaderComponent'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { getStaffs } from 'services/redux/actions/admin'
import s from './styles.module.scss'

const StaffsPage = ({ staff: { staffs, loading: lds }, getStaffs }) => {
  useEffect(() => {
    getStaffs()
  }, [getStaffs])

  if (lds || staffs === null || staffs === undefined) return <LoaderComponent />
  return (
    <div className={s.root}>
      <div className={s.content}>
        <StaffsList staffs={staffs} />
      </div>
    </div>
  )
}

StaffsPage.prototype = {
  staff: PropTypes.object,
  getStaffs: PropTypes.func
}

const mapStateToProps = (state) => ({
  staff: state.staff
})

export default connect(mapStateToProps, {
  getStaffs
})(StaffsPage)
