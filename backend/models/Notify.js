const mongoose = require('mongoose')
const Schema = mongoose.Schema

const NotifySchema = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user'
    },
    text: {
      type: String,
      required: true
    },
    classnews:{
      type: Schema.Types.ObjectId,
      ref: 'classnews'
    },
    parentnews:{
      type: Schema.Types.ObjectId,
      ref: 'parentnews'
    },
    date: {
      type: Date,
      default: Date.now
    },
    recipient: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId
        }
      }
    ]
  },
  {
    timestamps: true
  }
)

module.exports = Notify = mongoose.model('notify', NotifySchema)
