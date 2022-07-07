const mongoose = require('mongoose')

const CompetitionSchema = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    student: {
      name: {
        type: String,
      },
      avatar: {
        type: String,
      },
    },
    diligence: {
      type: Number,
    },
    improve: {
      type: Number,
    },
    positive: {
      type: Number,
    },
    classification: {
      type: String,
      default: ['Giỏi'],
      enum: ['Giỏi', 'Khá', 'Trung Bình', 'Yếu'],
    },
    isDelete: {
      type: Boolean,
      default: false,
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

module.exports = mongoose.model('competition', CompetitionSchema)
