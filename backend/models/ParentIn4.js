const mongoose = require('mongoose')

const ParentIn4Schema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  username: {
    type: String,
    require: true,
    unique: true
  },
  fullName: {
    type: String,
    require: true
  },
  classroomIn4: [
    {
      class: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'class'
      },
      name: {
        type: String
      },
      isDelete: {
        type: Boolean,
        default: false
      }
    }
  ],
  children: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
      },
      name: {
        type: String
      },
      avatar: {
        type: String
      },
      classroom: {
        type: String
      },
      isDelete: {
        type: Boolean,
        default: false
      }
    }
  ],
  isDelete: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('parentIn4', ParentIn4Schema)
