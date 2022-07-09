const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const signJWT = require('../utils/signJWT')
const authorize = require('../middleware/authorize')
const User = require('../models/User')
const Profile = require('../models/Profile')

// @route    GET api/users/auth
// @desc     Get user by token
// @access   Private
router.get('/auth', authorize(), async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password')
    res.json(user)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// @route    POST api/users/register
// @desc     Register user
// @access   Public
router.post('/register', async (req, res) => {
  const { username, password } = req.body

  try {
    let user = await User.findOne({ username })

    if (user) {
      return res.status(400).json({ msg: 'Tài khoản này đã tồn tại' })
    }

    user = new User({
      username,
      password
    })

    const salt = await bcrypt.genSalt(10)

    user.password = await bcrypt.hash(password, salt)

    const profile = new Profile({
      user: user._id,
      fullName: username,
      avatar: ''
    })

    await user.save()
    await profile.save()

    const token = await signJWT(user.id)
    res.json({ token })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
})

// @route    POST api/auth
// @desc     Authenticate user & get token
// @access   Public
router.post('/login', async (req, res) => {
  const { username, password, role } = req.body

  try {
    let user = await User.findOne({ username })

    if (!user) {
      return res.status(400).json({ msg: 'Thông tin đăng nhập không hợp lệ' })
    }

    if (!user.roles.includes(role)) {
      return res.status(401).json({
        msg: 'Bạn không có quyền truy cập vào trang này'
      })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(400).json({ msg: 'Thông tin đăng nhập không hợp lệ' })
    }

    const token = await signJWT(user.id)
    res.json({ token })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
})

module.exports = router
