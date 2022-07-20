import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import CommentItem from '../CommentItem'
import FormComment from '../FormComment'
import s from './styles.module.scss'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { deleteCommentClassnews } from 'services/redux/actions/student'
import { deleteCommentParentnews } from 'services/redux/actions/parent'

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

  const handleAddCmt = (idClassroom, cmt) => {
    setCmts([cmt, ...cmts])
  }

  const handleRemoveCmt = (idCmts, idNews) => {
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
        const temp = cmts.filter((c) => c._id !== idCmts)
        setCmts(temp)
        switch (asNews) {
          case 'class':
            deleteCommentClassnews(idNews, myprofile.user.toString())
            break
          case 'parent':
            deleteCommentParentnews(idNews, myprofile.user.toString())
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
          handleAddCmt={handleAddCmt}
          idNews={newsState._id}
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
              idNews={newsState._id}
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
