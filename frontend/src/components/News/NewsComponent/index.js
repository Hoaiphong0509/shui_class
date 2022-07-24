import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { connect, useSelector } from 'react-redux'
import { getClassnewsById } from 'services/redux/actions/classnews'
import { getParentnewsById } from 'services/redux/actions/parentnews'
import {
  deleteClassnews,
  deleteParentnews
} from 'services/redux/actions/teacher'
import Swal from 'sweetalert2'
import NewsComment from '../NewsComment'
import NewsItem from '../NewsItem'
import s from './styles.module.scss'

const NewsComponent = ({
  newss,
  myprofile,
  asNews,
  deleteClassnews,
  deleteParentnews,
  getClassnewsById,
  getParentnewsById
}) => {
  const [newssState, setNewssState] = useState(newss)
  const [newsState, setNewsState] = useState()

  const cln = useSelector((state) => state.classnews)
  const pns = useSelector((state) => state.parentnews)

  useEffect(() => {
    setNewssState(newss)
  }, [newss])

  useEffect(() => {
    if (asNews === 'class') {
      setNewsState(cln.classnews)
    }
    if (asNews === 'parent') {
      setNewsState(pns.parentnews)
    }
  }, [asNews, cln, pns])

  const handleGetNews = async (idNews) => {
    switch (asNews) {
      case 'class':
        await getClassnewsById(idNews)
        break
      case 'parent':
        await getParentnewsById(idNews)
        break
      default:
        break
    }
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
            await deleteClassnews(_id)
            break
          case 'parent':
            await deleteParentnews(_id)
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
                asNews={asNews}
              />
            </div>
          ))}
        </div>
        {asNews === 'class' ? (
          <div className={s.cmtArea}>
            {cln.loading ||
            newsState === null ||
            newsState === undefined ? null : (
              <NewsComment
                newsState={newsState}
                myprofile={myprofile}
                asNews={asNews}
              />
            )}
          </div>
        ) : (
          <div className={s.cmtArea}>
            {pns.loading ||
            newsState === null ||
            newsState === undefined ? null : (
              <NewsComment
                newsState={newsState}
                myprofile={myprofile}
                asNews={asNews}
              />
            )}
          </div>
        )}
      </div>
    </div>
  )
}

NewsComponent.prototype = {
  classnews: PropTypes.object,
  parentnews: PropTypes.object,
  deleteClassnews: PropTypes.func,
  deleteParentnews: PropTypes.func,
  getClassnewsById: PropTypes.func,
  getParentnewsById: PropTypes.func
}

const mapStateToProps = (state) => ({
  classnews: state.classnews,
  parentnews: state.parentnews
})

export default connect(mapStateToProps, {
  deleteClassnews,
  deleteParentnews,
  getClassnewsById,
  getParentnewsById
})(NewsComponent)
