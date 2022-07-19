const express = require('express')
const router = express.Router()
const authorize = require('../middleware/authorize')
const Staff = require('../models/Staff')
const role = require('../helper/role')
const checkObjectId = require('../middleware/checkObjectId')
const Notify = require('../models/Notify')

// @route    GET api/notify
// @desc     Get my notifies
// @access   Private
router.get('/me', authorize(), async (req, res) => {
  try {
    const notifies = await Notify.find()
    console.log('notifies', notifies)
    const result = []

    notifies.forEach((n) => {
      if (n.recipient.length === 0) return
      else if (n.recipient.some((r) => r?.user?.toString() === req.user.id))
        result.push(n)
    })

    res.json(result)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// @route    PUT api/notify/delete_notify/:id_notify
// @desc     Delete notify
// @access   Private
router.put(
  '/delete_notify/:id_notify',
  checkObjectId('id_notify'),
  authorize(),
  async (req, res) => {
    try {
      const notify = await Notify.findById(req.params.id_notify)

      const newrecipient = notify.recipient.filter(
        (r) => r?.user?.toString() !== req.user.id
      )
      await Notify.findByIdAndUpdate(req.params.id_notify, {
        $set: { recipient: newrecipient }
      })

      res.json({ msg: 'Xoá thông báo thành công' })
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  }
)

module.exports = router
