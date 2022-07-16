import React, { useState } from 'react'
import Swal from 'sweetalert2'
import CommentItem from '../CommentItem'
import FormComment from '../FormComment'
import s from './styles.module.scss'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { deleteCommentClassnews } from 'services/redux/actions/student'

const NewsComment = ({ newsState, myprofile, deleteCommentClassnews }) => {
  const [cmts, setCmts] = useState(newsState.comments)
  console.log('newsState', newsState)

  const handleAddCmt = (cmt) => {
    setCmts([cmt, ...cmts])
  }

  const handleRemoveCmt = (idCmts, id_classnews) => {
    Swal.fire({
      title: 'Xác nhận',
      text: 'Bạn có muốn xoá bản tin này',
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
        deleteCommentClassnews(id_classnews, myprofile.user.toString())
      }
    })
  }

  return (
    <div className={s.root}>
      <div className={s.formCmt}>
        <FormComment
          handleAddCmt={handleAddCmt}
          idClassnews={newsState._id}
          myprofile={myprofile}
        />
      </div>
      <hr />
      <div className={s.listcmts}>
        {cmts.map((cmt, idx) => (
          <div key={idx}>
            <CommentItem
              cmt={cmt}
              handleRemoveCmt={handleRemoveCmt}
              idClassnews={newsState._id}
              authorId={newsState.user}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

NewsComment.prototype = {
  deleteCommentClassnews: PropTypes.func
}

export default connect(null, { deleteCommentClassnews })(NewsComment)
