const express = require('express')
const router = express.Router()
const authorize = require('../middleware/authorize')
const User = require('../models/User')
const Profile = require('../models/Profile')
const role = require('../helper/role')
const checkObjectId = require('../middleware/checkObjectId')
const Classroom = require('../models/Classroom')
const Classnews = require('../models/Classnews')
const Parentnews = require('../models/Parentnews')

// @route    GET api/admin/users
// @desc     Get all users
// @access   Private
router.get('/users', authorize(role.Admin), async (req, res) => {
  try {
    const users = await User.find()
    const profiles = await Profile.find()

    let result = users.map((item, i) =>
      Object.assign({}, item._doc, profiles[i])
    )
    res.json(result)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// @route    GET api/admin/teacher
// @desc     Get all teacher
// @access   Private
router.get('/teacher', authorize(role.Admin), async (req, res) => {
  try {
    const users = await User.find({ roles: [role.Teacher] })

    const tempUs = users.filter(
      (us) => us._id.toString() !== req.user.id.toString()
    )

    const profiles = await Profile.find()
    let result = tempUs.map((item, i) =>
      Object.assign({}, item._doc, profiles[i])
    )

    res.json(result)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// @route    GET api/admin/parent
// @desc     Get all parent
// @access   Private
router.get('/parent', authorize(role.Admin), async (req, res) => {
  try {
    const users = await User.find({ roles: [role.Parent] })
    const profiles = await Profile.find()
    let result = users.map((item, i) =>
      Object.assign({}, item._doc, profiles[i])
    )

    res.json(result)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// @route    GET api/admin/classnews
// @desc     Get all teacher
// @access   Private
router.get('/classnews', authorize(), async (req, res) => {
  try {
    const result = await Classnews.find()

    res.json(result)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})
// @route    GET api/admin/parentnews
// @desc     Get all teacher
// @access   Private
router.get('/parentnews', authorize(), async (req, res) => {
  try {
    const result = await Parentnews.find()

    res.json(result)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// @route    GET api/admin/add_teacher
// @desc     Add teacher
// @access   Private
router.put('/add_teacher', authorize(role.Admin), async (req, res) => {
  const { username } = req.body
  try {
    const user = await User.findOne({ username })

    if (!user)
      return res.status(400).json({ msg: 'T??i kho???n n??y kh??ng t???n t???i!' })

    if (user.roles.includes(role.Parent))
      return res.status(400).json({ msg: 'T??i kho???n n??y ??ang l?? ph??? huynh' })
    if (user.roles.includes(role.Student))
      return res.status(400).json({ msg: 'T??i kho???n n??y ??ang l?? h???c sinh' })
    if (user.roles.includes(role.Admin))
      return res.status(400).json({ msg: 'T??i kho???n n??y ??ang l?? admin' })

    await User.findOneAndUpdate(
      { username: username },
      {
        $set: { roles: [role.Teacher] }
      }
    )

    res.json({ msg: 'Th??m gi??o vi??n th??nh c??ng' })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// @route    PUT api/admin/add_teacher_into_class/:id_classroom
// @desc     ADD teacher into class
// @access   Private
router.put(
  '/add_teacher_into_class/:id_classroom',
  checkObjectId('id_classroom'),
  authorize(role.Admin),
  async (req, res) => {
    const { username } = req.body
    try {
      const teacher = await User.findOne({ username })
      const idClassroom = req.params.id_classroom

      if (!teacher) {
        return res.status(400).json({ msg: 'T??i kho???n n??y kh??ng t???n t???i' })
      }

      if (!teacher.roles.includes(role.Teacher)) {
        return res
          .status(400)
          .json({ msg: 'T??i kho???n n??y kh??ng ph???i l?? gi??o vi??n' })
      }

      const profileTeacher = await Profile.findOne({
        user: teacher.id.toString()
      })

      const classroom = await Classroom.findById(idClassroom)

      if (
        'headTeacher' in classroom &&
        classroom.headTeacher.teacherName.length > 0
      )
        return res
          .status(400)
          .json({ msg: 'L???p h???c n??y ???? c?? gi??o vi??n ch??? nhi???m' })

      await Classroom.findByIdAndUpdate(idClassroom, {
        $set: {
          headTeacher: {
            user: teacher.id.toString(),
            teacherName: profileTeacher.fullName
          }
        }
      })

      res.json({ msg: 'Th??m gi??o vi??n ch??? nhi???m v??o l???p h???c th??nh c??ng' })
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  }
)

// @route    PUT api/admin/remove_teacher_outo_class/:id_classroom
// @desc     Remove teacher outo class
// @access   Private
router.put(
  '/remove_teacher_outo_class/:id_classroom',
  checkObjectId('id_classroom'),
  authorize(role.Admin),
  async (req, res) => {
    try {
      const idClassroom = req.params.id_classroom
      await Classroom.findByIdAndUpdate(idClassroom, {
        $set: {
          headTeacher: {
            user: null,
            teacherName: ''
          }
        }
      })

      res.json({ msg: 'Xo?? gi??o vi??n ch??? nhi???m kh???i l???p h???c th??nh c??ng' })
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  }
)

// @route    PUT api/admin/add_parent
// @desc     ADD parent role
// @access   Private
router.put('/add_parent', authorize(role.Admin), async (req, res) => {
  const { username } = req.body

  try {
    const user = await User.findOne({ username })

    if (!user)
      return res.status(400).json({ msg: 'T??i kho???n n??y kh??ng t???n t???i!' })

    if (user.roles.includes(role.Teacher))
      return res.status(400).json({ msg: 'T??i kho???n n??y ??ang l?? gi??o vi??n' })
    if (user.roles.includes(role.Student))
      return res.status(400).json({ msg: 'T??i kho???n n??y ??ang l?? h???c sinh' })
    if (user.roles.includes(role.Admin))
      return res.status(400).json({ msg: 'T??i kho???n n??y ??ang l?? admin' })

    await User.findOneAndUpdate(
      { username: username },
      {
        $set: { roles: [role.Parent] }
      }
    )
    res.json({ msg: 'Th??m ph??? huynh th??nh c??ng' })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

module.exports = router
