const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const signJWT = require('../utils/signJWT')
const authorize = require('../middleware/authorize')
const User = require('../models/User')
const Profile = require('../models/Profile')
const Classroom = require('../models/Classroom')
const Classnews = require('../models/Classnews')
const Parentnews = require('../models/Parentnews')
const ParentIn4 = require('../models/ParentIn4')
const checkObjectId = require('../middleware/checkObjectId')

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
      username,
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

    if (user.roles.includes('guesst')) {
      return res.status(400).json({
        msg: 'Tài khoản bạn chưa có quyền truy cập vào trang này. Vui lòng chờ Admin thêm quyền cho bạn!'
      })
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

// @route    GET api/users/get_myclassnews
// @desc     GET my classnews
// @access   Private
router.get('/get_myclassnews', authorize(), async (req, res) => {
  try {
    const classroom = await Classroom.find()

    const result = classroom.filter(
      (c) =>
        (c.headTeacher.user && c.headTeacher.user.toString() === req.user.id) ||
        c.students.some((s) => s.user.toString() === req.user.id)
    )

    if (!result || result.length === 0) return res.json([])

    const classnews = await Classnews.find({
      classroom: result[0]._id.toString()
    })

    classnews?.sort((a, b) => {
      return new Date(b.date) - new Date(a.date)
    })
    res.json(classnews)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// @route    GET api/users/get_classnews/:id_classnews
// @desc     Get classnews by id
// @access   Private
router.get(
  '/get_classnews/:id_classnews',
  checkObjectId('id_classnews'),
  authorize(),
  async (req, res) => {
    try {
      const result = await Classnews.findById(req.params.id_classnews)
      res.json(result)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  }
)

// @route    GET api/users/get_myparentnews
// @desc     GET my parentnews
// @access   Private
router.get('/get_myparentnews', authorize(), async (req, res) => {
  try {
    const parentIn4 = await ParentIn4.findOne({ user: req.user.id })
    if (!parentIn4) return res.json([])

    const parentnews = await Parentnews.find()
    parentnews.filter((pn) =>
      parentIn4?.classroomIn4.some(
        (pc) => pc.class.toString() === pn.classroom.toString()
      )
    )

    if (!parentnews || parentnews.length === 0) return res.json([])

    parentnews?.sort((a, b) => {
      return new Date(b.date) - new Date(a.date)
    })
    res.json(parentnews)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// @route    GET api/users/get_parentnews/:id_parentnews
// @desc     Get parentnews by id
// @access   Private
router.get(
  '/get_parentnews/:id_parentnews',
  checkObjectId('id_parentnews'),
  authorize(),
  async (req, res) => {
    try {
      const result = await Parentnews.findById(req.params.id_parentnews)
      res.json(result)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  }
)

module.exports = router
