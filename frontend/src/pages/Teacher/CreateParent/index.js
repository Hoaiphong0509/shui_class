import s from './styles.module.scss'

import LoaderComponent from 'components/core/LoaderComponent'
import FormAddParent from 'components/Teacher/FormAddParent'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { getParents } from 'services/redux/actions/parent'
import { getParentsMyClassroom } from 'services/redux/actions/teacher'

const CreateParent = ({
  parent: { parents, loading: ldp },
  classroom: { classroom, loading: ldCls },
  getParentsMyClassroom,
  getParents
}) => {
  useEffect(() => {
    getParents()
  }, [getParents])

  useEffect(() => {
    getParentsMyClassroom()
  }, [getParentsMyClassroom])

  if (ldp || ldCls || parents === null || classroom === null)
    return <LoaderComponent />

  let duplicates = []
  let unique = []
  for (let s of parents) {
    if (classroom.parents.some((cs) => cs.parentId === s.user)) {
      duplicates.push(s)
    } else {
      unique.push(s)
    }
  }
  for (let cs of classroom.parents) {
    if (!duplicates.some((dup) => dup.user === cs.parentId)) {
      unique.push(cs)
    }
  }

  return (
    <div className={s.root}>
      <div className={s.form}>
        <FormAddParent
          idClassroom={classroom._id.toString()}
          parentsAvailable={unique}
        />
      </div>
    </div>
  )
}

CreateParent.prototype = {
  parent: PropTypes.object,
  getParents: PropTypes.func,
  getStaffs: PropTypes.func,
  getParentsMyClassroom: PropTypes.func
}

const mapStateToProps = (state) => ({
  parent: state.parent,
  classroom: state.classroom
})

export default connect(mapStateToProps, {
  getParents,
  getParentsMyClassroom
})(CreateParent)
