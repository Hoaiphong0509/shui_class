import LoaderComponent from 'components/core/LoaderComponent'
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { getStudents } from 'services/redux/actions/student'
import ModalAddChild from './ModalAddChild'
import ProfileItem from './ProfileItem'
import s from './styles.module.scss'
import { ROLES } from 'constants/AppConstants'

const ChildrenComponent = ({
  user: { user, loading: ldu },
  parentIn4,
  student: { students, loading: ldStu },
  getStudents
}) => {
  const { children } = parentIn4
  const [show, setShow] = useState(false)

  useEffect(() => {
    getStudents()
  }, [getStudents])

  if (ldu || ldStu || students === null || user === null || user === undefined)
    return <LoaderComponent />
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

  const childrenAvaible = unique.filter((u) =>
    u?.roles?.includes(ROLES.STUDENT)
  )

  return (
    <>
      <div className={s.root}>
        <div className={s.content}>
          <div className={s.header}>
            {user && user?.roles?.includes(ROLES.TEACHER) ? (
              <Button onClick={() => setShow(!show)}>
                Thêm học sinh cho phụ huynh
              </Button>
            ) : null}
          </div>
          <h3 style={{ marginTop: '20px' }}>
            Danh sách học sinh của phụ huynh
          </h3>
          <div className={s.childrenList}>
            {children.map((c, idx) => (
              <div key={idx} className={s.itemChild}>
                {user && (
                  <ProfileItem
                    profile={c}
                    user={user}
                    idParent={parentIn4.user.toString()}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      {user && (
        <ModalAddChild
          show={show}
          setShow={setShow}
          user={user}
          idParent={parentIn4.user.toString()}
          childrenAvaible={childrenAvaible}
        />
      )}
    </>
  )
}

ChildrenComponent.prototype = {
  student: PropTypes.object,
  user: PropTypes.object,
  getStudents: PropTypes.func
}

const mapStateToProps = (state) => ({
  student: state.student,
  user: state.user
})

export default connect(mapStateToProps, {
  getStudents
})(ChildrenComponent)
