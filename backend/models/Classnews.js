const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ClassnewsSchema = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user'
    },
    classroom: {
      type: Schema.Types.ObjectId,
      ref: 'classroom'
    },
    author: {
      name: {
        type: String
      },
      avatar: {
        type: String
      }
    },
    title: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    img: {
      type: String
    },
    isDelete: {
      type: Boolean,
      default: false
    },
    likes: [
      {
        user: {
          type: Schema.Types.ObjectId
        }
      }
    ],
    comments: [
      {
        user: {
          type: Schema.Types.ObjectId
        },
        text: {
          type: String,
          required: true
        },
        name: {
          type: String
        },
        avatar: {
          type: String
        },
        date: {
          type: Date,
          default: Date.now
        }
      }
    ],
    date: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('classnews', ClassnewsSchema)
