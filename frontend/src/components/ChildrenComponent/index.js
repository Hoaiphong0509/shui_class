import LoaderComponent from 'components/core/LoaderComponent'
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { getStudents } from 'services/redux/actions/student'
import ModalAddChild from './ModalAddChild'
import ProfileItem from './ProfileItem'
import s from './styles.module.scss'

const ChildrenComponent = ({
  parentIn4,
  student: { students, loading: ldStu },
  getStudents
}) => {
  const { children } = parentIn4
  const [show, setShow] = useState(false)

  useEffect(() => {
    getStudents()
  }, [getStudents])

  if (ldStu || students === null) return <LoaderComponent />

  let duplicates = []
  let unique = []
  for (let s of students) {
    if (children.some((c) => c.user === s.user)) {
      duplicates.push(s)
    } else {
      unique.push(s)
    }
  }
  for (let c of children) {
    if (!duplicates.some((dup) => dup.user === c.user)) {
      unique.push(c)
    }
  }
  return (
    <>
      <div className={s.root}>
        <div className={s.content}>
          <div className={s.header}>
            <Button onClick={() => setShow(!show)}>Thêm học sinh</Button>
          </div>
          <div className={s.childrenList}>
            {children.map((c, idx) => (
              <div key={idx} className={s.itemChild}>
                <ProfileItem profile={c} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <ModalAddChild show={show} setShow={setShow} childrenAvaible={unique} />
    </>
  )
}

ChildrenComponent.prototype = {
  student: PropTypes.object,
  getStudents: PropTypes.func
}

const mapStateToProps = (state) => ({
  student: state.student
})

export default connect(mapStateToProps, {
  getStudents
})(ChildrenComponent)
