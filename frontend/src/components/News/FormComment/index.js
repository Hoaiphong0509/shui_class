import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import * as yup from 'yup'
import s from './styles.module.scss'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { addCommentParentnews } from 'services/redux/actions/parent'
import { addCommentClassnews } from 'services/redux/actions/student'

const FormComment = ({
  idNews,
  addCommentClassnews,
  addCommentParentnews,
  asNews
}) => {
  const history = useHistory()
  const schema = yup
    .object({
      text: yup.string().required('Bình luận không được trống!')
    })
    .required()
  const { register, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = (data) => {
    switch (asNews) {
      case 'class':
        addCommentClassnews(idNews, data)
        history.replace('/classnews')
        break
      case 'parent':
        addCommentParentnews(idNews, data)
        history.replace('/parentnews')
        break
      default:
        break
    }
    reset()
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
      <input
        className={s.input}
        name="text"
        placeholder="Nhập bình luận..."
        {...register('text')}
      />
      <Button type="submit">Bình luận</Button>
    </form>
  )
}

FormComment.prototype = {
  addCommentClassnews: PropTypes.func,
  addCommentParentnews: PropTypes.func
}

export default connect(null, { addCommentClassnews, addCommentParentnews })(
  FormComment
)
