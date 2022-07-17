import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import NewsComment from '../NewsComment'
import NewsItem from '../NewsItem'
import s from './styles.module.scss'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  deleteClassnews,
  deleteParentnews
} from 'services/redux/actions/teacher'

const NewsComponent = ({
  newss,
  myprofile,
  asNews,
  deleteClassnews,
  deleteParentnews
}) => {
  const [newssState, setNewssState] = useState(newss)

  useEffect(()=> {
    setNewssState(newss)
  }, [newss])

  const [newsState, setNewsState] = useState()

  const handleGetNews = (news) => {
    setNewsState(news)
  }

  const handleDelete = (_id) => {
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
        switch (asNews) {
          case 'class':
            deleteClassnews(_id)
            break
          case 'parent':
            deleteParentnews(_id)
            break
          default:
            break
        }

        const temp = newssState.filter((c) => c._id.toString() !== _id)
        setNewssState(temp)
      }
    })
  }

  return (
    <div className={s.root}>
      <div className={s.content}>
        <div className={s.listnews}>
          {newssState.map((c, idx) => (
            <div className={s.newsitem} key={idx}>
              <NewsItem
                news={c}
                handleGetNews={handleGetNews}
                handleDelete={handleDelete}
              />
            </div>
          ))}
        </div>
        <div className={s.cmtArea}>
          {newsState && (
            <NewsComment newsState={newsState} myprofile={myprofile} />
          )}
        </div>
      </div>
    </div>
  )
}

NewsComponent.prototype = {
  deleteClassnews: PropTypes.func,
  deleteParentnews: PropTypes.func
}

export default connect(null, {
  deleteClassnews,
  deleteParentnews
})(NewsComponent)
