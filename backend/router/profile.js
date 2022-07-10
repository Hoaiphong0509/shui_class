const express = require('express')
const router = express.Router()
const authorize = require('../middleware/authorize')
const Profile = require('../models/Profile')
const multer = require('multer')
const bufferUpload = require('../utils/bufferUpload')
const multerSingle = multer()
const { CLOUDINARY_PATH_AVATAR } = require('../config')
const removeImage = require('../utils/removeImage')
const checkObjectId = require('../middleware/checkObjectId')

// @route    GET api/profile/me
// @desc     Get current profile
// @access   Private
router.get('/me', authorize(), async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id })
    res.json(profile)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// @route    GET api/profile/:id_user
// @desc     Get profile by id user
// @access   Private
router.get(
  '/:id_user',
  checkObjectId('id_user'),
  authorize(),
  async (req, res) => {
    try {
      const profile = await Profile.findOne({ user: req.params.id_user })
      res.json(profile)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  }
)

// @route    PUT api/profile
// @desc     Update profile
// @access   Public
router.put('/', authorize(), async (req, res) => {
  const { fullName, birthday } = req.body
  // console.log('req.user.id', req.user.id)
  try {
    await Profile.findOneAndUpdate(
      { user: req.user.id },
      { $set: { fullName, birthday } }
    )
    res.json({ msg: 'Cập nhật hồ sơ thành công' })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
})

// @route  POST api/profile/change_avatar
// @desc   Change avatar
// @access Private
router.put(
  '/change_avatar',
  authorize(),
  multerSingle.single('img'),
  async (req, res) => {
    const { buffer } = req.file
    try {
      const { secure_url } = await bufferUpload(
        buffer,
        CLOUDINARY_PATH_AVATAR,
        'avatar',
        70,
        70
      )

      const profile = await Profile.findOne({ user: req.user.id })
      if (profile && profile.avatar && profile.avatar.length > 0) {
        const firstTndex = profile.avatar.lastIndexOf('/ShuiClass')
        const format = normalizeFormatImg(blog.avatar)
        const lastTndex = profile.avatar.indexOf(format)
        const publidId = profile.avatar.substring(firstTndex + 1, lastTndex)
        await removeImage(publidId)
      }

      profile.avatar = secure_url
      await profile.save()

      return res.send(profile)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server error')
    }
  }
)

module.exports = router
