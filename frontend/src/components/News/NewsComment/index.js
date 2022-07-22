import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Swal from 'sweetalert2'
import CommentItem from '../CommentItem'
import FormComment from '../FormComment'
import s from './styles.module.scss'

import { deleteCommentParentnews } from 'services/redux/actions/parent'
import { deleteCommentClassnews } from 'services/redux/actions/student'

const NewsComment = ({
  newsState,
  myprofile,
  deleteCommentClassnews,
  deleteCommentParentnews,
  asNews
}) => {
  const [cmts, setCmts] = useState(newsState.comments)
  useEffect(() => {
    setCmts(newsState.comments)
  }, [newsState])

  const handleRemoveCmt = (idNews, idUser, idCmts) => {
    Swal.fire({
      title: 'Xác nhận',
      text: 'Bạn có muốn xoá Comment này',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e63c49',
      cancelButtonColor: '#ccc',
      confirmButtonText: 'Có',
      cancelButtonText: 'Huỷ'
    }).then(async (result) => {
      if (result.isConfirmed) {
        switch (asNews) {
          case 'class':
            deleteCommentClassnews(idNews, idCmts)
            break
          case 'parent':
            deleteCommentParentnews(idNews, idCmts)
            break
          default:
            break
        }
      }
    })
  }
  return (
    <div className={s.root}>
      <div className={s.formCmt}>
        <FormComment
          idNews={newsState._id.toString()}
          myprofile={myprofile}
          asNews={asNews}
        />
      </div>
      <hr />
      <div className={s.listcmts}>
        {cmts.map((cmt, idx) => (
          <div key={idx}>
            <CommentItem
              cmt={cmt}
              handleRemoveCmt={handleRemoveCmt}
              idNews={newsState._id.toString()}
              authorId={newsState.user}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

NewsComment.prototype = {
  deleteCommentClassnews: PropTypes.func,
  deleteCommentParentnews: PropTypes.func
}

export default connect(null, {
  deleteCommentClassnews,
  deleteCommentParentnews
})(NewsComment)
