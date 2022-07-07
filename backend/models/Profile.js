const mongoose = require('mongoose')

const ProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
    fullName: {
      type: String,
    },
    avatar: {
      type: String,
    },
    birthday: {
      type: String,
      default: Date.now,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('profile', ProfileSchema)
