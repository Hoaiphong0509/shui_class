import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'
import * as yup from 'yup'
import s from './styles.module.scss'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { addCommentClassnews } from 'services/redux/actions/student'

const FormComment = ({
  idClassnews,
  handleAddCmt,
  addCommentClassnews,
  myprofile
}) => {
  const schema = yup
    .object({
      text: yup.string().required('Bình luận không được trống!')
    })
    .required()
  const { register, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = (data) => {
    handleAddCmt({
      _id: uuidv4(),
      avatar: myprofile.avatar,
      name: myprofile.fullName,
      text: data.text,
      date: new Date()
    })
    addCommentClassnews(idClassnews, data)
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
  addCommentClassnews: PropTypes.func
}

export default connect(null, { addCommentClassnews })(FormComment)
