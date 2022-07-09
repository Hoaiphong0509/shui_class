const mongoose = require('mongoose')

const StaffSchema = new mongoose.Schema({
  staffDisplay: {
    type: String
  },
  staffCode: {
    type: Number
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

module.exports = mongoose.model('staff', StaffSchema)
