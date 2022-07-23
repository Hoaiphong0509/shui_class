import ChildrenComponent from 'components/ChildrenComponent'
import LoaderComponent from 'components/core/LoaderComponent'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { getMyParentIn4 } from 'services/redux/actions/parent'

const ChildrenPage = ({
  parentIn4: { parentIn4, loading },
  getMyParentIn4
}) => {
  useEffect(() => {
    getMyParentIn4()
  }, [getMyParentIn4])

  if (parentIn4 === null || parentIn4 === undefined)
    return <h1>Bạn chưa được thêm vào lớp nào vào có học sinh nào.</h1>

  if (loading) return <LoaderComponent />

  return <ChildrenComponent parentIn4={parentIn4} />
}

ChildrenPage.prototype = {
  parentIn4: PropTypes.object,
  getMyParentIn4: PropTypes.func
}

const mapStateToProps = (state) => ({
  parentIn4: state.parentIn4
})

export default connect(mapStateToProps, {
  getMyParentIn4
})(ChildrenPage)
