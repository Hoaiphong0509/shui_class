const express = require('express')
const router = express.Router()
const authorize = require('../middleware/authorize')
const role = require('../helper/role')
const checkObjectId = require('../middleware/checkObjectId')
const Classroom = require('../models/Classroom')
const Profile = require('../models/Profile')

// @route    GET api/classroom
// @desc     Get all classroom
// @access   Private
router.get('/', authorize(role.Admin), async (req, res) => {
  try {
    const result = await Classroom.find()

    res.json(result)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// @route    GET api/classroom/classroom_available
// @desc     Get all classroom available
// @access   Private
router.get('/classroom_available', authorize(role.Admin), async (req, res) => {
  try {
    const result = await Classroom.find({ isDelete: false })

    res.json(result)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// @route    GET api/classroom/get_myclassroom
// @desc     Get student my classroom
// @access   Private
router.get('/get_myclassroom', authorize(), async (req, res) => {
  try {
    const classroom = await Classroom.find()
    const profileStudent = await Profile.find()

    const result = classroom.filter(
      (c) =>
        (c.headTeacher.user && c.headTeacher.user.toString() === req.user.id) ||
        c.students.some((s) => s.user.toString() === req.user.id)
    )

    if (result.length === 0) {
      return res.json([])
    }

    const studentsTemp = result[0].students.map((s) => {
      let fullName = ''
      let staffDisplay = ''
      let parentName = ''
      profileStudent.forEach((p) => {
        if (p.user.toString() === s.user.toString()) {
          fullName = p.fullName
          staffDisplay = p.staffClass[0].staffDisplay || 'Học sinh'
          parentName = p.parentName
        }
      })
      return {
        studentId: s.user.toString(),
        fullName,
        staffDisplay,
        parentName,
        isDelete: s.isDelete
      }
    })

    const respone = {
      ...result[0]._doc,
      students: studentsTemp
    }

    res.json(respone)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// @route    POST api/classroom
// @desc     Add classrom
// @access   Private
router.post('/', authorize(role.Admin), async (req, res) => {
  const { name } = req.body
  try {
    const classroom = await Classroom.findOne({ name })

    if (classroom) {
      return res.status(400).json({ msg: 'Lớp học này đã tồn tại' })
    }

    const newClassroom = new Classroom({
      name,
      headTeacher: { user: null, teacherName: '' }
    })

    await newClassroom.save()

    res.json(newClassroom)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// @route    PUT api/classroom/change_name/:id
// @desc     Add classrom
// @access   Private
router.put(
  '/change_name/:id',
  checkObjectId('id'),
  authorize(role.Admin),
  async (req, res) => {
    const { name } = req.body
    try {
      const idClassroom = req.params.id

      const classroom = await Classroom.findOne({ name })

      if (classroom) {
        return res.status(400).json({ msg: 'Lớp học này đã tồn tại' })
      }

      await Classroom.findByIdAndUpdate(idClassroom, {
        $set: {
          name
        }
      })

      res.json({ msg: 'Thay đổi tên lớp học thành công' })
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  }
)

// @route    PUT api/classroom/move_to_trash/:id
// @desc     Move to trash classroom
// @access   Private
router.put(
  '/move_to_trash/:id',
  checkObjectId('id'),
  authorize(role.Admin),
  async (req, res) => {
    try {
      const idClassroom = req.params.id

      await Classroom.findByIdAndUpdate(idClassroom, {
        $set: {
          isDelete: true
        }
      })

      res.json({ msg: 'Xoá lớp học vào thùng rác thành công' })
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  }
)

// @route    PUT api/classroom/restore/:id
// @desc     Restore classroom
// @access   Private
router.put(
  '/restore/:id',
  checkObjectId('id'),
  authorize(role.Admin),
  async (req, res) => {
    try {
      const idClassroom = req.params.id

      await Classroom.findByIdAndUpdate(idClassroom, {
        $set: {
          isDelete: false
        }
      })

      res.json({ msg: 'Khôi phục lớp học thành công' })
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  }
)

module.exports = router
