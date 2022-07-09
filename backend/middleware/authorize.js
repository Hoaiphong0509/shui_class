const jwt = require('jsonwebtoken')
const User = require('../models/User')
const { SECRET } = require('../config')

const authorize = (roles = []) => {
  if (typeof roles === 'string') {
    roles = [roles]
  }
  return (req, res, next) => {
    try {
      const authHeader = req.headers['authorization']
      const token = authHeader && authHeader.split(' ')[1]

      if (token == null) return res.sendStatus(401)

      jwt.verify(token, SECRET, async (error, decoded) => {
        if (error) {
          return res.status(401).json({ msg: 'Token is not valid' })
        } else {
          req.user = decoded.user
          const user = await User.findById(req.user.id)

          if (roles.length && !user.roles.includes(roles)) {
            return res.status(401).json({ msg: 'Không có quyền!' })
          }

          next()
        }
      })
    } catch (err) {
      console.log('something wrong with auth middleware')
      res.status(500).json({ msg: 'Server Error' })
    }
  }
}
module.exports = authorize
