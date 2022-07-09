const mongoose = require('mongoose')

const ClassroomSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    unique: true
  },
  headTeacher: {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      default: null
    },
    teacherName: {
      type: String,
      default: ''
    }
  },
  students: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
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

module.exports = mongoose.model('classroom', ClassroomSchema)
