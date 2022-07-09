const express = require('express')
const router = express.Router()
const authorize = require('../middleware/authorize')
const User = require('../models/User')
const Profile = require('../models/Profile')
const role = require('../helper/role')
const checkObjectId = require('../middleware/checkObjectId')
const Staff = require('../models/Staff')
const Classroom = require('../models/Classroom')

// @route    GET api/teacher/get_student_myclassroom
// @desc     Get student my classroom
// @access   Private
router.get(
  '/get_student_myclassroom',
  authorize(role.Teacher),
  async (req, res) => {
    try {
      const classroom = await Classroom.find()

      const result = classroom.filter(
        (c) =>
          c.headTeacher.user && c.headTeacher.user.toString() === req.user.id
      )

      res.json(result)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  }
)

// @route    PUT api/teacher/add_student/:id_classroom
// @desc     Add student
// @access   Private
router.put(
  '/add_student/:id_classroom',
  checkObjectId('id_classroom'),
  authorize(role.Teacher),
  async (req, res) => {
    const { username, address, phone, staffId, parentName, parentEmail } =
      req.body
    try {
      const student = await User.findOne({ username })
      const idClassroom = req.params.id_classroom
      const staff = await Staff.findById(staffId)
      const teacher = await User.findById(req.user.id)
      const classroom = await Classroom.findById(idClassroom)

      if (
        classroom.student.some(
          (s) => s.user.toString() === student._id.toString()
        )
      ) {
        return res
          .status(400)
          .json({ msg: 'Học sinh này đã tồn tại trong lớp học' })
      }

      await Profile.findOneAndUpdate(
        { user: student.id.toString() },
        {
          $set: {
            staffClass: {
              staff: staff.id.toString(),
              staffDisplay: staff.staffDisplay
            },
            address,
            phone,
            parentName,
            parentEmail
          }
        }
      )

      if (classroom.headTeacher.user.toString() !== teacher._id.toString())
        return res
          .status(400)
          .json({ msg: 'Bạn không phải là giáo viên chủ nhiệm của lớp này.' })

      await Classroom.findByIdAndUpdate(idClassroom, {
        $push: { student: { user: student._id.toString() } }
      })

      res.json({ msg: 'Thêm học sinh vào lớp học thành công' })
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  }
)

// @route    PUT api/teacher/move_student_to_trash/:id_classroom/:id_student
// @desc     Move student to trash
// @access   Private
router.put(
  '/move_student_to_trash/:id_classroom/:id_student',
  checkObjectId('id_classroom'),
  checkObjectId('id_student'),
  authorize(role.Teacher),
  async (req, res) => {
    try {
      const teacher = await User.findById(req.user.id)

      const classroom = await Classroom.findById(req.params.id_classroom)

      if (classroom.headTeacher.user.toString() !== teacher._id.toString())
        return res
          .status(400)
          .json({ msg: 'Bạn không phải là giáo viên chủ nhiệm của lớp này.' })

      await Classroom.findByIdAndUpdate(req.params.id_classroom, {
        $set: {
          student: classroom.student.map((s) => {
            if (s.user.toString() === req.params.id_student)
              return (s.isDelete = true)
          })
        }
      })

      res.json({ msg: 'Xoá học sinh vào thùng rác thành công' })
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  }
)

// @route    PUT api/teacher/delete_student/:id_classroom/:id_student
// @desc     Delete student
// @access   Private
router.put(
  '/delete_student/:id_classroom/:id_student',
  checkObjectId('id_classroom'),
  checkObjectId('id_student'),
  authorize(role.Teacher),
  async (req, res) => {
    try {
      const teacher = await User.findById(req.user.id)

      const classroom = await Classroom.findById(req.params.id_classroom)

      if (classroom.headTeacher.user.toString() !== teacher._id.toString())
        return res
          .status(400)
          .json({ msg: 'Bạn không phải là giáo viên chủ nhiệm của lớp này.' })

      await Classroom.findByIdAndUpdate(req.params.id_classroom, {
        $set: {
          student: classroom.student.filter(
            (s) => s.user.toString() === req.params.id_student
          )
        }
      })

      res.json({ msg: 'Xoá học sinh thành công' })
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  }
)

module.exports = router
