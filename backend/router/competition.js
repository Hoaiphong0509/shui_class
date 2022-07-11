const express = require('express')
const router = express.Router()
const authorize = require('../middleware/authorize')
const role = require('../helper/role')
const checkObjectId = require('../middleware/checkObjectId')
const Competition = require('../models/Competition')

// @route    GET api/competion/
// @desc     Get all competions
// @access   Private
router.get('/', authorize(), async (req, res) => {
  try {
    const competions = await Competition.find()

    res.json(competions)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// @route    GET api/competion/:id_student
// @desc     Get competion by student
// @access   Private
router.get(
  '/:id_student',
  checkObjectId('id_student'),
  authorize(),
  async (req, res) => {
    try {
      const competion = await Competition.find({ user: req.params.id_student })

      res.json(competion)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  }
)

// @route    POST api/competion/:id_student
// @desc     Add competion for student
// @access   Private
router.post(
  '/:id_student',
  checkObjectId('id_student'),
  authorize(role.Teacher),
  async (req, res) => {
    const { ...rest } = req.body
    try {
      const newCompetion = new Competition({
        user: req.params.id_student,
        ...rest
      })

      await newCompetion.save()
      res.json({ msg: 'Thêm điểm thi đua thành công!' })
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  }
)

// @route    PUT api/competion/:id_student
// @desc     Update competion for student
// @access   Private
router.put(
  '/:id_student',
  checkObjectId('id_student'),
  authorize(role.Teacher),
  async (req, res) => {
    const { hk, ...rest } = req.body
    try {
      await Competition.findOneAndUpdate(
        { user: req.params.id_student, hk },
        { $set: { ...rest } }
      )

      res.json({ msg: 'Cập nhật điểm thi đua thành công!' })
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  }
)

module.exports = router
