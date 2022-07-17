import CreateNews from 'components/News/CreateNews'
import React from 'react'
import s from './styles.module.scss'

const CreateClassnews = () => {
  return (
    <div className={s.root}>
      <div className={s.content}>
        <h3>Thêm bản tin lớp học</h3>
        <div className={s.formCreate}>
          <CreateNews asNews="class" />
        </div>
      </div>
    </div>
  )
}

export default CreateClassnews
