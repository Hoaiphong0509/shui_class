const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    },
    staffClass: [
      {
        staff: {
          type: Schema.Types.ObjectId
        },
        staffDisplay: {
          type: String
        },
        staffCode: {
          type: Number
        }
      }
    ],
    note: {
      type: String
    },
    username: {
      type: String
    },
    fullName: {
      type: String
    },
    avatar: {
      type: String
    },
    birthday: {
      type: String
    },
    address: {
      type: String
    },
    phone: {
      type: String
    },
    parentName: {
      type: String
    },
    parentEmail: {
      type: String
    },
    date: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('profile', ProfileSchema)
