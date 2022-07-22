import React, { useEffect, useState } from 'react'
import { Interweave } from 'interweave'
import { Button } from 'react-bootstrap'
import s from './styles.module.scss'
import moment from 'moment'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { likeClassnews, unlikeClassnews } from 'services/redux/actions/student'
import { likeParentnews, unlikeParentnews } from 'services/redux/actions/parent'
import { useHistory } from 'react-router-dom'

const NewsItem = ({
  user: { user: us },
  news,
  handleGetNews,
  likeClassnews,
  unlikeClassnews,
  likeParentnews,
  unlikeParentnews,
  handleDelete,
  asNews
}) => {
  const history = useHistory()

  const { _id, createdAt, likes, text, title, user } = news
  const [numLike, setNumLike] = useState(likes.length)
  const [isDisableLike, setIsDisableLike] = useState()
  const [isDisableUnLike, setIsUnDisableLike] = useState()

  useEffect(() => {
    setIsDisableLike(likes.some((l) => l.user.toString() === us._id.toString()))
    setIsUnDisableLike(
      !likes.some((l) => l.user.toString() === us._id.toString())
    )
  }, [likes, us])

  const handleLike = () => {
    switch (asNews) {
      case 'class':
        likeClassnews(_id)
        break
      case 'parent':
        likeParentnews(_id)
        break
      default:
        break
    }
    setNumLike((prev) => prev + 1)
    toggleLike()
    toggleUnLike()
  }

  const handleUnlike = () => {
    switch (asNews) {
      case 'class':
        unlikeClassnews(_id)
        break
      case 'parent':
        unlikeParentnews(_id)
        break
      default:
        break
    }
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
        <Button className={s.btnCmt} onClick={() => handleGetNews(_id)}>
          Bình luận
        </Button>
        {user === us._id.toString() ? (
          <Button
            variant="primary"
            onClick={() =>
              history.push(
                `/${
                  asNews === 'class' ? 'update_classnews' : 'update_parentnews'
                }/${_id}`
              )
            }
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
  unlikeClassnews: PropTypes.func,
  likeParentnews: PropTypes.func,
  unlikeParentnews: PropTypes.func
}

const mapStateToProps = (state) => ({
  user: state.user
})

export default connect(mapStateToProps, {
  likeClassnews,
  unlikeClassnews,
  likeParentnews,
  unlikeParentnews
})(NewsItem)
