import React from 'react'
import s from './styles.module.scss'

const MenuLogin = (props) => {
  const { handlelLoginAs } = props
  return (
    <div className={s.root}>
      <div className="area">
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      <div className={s.menu}>
        <div className={s.title}>
          <h1>QUẢN LÝ LỚP HỌC</h1>
          <h1>DÀNH CHO GIÁO VIÊN CHỦ NHIỆM</h1>
        </div>
        <div className={s.menuButton}>
          <button onClick={() => handlelLoginAs('admin')}>QUẢN TRỊ VIÊN</button>
          <button onClick={() => handlelLoginAs('teacher')}>
            GIÁO VIÊN CHỦ NHIỆM
          </button>
          <button onClick={() => handlelLoginAs('student')}>
            HỌC SINH LỚP HỌC
          </button>
          <button onClick={() => handlelLoginAs('parent')}>
            PHỤ HUYNH HỌC SINH
          </button>
        </div>
      </div>
    </div>
  )
}

export default MenuLogin
