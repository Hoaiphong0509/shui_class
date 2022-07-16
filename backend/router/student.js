const express = require('express')
const router = express.Router()
const authorize = require('../middleware/authorize')
const User = require('../models/User')
const Profile = require('../models/Profile')
const role = require('../helper/role')
const Classnews = require('../models/Classnews')
const checkObjectId = require('../middleware/checkObjectId')

// @route    GET api/student
// @desc     Get all students
// @access   Private
router.get('/', authorize(), async (req, res) => {
  try {
    const students = await User.find({ roles: [role.Student] })
    const profiles = await Profile.find()

    const result = profiles.filter((p) =>
      students.some((s) => s._id.toString() === p.user.toString())
    )

    res.json(result)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// @route    PUT api/student/like_classnews/:id_classnews
// @desc     Like news
// @access   Private
router.put(
  '/like_classnews/:id_classnews',
  checkObjectId('id_classnews'),
  authorize(),
  async (req, res) => {
    try {
      await Classnews.findByIdAndUpdate(req.params.id_classnews, {
        $push: { likes: { user: req.user.id } }
      })

      return res.json({ msg: 'Like thành công' })
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  }
)

// @route    PUT api/student/unlike_classnews/:id_classnews
// @desc     Like news
// @access   Private
router.put(
  '/unlike_classnews/:id_classnews',
  checkObjectId('id_classnews'),
  authorize(),
  async (req, res) => {
    try {
      const classnews = await Classnews.findById(req.params.id_classnews)
      const likes = classnews.likes.filter(
        (l) => l.user.toString() !== req.user.id
      )

      await Classnews.findByIdAndUpdate(req.params.id_classnews, {
        $set: { likes }
      })

      return res.json({ msg: 'Unlike thành công' })
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  }
)

// @route    PUT api/student/add_comment/:id_classnews
// @desc     Comment into classnews
// @access   Private
router.put(
  '/add_comment/:id_classnews',
  checkObjectId('id_classnews'),
  authorize(),
  async (req, res) => {
    const { text } = req.body
    try {
      const profile = await Profile.findOne({ user: req.user.id })

      await Classnews.findByIdAndUpdate(req.params.id_classnews, {
        $push: {
          comments: {
            user: req.user.id,
            text,
            name: profile.fullName,
            avatar: profile.avatar
          }
        }
      })

      return res.json({ msg: 'Comment vào bản tin thành công' })
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  }
)

// @route    PUT api/student/delete_comment/:id_classnews/:id_user
// @desc     Delelte Comment
// @access   Private
router.put(
  '/delete_comment/:id_classnews/:id_user',
  checkObjectId('id_classnews'),
  checkObjectId('id_user'),
  authorize(),
  async (req, res) => {
    try {
      const classnews = await Classnews.findById(req.params.id_classnews)

      const comments = classnews.comments.filter(
        (c) => c.user.toString() !== req.params.id_user
      )

      await Classnews.findByIdAndUpdate(req.params.id_classnews, {
        $set: {
          comments
        }
      })

      return res.json({ msg: 'Xoá comment thành công' })
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  }
)

module.exports = router
