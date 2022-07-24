const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  roles: {
    type: [String],
    default: ['guest'],
    enum: ['guest', 'student', 'teacher', 'admin', 'parent']
  },
  isDelete: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('user', UserSchema)
