const express = require('express')
const router = express.Router()
const authorize = require('../middleware/authorize')
const Staff = require('../models/Staff')
const role = require('../helper/role')
const checkObjectId = require('../middleware/checkObjectId')

// @route    GET api/staff
// @desc     Get all Staff
// @access   Private
router.get('/', authorize(), async (req, res) => {
  try {
    const result = await Staff.find()

    res.json(result)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// @route    GET api/staff
// @desc     Get all Staff isDelete = false
// @access   Private
router.get('/staff_available', authorize(role.Admin), async (req, res) => {
  try {
    const result = await Staff.find({ isDelete: false })

    res.json(result)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// @route    POST api/staff
// @desc     ADD Staff
// @access   Private
router.post('/', authorize(role.Admin), async (req, res) => {
  const { staffDisplay } = req.body
  try {
    const newStaff = new Staff({
      staffDisplay
    })

    await newStaff.save()
    res.json(newStaff)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// @route    DELETE api/staff/:id
// @desc     Move to trash
// @access   Private
router.put(
  '/:id',
  checkObjectId('id'),
  authorize(role.Admin),
  async (req, res) => {
    try {
      const idStaff = req.params.id
      await Staff.findByIdAndUpdate(idStaff, {
        $set: { isDelete: true }
      })

      res.json({ msg: 'Xoá thành công!' })
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  }
)

// @route    DELETE api/staff/:id
// @desc     Delete Staff
// @access   Private
router.delete(
  '/:id',
  checkObjectId('id'),
  authorize(role.Admin),
  async (req, res) => {
    try {
      const idStaff = req.params.id
      await Staff.findByIdAndRemove(idStaff)

      res.json({ msg: 'Xoá vĩnh viễn thành công!' })
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  }
)

module.exports = router
