import Footer from 'components/core/Footer'
import Header from 'components/core/Header'
import s from './styles.module.scss'

const DefaultLayout = (props) => {
  return (
    <div className={s.root}>
      <Header />
      <div className={s.content}>
        <div className={s.child}>{props.children}</div>
      </div>
      <Footer />
    </div>
  )
}

export default DefaultLayout
