const express = require('express')
const router = express.Router()
const authorize = require('../middleware/authorize')
const role = require('../helper/role')
const checkObjectId = require('../middleware/checkObjectId')
const Classroom = require('../models/Classroom')
const Profile = require('../models/Profile')
const User = require('../models/User')
const ParentIn4 = require('../models/ParentIn4')
const Parentnews = require('../models/Parentnews')

// @route    GET api/parents
// @desc     Get all parents
// @access   Private
router.get('/', authorize(), async (req, res) => {
  try {
    const parents = await User.find({ roles: [role.Parent] })
    const profiles = await Profile.find()

    const result = profiles.filter((p) =>
      parents.some((s) => s._id.toString() === p.user.toString())
    )

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

// @route    GET api/parents/:id_parent
// @desc     Get parent info
// @access   Private
router.get(
  '/:id_parent',
  checkObjectId('id_parent'),
  authorize(role.Teacher),
  async (req, res) => {
    try {
      const result = await ParentIn4.findOne({ user: req.params.id_parent })

      console.log("result", result)

      res.json(result)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  }
)

// @route    PUT api/parents/like_parentnews/:id_parentnews
// @desc     Like news
// @access   Private
router.put(
  '/like_parentnews/:id_parentnews',
  checkObjectId('id_parentnews'),
  authorize(),
  async (req, res) => {
    try {
      await Parentnews.findByIdAndUpdate(req.params.id_parentnews, {
        $push: { likes: { user: req.user.id } }
      })

      return res.json({ msg: 'Like thành công' })
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  }
)

// @route    PUT api/parents/unlike_parentnews/:id_parentnews
// @desc     Like news
// @access   Private
router.put(
  '/unlike_parentnews/:id_parentnews',
  checkObjectId('id_parentnews'),
  authorize(),
  async (req, res) => {
    try {
      const parentnews = await Parentnews.findById(req.params.id_parentnews)
      const likes = parentnews.likes.filter(
        (l) => l.user.toString() !== req.user.id
      )

      await Parentnews.findByIdAndUpdate(req.params.id_parentnews, {
        $set: { likes }
      })

      return res.json({ msg: 'Unlike thành công' })
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  }
)

// @route    PUT api/parents/add_comment/:id_parentnews
// @desc     Comment into parents
// @access   Private
router.put(
  '/add_comment/:id_parentnews',
  checkObjectId('id_parentnews'),
  authorize(),
  async (req, res) => {
    const { text } = req.body
    try {
      const profile = await Profile.findOne({ user: req.user.id })

      await Parentnews.findByIdAndUpdate(req.params.id_parentnews, {
        $push: {
          comments: {
            user: req.user.id,
            text,
            name: profile.fullName,
            avatar: profile.avatar
          }
        }
      })

      const result = await Parentnews.findById(req.params.id_parentnews)
      return res.json(result)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  }
)

// @route    PUT api/parents/delete_comment/:id_parentnews
// @desc     Delelte Comment
// @access   Private
router.put(
  '/delete_comment/:id_parentnews/:id_cmt',
  checkObjectId('id_parentnews'),
  checkObjectId('id_cmt'),
  authorize(),
  async (req, res) => {
    try {
      const parentnews = await Parentnews.findById(req.params.id_parentnews)

      const comments = parentnews.comments.filter(
        (c) => c._id.toString() !== req.params.id_cmt
      )

      await Parentnews.findByIdAndUpdate(req.params.id_parentnews, {
        $set: {
          comments
        }
      })
      const result = await Parentnews.findById(req.params.id_parentnews)
      return res.json(result)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  }
)

module.exports = router
