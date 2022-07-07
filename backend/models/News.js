const mongoose = require('mongoose')

const NewsSchema = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    author: {
      name: {
        type: String,
      },
      avatar: {
        type: String,
      },
    },
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
    likes: [
      {
        user: {
          type: Schema.Types.ObjectId,
        },
      },
    ],
    comments: [
      {
        user: {
          type: Schema.Types.ObjectId,
        },
        text: {
          type: String,
          required: true,
        },
        name: {
          type: String,
        },
        avatar: {
          type: String,
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('news', NewsSchema)
