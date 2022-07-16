import React, { useState } from 'react'
import Swal from 'sweetalert2'
import NewsComment from '../NewsComment'
import NewsItem from '../NewsItem'
import s from './styles.module.scss'

const NewsComponent = ({ classnewss, myprofile }) => {
  const [classnewsState, setClassnewsState] = useState(classnewss)
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
        const temp = classnewsState.filter((c) => c._id.toString() !== _id)
        setClassnewsState(temp)
      }
    })
  }

  return (
    <div className={s.root}>
      <div className={s.content}>
        <div className={s.listnews}>
          {classnewsState.map((c, idx) => (
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

export default NewsComponent
