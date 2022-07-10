const express = require('express')
const router = express.Router()
const authorize = require('../middleware/authorize')
const role = require('../helper/role')
const checkObjectId = require('../middleware/checkObjectId')
const Score = require('../models/Score')

// @route    GET api/score/
// @desc     Get all score
// @access   Private
router.get('/', authorize(), async (req, res) => {
  try {
    const scores = await Score.find()

    res.json(scores)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// @route    GET api/score/:id_student
// @desc     Get score by student
// @access   Private
router.get(
  '/:id_student',
  checkObjectId('id_student'),
  authorize(),
  async (req, res) => {
    try {
      const score = await Score.find({ user: req.params.id_student })

      res.json(score)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  }
)

// @route    POST api/score/:id_student
// @desc     Add score for student
// @access   Private
router.post(
  '/:id_student',
  checkObjectId('id_student'),
  authorize(role.Teacher),
  async (req, res) => {
    const { ...rest } = req.body
    try {
      const newScore = new Score({
        user: req.params.id_student,
        ...rest
      })

      await newScore.save()
      res.json({msg: "Thêm điểm thành công!"})
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  }
)

// @route    PUT api/score/:id_student
// @desc     Update score for student
// @access   Private
router.put(
  '/:id_student',
  checkObjectId('id_student'),
  authorize(role.Teacher),
  async (req, res) => {
    const { hk, ...rest } = req.body
    try {
      await Score.findOneAndUpdate(
        { user: req.params.id_student, hk },
        { $set: { ...rest } }
      )
    
      res.json({msg: "Cập nhật điểm thành công!"})
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  }
)

module.exports = router
