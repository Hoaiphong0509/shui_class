const express = require('express')
const router = express.Router()
const authorize = require('../middleware/authorize')
const User = require('../models/User')
const Profile = require('../models/Profile')
const role = require('../helper/role')
const checkObjectId = require('../middleware/checkObjectId')
const Classroom = require('../models/Classroom')
const ParentIn4 = require('../models/ParentIn4')

// @route    GET api/admin/users
// @desc     Get all users
// @access   Private
router.get('/users', authorize(role.Admin), async (req, res) => {
  try {
    const users = await User.find()

    res.json(users)
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
    const result = await User.find({ roles: [role.Teacher] })

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
    await User.findOneAndUpdate(
      { username: username },
      {
        $set: { roles: [role.Teacher] }
      }
    )
    res.json({ msg: 'Thêm giáo viên thành công' })
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
        return res.status(400).json({ msg: 'Tài khoản này không tồn tại' })
      }

      if (!teacher.roles.includes(role.Teacher)) {
        return res
          .status(400)
          .json({ msg: 'Tài khoản này không phải là giáo viên' })
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
          .json({ msg: 'Lớp học này đã có giáo viên chủ nhiệm' })

      await Classroom.findByIdAndUpdate(idClassroom, {
        $set: {
          headTeacher: {
            user: teacher.id.toString(),
            teacherName: profileTeacher.fullName
          }
        }
      })

      res.json({ msg: 'Thêm giáo viên chủ nhiệm vào lớp học thành công' })
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

      res.json({ msg: 'Xoá giáo viên chủ nhiệm khỏi lớp học thành công' })
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  }
)

// @route    PUT api/admin/add_parent
// @desc     ADD parent into class
// @access   Private
router.put('/add_parent', authorize(role.Admin), async (req, res) => {
  const { username } = req.body
  try {
    const user = await User.findOne({ username })

    if (user.roles.includes(role.Teacher))
      return res.status(400).json({ msg: 'Tài khoản này đang là giáo viên' })

    await User.findOneAndUpdate(
      { username: username },
      {
        $set: { roles: [role.Parent] }
      }
    )
    res.json({ msg: 'Thêm phụ huynh thành công' })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// @route    PUT api/admin/add_parent_into_class
// @desc     ADD teacher into class
// @access   Private
router.put(
  '/add_parent_into_class',
  authorize(role.Admin),
  async (req, res) => {
    const { username, className } = req.body
    try {
      const classroom = await Classroom.findOne({ name: className })
      const parent = await User.findOne({ username })
      const profile = await Profile.findOne({ username })

      if (!classroom) {
        return res.status(400).json({ msg: 'Lớp học không tồn tại' })
      }
      if (!parent) {
        return res.status(400).json({ msg: 'Tài khoản này không tồn tại' })
      }

      if (!parent.roles.includes(role.Parent)) {
        return res
          .status(400)
          .json({ msg: 'Tài khoản này không phải là phụ huynh' })
      }

      const parenttemp = await ParentIn4.findOne({
        username
      })

      if (!parenttemp) {
        const parentinfor = new ParentIn4({
          username,
          fullName: profile.fullName,
          classroomIn4: {
            class: classroom._id.toString(),
            name: classroom.name,
            isDelete: false
          }
        })

        await parentinfor.save()

        return res.json({ msg: 'Thêm phụ huynh vào lớp học thành công!' })
      } else if (!parenttemp.classroomIn4.some((c) => c.name === className)) {
        await ParentIn4.findOneAndUpdate(
          { username },
          {
            $push: {
              classroomIn4: {
                class: classroom._id.toString(),
                name: classroom.name,
                isDelete: false
              }
            }
          }
        )
        return res.json({ msg: 'Thêm phụ huynh vào lớp học thành công!' })
      } else {
        return res
          .status(400)
          .json({ msg: 'Phụ huynh này đã ở trong lớp học!' })
      }
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  }
)

// @route    PUT api/admin/remove_class_for_parent
// @desc     Remove class for parent
// @access   Private
router.put(
  '/remove_class_for_parent',
  authorize(role.Admin),
  async (req, res) => {
    const { username, className } = req.body
    try {
      const parent = await User.findOne({ username })
      const classroom = await Classroom.findOne({ name: className })
      const parenttemp = await ParentIn4.findOne({ username })

      if (!classroom) {
        return res.status(400).json({ msg: 'Lớp học không tồn tại' })
      }
      if (!parent) {
        return res.status(400).json({ msg: 'Tài khoản này không tồn tại' })
      }

      if (!parent.roles.includes(role.Parent)) {
        return res
          .status(400)
          .json({ msg: 'Tài khoản này không phải là phụ huynh' })
      }

      if (!parenttemp) {
        return res.status(400).json({ msg: 'Vui lòng thử lại sau!' })
      }

      const classTemp = parenttemp.classroomIn4

      await ParentIn4.findOneAndUpdate(
        { username },
        {
          $set: {
            classroomIn4: classTemp.filter((c) => c.name !== className)
          }
        }
      )

      res.json({ msg: 'Xoá phụ huynh ra khỏi lớp học thành công' })
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  }
)

module.exports = router
