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
    const result = await ParentIn4.findOne({  user: req.user.id.toString() })
 
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
  const { childrenUsername } = req.body
  console.log('childrenUsername', childrenUsername)
  try {
    const parentin4 = await ParentIn4.findOne({ user: req.user.id })
    const profileChild = await Profile.findOne({
      username: childrenUsername
    })
    const classroom = await Classroom.find()

    const result = classroom.filter(
      (c) =>
        (c.headTeacher.user && c.headTeacher.user.toString() === req.user.id) ||
        c.students.some(
          (s) => s.user.toString() === profileChild.user.toString()
        )
    )

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
      { user: req.user.id },
      {
        $push: {
          children: {
            user: profileChild.user.toString(),
            name: profileChild.fullName,
            avatar: profileChild.avatar,
            classroom: result[0].name,
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

// @route    PUT api/parents/remove_student/:id_user
// @desc     Remove children for parent
// @access   Private
router.put(
  '/remove_student/:id_user',
  checkObjectId('id_user'),
  authorize(role.Parent),
  async (req, res) => {
    const { childrenUsername } = req.body
    try {
      const parentin4 = await ParentIn4.findOne({ user: req.user.id })
      const profileChild = await Profile.findOne({
        user: req.params.id_user
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
        { user: req.user.id },
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
  }
)

// @route    PUT api/student/like_parentnews/:id_parentnews
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

// @route    PUT api/student/unlike_parentnews/:id_parentnews
// @desc     Like news
// @access   Private
router.put(
  '/unlike_parentnews/:id_parentnews',
  checkObjectId('id_parentnews'),
  authorize(),
  async (req, res) => {
    try {
      const parentnews = await Parentnews.findById(req.params.id_parentnews)
      const likes = parentnews.likes.filter((l) => l.user !== req.user.id)

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

// @route    PUT api/student/add_comment/:id_parentnews
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

      return res.json({ msg: 'Comment vào bản tin thành công' })
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  }
)

// @route    PUT api/student/delete_comment/:id_parentnews
// @desc     Delelte Comment
// @access   Private
router.put(
  '/delete_comment/:id_parentnews',
  checkObjectId('id_parentnews'),
  authorize(),
  async (req, res) => {
    try {
      const parentnews = await Parentnews.findById(req.params.id_parentnews)
      const comments = parentnews.comments.filter((c) => c.user !== req.user.id)

      await Parentnews.findByIdAndUpdate(req.params.id_parentnews, {
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
