const express = require('express')
const router = express.Router()
const authorize = require('../middleware/authorize')
const User = require('../models/User')
const Profile = require('../models/Profile')
const role = require('../helper/role')
const checkObjectId = require('../middleware/checkObjectId')
const Staff = require('../models/Staff')
const Classroom = require('../models/Classroom')
const Classnews = require('../models/Classnews')
const Notify = require('../models/Notify')
const ParentIn4 = require('../models/ParentIn4')
const Parentnews = require('../models/Parentnews')

// @route    GET api/teacher/get_student_myclassroom
// @desc     Get student my classroom
// @access   Private
router.get('/get_student_myclassroom', authorize(), async (req, res) => {
  try {
    const classroom = await Classroom.find()
    const profileStudent = await Profile.find()

    const result = classroom.filter(
      (c) => c.headTeacher.user && c.headTeacher.user.toString() === req.user.id
    )

    if (result.length === 0) res.json([])

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
// @route    GET api/teacher/get_parent_myclassroom
// @desc     Get parent my classroom
// @access   Private
router.get(
  '/get_parent_myclassroom',
  authorize(role.Teacher),
  async (req, res) => {
    try {
      const classroom = await Classroom.find()
      const profileParent = await Profile.find()

      const result = classroom.filter(
        (c) =>
          c.headTeacher.user && c.headTeacher.user.toString() === req.user.id
      )

      if (result.length === 0) res.json([])

      const parentsTemp = result[0].parents.map((s) => {
        let fullName = ''
        profileParent.forEach((p) => {
          if (p.user.toString() === s.user.toString()) {
            fullName = p.fullName
          }
        })

        return {
          parentId: s.user.toString(),
          fullName,
          isDelete: s.isDelete
        }
      })

      const respone = {
        ...result[0]._doc,
        parents: parentsTemp
      }

      res.json(respone)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  }
)

// @route    PUT api/teacher/update_student/:id_classroom/:id_student
// @desc     Update student
// @access   Private
router.put(
  '/update_student/:id_student',
  checkObjectId('id_student'),
  authorize(role.Teacher),
  async (req, res) => {
    const { address, phone, staffCode = 0, parentName, parentEmail } = req.body
    try {
      const staff = await Staff.findOne({ staffCode })

      await Profile.findOneAndUpdate(
        { user: req.params.id_student },
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

      res.json({ msg: 'Cập nhật thành công!' })
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
    const {
      username,
      address,
      phone,
      staffCode = 0,
      parentName,
      parentEmail
    } = req.body
    try {
      const student = await User.findOne({ username })
      const idClassroom = req.params.id_classroom
      const staff = await Staff.findOne({ staffCode })
      const teacher = await User.findById(req.user.id)
      const classroom = await Classroom.findById(idClassroom)

      if (
        classroom.students.some(
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
      await User.findByIdAndUpdate(student.id.toString(), {
        $set: {
          roles: [role.Student]
        }
      })

      if (classroom.headTeacher.user.toString() !== teacher._id.toString())
        return res
          .status(400)
          .json({ msg: 'Bạn không phải là giáo viên chủ nhiệm của lớp này.' })

      await Classroom.findByIdAndUpdate(idClassroom, {
        $push: { students: { user: student._id.toString() } }
      })

      const result = await Classroom.findById(req.params.id_classroom)
      res.json(result)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  }
)

// @route    PUT api/teacher/add_parent/:id_classroom
// @desc     Add parent
// @access   Private
router.put(
  '/add_parent/:id_classroom',
  checkObjectId('id_classroom'),
  authorize(role.Teacher),
  async (req, res) => {
    const { username } = req.body
    try {
      const parent = await User.findOne({ username })
      const idClassroom = req.params.id_classroom

      const teacher = await User.findById(req.user.id)
      const classroom = await Classroom.findById(idClassroom)

      if (
        classroom.parents.some(
          (s) => s.user.toString() === parent._id.toString()
        )
      ) {
        return res
          .status(400)
          .json({ msg: 'Phụ huynh này đã tồn tại trong lớp học' })
      }

      if (!parent)
        return res.status(400).json({ msg: 'Phụ huynh này không tồn tại' })

      if (!parent.roles.includes(role.Parent))
        return res
          .status(400)
          .json({ msg: 'Tài khoản này không phải phụ huynh' })

      if (classroom.headTeacher.user.toString() !== teacher._id.toString())
        return res
          .status(400)
          .json({ msg: 'Bạn không phải là giáo viên chủ nhiệm của lớp này.' })

      await Classroom.findByIdAndUpdate(idClassroom, {
        $push: { parents: { user: parent._id.toString() } }
      })
      await ParentIn4.findOneAndUpdate(
        { user: parent._id.toString() },
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

      const result = await Classroom.findById(req.params.id_classroom)
      res.json(result)
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
          students: classroom.students.map((s) => {
            if (s.user.toString() === req.params.id_student)
              return { ...s._doc, isDelete: true }
            else return s._doc
          })
        }
      })

      const result = await Classroom.findById(req.params.id_classroom)
      res.json(result)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  }
)

// @route    PUT api/teacher/move_parent_to_trash/:id_classroom/:id_parent
// @desc     Move parent to trash
// @access   Private
router.put(
  '/move_parent_to_trash/:id_classroom/:id_parent',
  checkObjectId('id_classroom'),
  checkObjectId('id_parent'),
  authorize(role.Teacher),
  async (req, res) => {
    try {
      const teacher = await User.findById(req.user.id)

      const classroom = await Classroom.findById(req.params.id_classroom)
      const parentIn4 = await ParentIn4.findOne({ user: req.params.id_parent })

      if (classroom.headTeacher.user.toString() !== teacher._id.toString())
        return res
          .status(400)
          .json({ msg: 'Bạn không phải là giáo viên chủ nhiệm của lớp này.' })

      await Classroom.findByIdAndUpdate(req.params.id_classroom, {
        $set: {
          parents: classroom.parents.map((s) => {
            if (s.user.toString() === req.params.id_parent)
              return { ...s._doc, isDelete: true }
            else return s._doc
          })
        }
      })

      await ParentIn4.findOneAndUpdate(
        { user: req.params.id_parent },
        {
          $set: {
            classroomIn4: parentIn4.classroomIn4.map((c) => {
              if (c.class.toString() === req.params.id_classroom)
                return { ...c._doc, isDelete: true }
              else return c._doc
            })
          }
        }
      )

      const result = await Classroom.findById(req.params.id_classroom)
      res.json(result)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  }
)

// @route    PUT api/teacher/restore_student/:id_classroom/:id_student
// @desc     Restore student
// @access   Private
router.put(
  '/restore_student/:id_classroom/:id_student',
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
          students: classroom.students.map((s) => {
            if (s.user.toString() === req.params.id_student)
              return { ...s._doc, isDelete: false }
            else return s._doc
          })
        }
      })

      const result = await Classroom.findById(req.params.id_classroom)
      res.json(result)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  }
)

// @route    PUT api/teacher/restore_parent/:id_classroom/:id_parent
// @desc     Restore parent
// @access   Private
router.put(
  '/restore_parent/:id_classroom/:id_parent',
  checkObjectId('id_classroom'),
  checkObjectId('id_parent'),
  authorize(role.Teacher),
  async (req, res) => {
    try {
      const teacher = await User.findById(req.user.id)
      const parentIn4 = await ParentIn4.findOne({ user: req.params.id_parent })
      const classroom = await Classroom.findById(req.params.id_classroom)
      if (classroom.headTeacher.user.toString() !== teacher._id.toString())
        return res
          .status(400)
          .json({ msg: 'Bạn không phải là giáo viên chủ nhiệm của lớp này.' })

      await Classroom.findByIdAndUpdate(req.params.id_classroom, {
        $set: {
          parents: classroom.parents.map((s) => {
            if (s.user.toString() === req.params.id_parent)
              return { ...s._doc, isDelete: false }
            else return s._doc
          })
        }
      })

      await ParentIn4.findOneAndUpdate(
        { user: req.params.id_parent },
        {
          $set: {
            classroomIn4: parentIn4.classroomIn4.map((c) => {
              if (c.class.toString() === req.params.id_classroom)
                return { ...c._doc, isDelete: false }
              else return c._doc
            })
          }
        }
      )

      const result = await Classroom.findById(req.params.id_classroom)
      res.json(result)
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
          students: classroom.students.filter(
            (s) => s.user.toString() !== req.params.id_student
          )
        }
      })

      await User.findByIdAndUpdate(s.user.toString(), {
        $set: { roles: [role.Guesst] }
      })
      const result = await Classroom.findById(req.params.id_classroom)
      res.json(result)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  }
)

// @route    PUT api/teacher/delete_parent/:id_classroom/:id_parent
// @desc     Delete parent
// @access   Private
router.put(
  '/delete_parent/:id_classroom/:id_parent',
  checkObjectId('id_classroom'),
  checkObjectId('id_parent'),
  authorize(role.Teacher),
  async (req, res) => {
    try {
      const teacher = await User.findById(req.user.id)
      const parentIn4 = await ParentIn4.findOne({ user: req.params.id_parent })
      const classroom = await Classroom.findById(req.params.id_classroom)

      if (classroom.headTeacher.user.toString() !== teacher._id.toString())
        return res
          .status(400)
          .json({ msg: 'Bạn không phải là giáo viên chủ nhiệm của lớp này.' })

      if (!parentIn4) {
        return res.status(400).json({ msg: 'Vui lòng thử lại sau!' })
      }

      await Classroom.findByIdAndUpdate(req.params.id_classroom, {
        $set: {
          parents: classroom.parents.filter(
            (s) => s.user.toString() !== req.params.id_parent
          )
        }
      })

      const classTemp = parentIn4.classroomIn4
      await ParentIn4.findOneAndUpdate(
        { user: req.params.id_parent },
        {
          $set: {
            classroomIn4: classTemp.filter(
              (c) => c.class.toString() !== req.params.id_classroom
            )
          }
        }
      )

      const result = await Classroom.findById(req.params.id_classroom)
      res.json(result)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  }
)

// @route    POST api/teacher/add_classnews
// @desc     Add class news
// @access   Private
router.post('/add_classnews', authorize(role.Teacher), async (req, res) => {
  const { title, text } = req.body
  try {
    const classrooms = await Classroom.find()
    const profile = await Profile.findOne({ user: req.user.id })

    const classroom = classrooms.filter(
      (c) =>
        (c.headTeacher.user && c.headTeacher.user.toString() === req.user.id) ||
        c.students.some((s) => s.user.toString() === req.user.id)
    )

    const recipient = []
    classroom[0].students.forEach((c) =>
      recipient.push({ user: c.user.toString() })
    )

    const newClassnews = new Classnews({
      user: req.user.id,
      classroom: classroom[0]._id.toString(),
      author: {
        name: profile.fullName,
        avatar: profile.avatar
      },
      title,
      text
    })
    await newClassnews.save()

    const notify = new Notify({
      user: req.user.id,
      text: 'Giáo viên chủ nhiệm vừa đăng bản tin',
      classnews: newClassnews._id.toString(),
      recipient
    })

    await notify.save()

    res.json(newClassnews)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// @route    PUT api/teacher/add_children/:id_parent
// @desc     Add children for parent
// @access   Private
router.put(
  '/add_children/:id_parent',
  checkObjectId('id_parent'),
  authorize(role.Teacher),
  async (req, res) => {
    const { childrenUsername } = req.body

    try {
      const parentin4 = await ParentIn4.findOne({ user: req.params.id_parent })
      const profileChild = await Profile.findOne({
        username: childrenUsername
      })
      const classroom = await Classroom.find()

      const result = classroom.filter(
        (c) =>
          (c.headTeacher.user &&
            c.headTeacher.user.toString() === req.user.id) ||
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
        return res.status(400).json({
          msg: 'Học sinh này đã tồn tại trong tài khoản của phụ huynh!'
        })

      await ParentIn4.findOneAndUpdate(
        { user: req.params.id_parent },
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
  }
)

// @route    PUT api/teacher/remove_student/:id_parent/:id_student
// @desc     Remove children for parent
// @access   Private
router.put(
  '/remove_student/:id_parent/:id_student',
  checkObjectId('id_parent'),
  checkObjectId('id_student'),
  authorize(role.Teacher),
  async (req, res) => {
    try {
      const parentin4 = await ParentIn4.findOne({ user: req.params.id_parent })
      const profileChild = await Profile.findOne({
        user: req.params.id_student
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
        { user: req.params.id_parent },
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

// @route    GET api/teacher/get_classnews/:id_classnews
// @desc     Get classnews
// @access   Private
router.get(
  '/get_classnews/:id_classnews',
  checkObjectId('id_classnews'),
  authorize(role.Teacher),
  async (req, res) => {
    try {
      const classnews = await Classnews.findById(req.params.id_classnews)
      res.json(classnews)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  }
)

// @route    PUT api/teacher/update_classnews/:id_classnews
// @desc     Update class news
// @access   Private
router.put(
  '/update_classnews/:id_classnews',
  checkObjectId('id_classnews'),
  authorize(role.Teacher),
  async (req, res) => {
    const { title, text } = req.body
    try {
      const classrooms = await Classroom.find()
      const idClassnews = req.params.id_classnews
      const classroom = classrooms.filter(
        (c) =>
          (c.headTeacher.user &&
            c.headTeacher.user.toString() === req.user.id) ||
          c.students.some((s) => s.user.toString() === req.user.id)
      )
      await Classnews.findByIdAndUpdate(idClassnews, { $set: { title, text } })

      const recipient = []
      classroom[0].students.forEach((c) =>
        recipient.push({ user: c.user.toString() })
      )

      const notify = new Notify({
        user: req.user.id,
        text: 'Giáo viên chủ nhiệm vừa cập nhật bản tin',
        classnews: idClassnews.toString(),
        recipient
      })

      await notify.save()

      res.json({ msg: 'Cập nhật bản tin thành công' })
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  }
)

// @route    DELETE api/teacher/delete_classnews/:id_classnews
// @desc     Delete class news
// @access   Private
router.delete(
  '/delete_classnews/:id_classnews',
  checkObjectId('id_classnews'),
  authorize(role.Teacher),
  async (req, res) => {
    try {
      await Classnews.findByIdAndDelete(req.params.id_classnews)
      res.json({ msg: 'Xoá bản tin thành công' })
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  }
)

// @route    GET api/teacher/get_myparentnews
// @desc     GET my parentnews
// @access   Private
router.get('/get_myparentnews', authorize(role.Teacher), async (req, res) => {
  try {
    const parentnews = await Parentnews.find({ user: req.user.id })
    res.json(parentnews)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// @route    GET api/teacher/get_parentnews/:id_parentnews
// @desc     Get classnews
// @access   Private
router.get(
  '/get_parentnews/:id_parentnews',
  checkObjectId('id_parentnews'),
  authorize(role.Teacher),
  async (req, res) => {
    try {
      const parentnews = await Parentnews.findById(req.params.id_parentnews)
      res.json(parentnews)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  }
)

// @route    POST api/teacher/add_parentnews
// @desc     Add parent news
// @access   Private
router.post('/add_parentnews', authorize(role.Teacher), async (req, res) => {
  const { title, text } = req.body
  try {
    const classrooms = await Classroom.find()
    const profile = await Profile.findOne({ user: req.user.id })
    const parentsIn4 = await ParentIn4.find()

    const classroom = classrooms.filter(
      (c) =>
        (c.headTeacher.user && c.headTeacher.user.toString() === req.user.id) ||
        c.students.some((s) => s.user.toString() === req.user.id)
    )

    const parents = parentsIn4.filter((p) =>
      p.classroomIn4.some(
        (c) => c.class.toString() === classroom[0]._id.toString()
      )
    )

    const recipient = []
    parents.forEach((p) => recipient.push({ user: p.user.toString() }))

    const newParentnews = new Parentnews({
      user: req.user.id,
      classroom: classroom[0]._id.toString(),
      author: {
        name: profile.fullName,
        avatar: profile.avatar
      },
      title,
      text
    })
    await newParentnews.save()

    const notify = new Notify({
      user: req.user.id,
      text: 'Giáo viên chủ nhiệm vừa đăng bản tin',
      parentnews: newParentnews._id.toString(),
      recipient
    })

    await notify.save()

    res.json(newParentnews)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// @route    PUT api/teacher/update_parentnews/:id_parentnews
// @desc     Update prarent news
// @access   Private
router.put(
  '/update_parentnews/:id_parentnews',
  checkObjectId('id_parentnews'),
  authorize(role.Teacher),
  async (req, res) => {
    const { title, text } = req.body
    try {
      const classrooms = await Classroom.find()
      const parentsIn4 = await ParentIn4.find()
      const idParentnews = req.params.id_parentnews
      const classroom = classrooms.filter(
        (c) =>
          (c.headTeacher.user &&
            c.headTeacher.user.toString() === req.user.id) ||
          c.students.some((s) => s.user.toString() === req.user.id)
      )
      await Parentnews.findByIdAndUpdate(idParentnews, {
        $set: { title, text }
      })

      const parents = parentsIn4.filter((p) =>
        p.classroomIn4.some(
          (c) => c.class.toString() === classroom[0]._id.toString()
        )
      )

      const recipient = []
      parents.forEach((p) => recipient.push({ user: p.user.toString() }))

      const notify = new Notify({
        user: req.user.id,
        text: 'Giáo viên chủ nhiệm vừa cập nhật bản tin',
        parentnews: idParentnews.toString(),
        recipient
      })

      await notify.save()

      res.json({ msg: 'Cập nhật bản tin thành công' })
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  }
)

// @route    DELETE api/teacher/delete_parentnews/:id_parentnews
// @desc     Delete parent news
// @access   Private
router.delete(
  '/delete_parentnews/:id_parentnews',
  checkObjectId('id_parentnews'),
  authorize(role.Teacher),
  async (req, res) => {
    try {
      await Parentnews.findByIdAndDelete(req.params.id_parentnews)
      res.json({ msg: 'Xoá bản tin thành công' })
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  }
)

module.exports = router
