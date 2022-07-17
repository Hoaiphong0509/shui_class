import CreateNews from 'components/News/CreateNews'
import React from 'react'
import s from './styles.module.scss'

const CreateParentnews = () => {
  return (
    <div className={s.root}>
      <div className={s.content}>
        <h3>Thêm bản tin phụ huynh</h3>
        <div className={s.formCreate}>
          <CreateNews asNews="parent" />
        </div>
      </div>
    </div>
  )
}

export default CreateParentnews
