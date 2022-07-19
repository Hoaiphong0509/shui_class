import moment from 'moment'
import React from 'react'
import { Button } from 'react-bootstrap'
import s from './styles.module.scss'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const CommentItem = ({
  user: { user },
  cmt,
  handleRemoveCmt,
  idClassnews,
  authorId
}) => {
  const {
    _id,
    avatar = '/assets/img/avatar.png',
    name,
    date,
    text,
    user: usCmt
  } = cmt

  return (
    <>
      <div className={s.root}>
        <div className={s.in4}>
          <img
            src={avatar?.length > 0 ? avatar : '/assets/img/avatar.png'}
            alt="avatar"
          />
          <div className={s.name_date}>
            <p>{name}</p>
            <i>{moment(date).format('DD-MM-YYYY hh:mm')}</i>
          </div>
        </div>
        <div className={s.content}>
          <div>{text}</div>
          {user._id.toString() === authorId || user._id.toString() === usCmt ? (
            <Button
              variant="danger"
              onClick={() => handleRemoveCmt(_id, idClassnews)}
            >
              Xoá
            </Button>
          ) : null}
        </div>
      </div>
      <hr />
    </>
  )
}

CommentItem.prototype = {
  user: PropTypes.object
}

const mapStateToProps = (state) => ({
  user: state.user
})

export default connect(mapStateToProps, null)(CommentItem)
