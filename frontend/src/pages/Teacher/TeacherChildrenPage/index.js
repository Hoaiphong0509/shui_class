import ChildrenComponent from 'components/ChildrenComponent'
import LoaderComponent from 'components/core/LoaderComponent'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { getParentsIn4ById } from 'services/redux/actions/teacher'

const TeacherChildrenPage = ({
  parentIn4: { parentIn4, loading },
  getParentsIn4ById,
  match
}) => {
  useEffect(() => {
    getParentsIn4ById(match.params.id_parent)
  }, [getParentsIn4ById,match])

  if (loading || parentIn4 === null || parentIn4 === undefined)
    return <LoaderComponent />

  return <ChildrenComponent parentIn4={parentIn4} />
}

TeacherChildrenPage.prototype = {
  parentIn4: PropTypes.object,
  getParentsIn4ById: PropTypes.func
}

const mapStateToProps = (state) => ({
  parentIn4: state.parentIn4
})

export default connect(mapStateToProps, {
  getParentsIn4ById
})(TeacherChildrenPage)
