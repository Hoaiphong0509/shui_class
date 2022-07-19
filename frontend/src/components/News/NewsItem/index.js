import React, { useState } from 'react'
import { Interweave } from 'interweave'
import { Button } from 'react-bootstrap'
import s from './styles.module.scss'
import moment from 'moment'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { likeClassnews, unlikeClassnews } from 'services/redux/actions/student'
import { useHistory } from 'react-router-dom'

const NewsItem = ({
  user: { user: us },
  news,
  handleGetNews,
  likeClassnews,
  unlikeClassnews,
  handleDelete
}) => {
  const history = useHistory()
  const { _id, createdAt, likes, text, title, user } = news
  const [numLike, setNumLike] = useState(likes.length)
  const [isDisableLike, setIsDisableLike] = useState(
    likes.some((l) => l.user.toString() === us._id.toString())
  )
  const [isDisableUnLike, setIsUnDisableLike] = useState(
    likes.some((l) => l.user.toString() !== us._id.toString())
  )

  const handleLike = () => {
    likeClassnews(_id)
    setNumLike((prev) => prev + 1)
    toggleLike()
    toggleUnLike()
  }

  const handleUnlike = () => {
    unlikeClassnews(_id)
    setNumLike((prev) => prev - 1)
    setIsUnDisableLike(!isDisableUnLike)
    toggleLike()
    toggleUnLike()
  }

  const toggleLike = () => {
    setIsDisableLike(!isDisableLike)
  }
  const toggleUnLike = () => {
    setIsUnDisableLike(!isDisableUnLike)
  }

  return (
    <div className={s.root}>
      <h2 className={s.title}>{title}</h2>
      <div className={s.content}>
        <Interweave content={text} />
      </div>
      <div className={s.inf4}>
        <i>Ngày: {moment(createdAt).format('DD-MM-YYYY hh:mm')}</i>
        <p>Yêu thích: {numLike}</p>
      </div>
      <div className={s.btnInteraction}>
        <Button
          disabled={isDisableLike}
          className={s.btnLike}
          onClick={handleLike}
        >
          💘
        </Button>
        <Button
          disabled={isDisableUnLike}
          className={s.btnUnlike}
          onClick={handleUnlike}
        >
          💔
        </Button>
        <Button className={s.btnCmt} onClick={() => handleGetNews(news)}>
          Bình luận
        </Button>
        {user === us._id.toString() ? (
          <Button
            variant="primary"
            onClick={() => history.push(`/update_classnews/${_id}`)}
          >
            Sửa
          </Button>
        ) : null}
        {user === us._id.toString() ? (
          <Button variant="danger" onClick={() => handleDelete(_id)}>
            Xoá
          </Button>
        ) : null}
      </div>
    </div>
  )
}

NewsItem.prototype = {
  likeClassnews: PropTypes.func,
  unlikeClassnews: PropTypes.func
}

const mapStateToProps = (state) => ({
  user: state.user
})

export default connect(mapStateToProps, {
  likeClassnews,
  unlikeClassnews
})(NewsItem)
