const express = require('express')
const router = express.Router()
const authorize = require('../middleware/authorize')
const User = require('../models/User')
const Profile = require('../models/Profile')
const role = require('../helper/role')

// @route    GET api/student
// @desc     Get all students
// @access   Private
router.get('/', authorize(), async (req, res) => {
  try {
    const students = await User.find({ roles: [role.Student] })
    const profiles = await Profile.find()

    const result = profiles.filter((p) =>
      students.some((s) => s._id.toString() === p.user.toString())
    )

    res.json(result)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

module.exports = router
