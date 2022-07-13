const express = require('express')
const router = express.Router()
const authorize = require('../middleware/authorize')
const role = require('../helper/role')
const checkObjectId = require('../middleware/checkObjectId')
const Classroom = require('../models/Classroom')
const Profile = require('../models/Profile')
const User = require('../models/User')
const ParentIn4 = require('../models/ParentIn4')

// @route    GET api/parents
// @desc     Get all parents
// @access   Private
router.get('/', authorize(role.Admin), async (req, res) => {
  try {
    const result = await User.find({ roles: [role.Parent] })

    res.json(result)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// @route    GET api/parents/me
// @desc     Get parent info
// @access   Private
router.get('/me', authorize(role.Parent), async (req, res) => {
  try {
    const result = await ParentIn4.findOne({ user: req.user.id.toString() })

    res.json(result)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// @route    PUT api/parents/add_children
// @desc     Add children for parent
// @access   Private
router.put('/add_children', authorize(role.Parent), async (req, res) => {
  const { childrenUsername, username } = req.body
  try {
    const parentin4 = await ParentIn4.findOne({ username })
    const profileChild = await Profile.findOne({
      username: childrenUsername
    })

    if (!parentin4) {
      return res.status(400).json({ msg: 'Tài khoản này không tồn tại' })
    }

    if (!profileChild) {
      return res
        .status(400)
        .json({ msg: 'Tài khoản học sinh này không tồn tại' })
    }

    if (
      parentin4.children.some(
        (c) => c.user.toString() === profileChild.user.toString()
      )
    )
      return res
        .status(400)
        .json({ msg: 'Học sinh này đã tồn tại trong tài khoản của bạn!' })

    await ParentIn4.findOneAndUpdate(
      { username },
      {
        $push: {
          children: {
            user: profileChild.user.toString(),
            name: profileChild.fullName,
            isDelete: false
          }
        }
      }
    )

    return res.json({ msg: 'Thêm học sinh thành công!' })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// @route    PUT api/parents/remove_student
// @desc     Remove children for parent
// @access   Private
router.put('/remove_student', authorize(role.Parent), async (req, res) => {
  const { childrenUsername, username } = req.body
  try {
    const parentin4 = await ParentIn4.findOne({ username })
    const profileChild = await Profile.findOne({
      username: childrenUsername
    })

    if (!parentin4) {
      return res.status(400).json({ msg: 'Tài khoản này không tồn tại' })
    }

    if (!profileChild) {
      return res
        .status(400)
        .json({ msg: 'Tài khoản học sinh này không tồn tại' })
    }

    if (
      !parentin4.children.some(
        (c) => c.user.toString() === profileChild.user.toString()
      )
    )
      return res
        .status(400)
        .json({ msg: 'Học sinh này không có trong tài khoản của bạn!' })

    await ParentIn4.findOneAndUpdate(
      { username },
      {
        $set: {
          children: parentin4.children.filter(
            (c) => c.user.toString() !== profileChild.user.toString()
          )
        }
      }
    )

    return res.json({ msg: 'Xoá học sinh thành công!' })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

module.exports = router
