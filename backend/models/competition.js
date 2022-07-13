const mongoose = require('mongoose')

const CompetitionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    },
    studentName: {
      type: String
    },
    studentUsername: {
      type: String
    },
    hk: {
      type: Number
    },
    avgAll: {
      type: Number
    },
    positivePoint: {
      point_1: {
        name: {
          type: String,
          default: 'Tham gia xây dựng bài'
        },
        point: {
          type: Number,
          default: 10
        },
        time: {
          type: Number,
          default: 1
        },
        note: {
          type: String
        }
      },
      point_2: {
        name: {
          type: String,
          default: 'Tham gia phong trào'
        },
        point: {
          type: Number,
          default: 10
        },
        time: {
          type: Number,
          default: 1
        },
        note: {
          type: String
        }
      },
      point_3: {
        name: {
          type: String,
          default: 'Người tốt việc tốt'
        },
        point: {
          type: Number,
          default: 10
        },
        time: {
          type: Number,
          default: 1
        },
        note: {
          type: String
        }
      },
      point_4: {
        name: {
          type: String,
          default: 'Kết quả học tập cải thiện'
        },
        point: {
          type: Number,
          default: 10
        },
        time: {
          type: Number,
          default: 1
        },
        note: {
          type: String
        }
      },
      point_5: {
        name: {
          type: String,
          default: 'Khác'
        },
        point: {
          type: Number,
          default: 10
        },
        time: {
          type: Number,
          default: 1
        },
        note: {
          type: String
        }
      }
    },
    negativePoint: {
      point_1: {
        name: {
          type: String,
          default: 'Làm việc riêng trong giờ học'
        },
        point: {
          type: Number,
          default: 10
        },
        time: {
          type: Number,
          default: 0
        },
        note: {
          type: String
        }
      },
      point_2: {
        name: {
          type: String,
          default: 'Đi học trễ'
        },
        point: {
          type: Number,
          default: 10
        },
        time: {
          type: Number,
          default: 0
        },
        note: {
          type: String
        }
      },
      point_3: {
        name: {
          type: String,
          default: 'Nghỉ học không phép'
        },
        point: {
          type: Number,
          default: 10
        },
        time: {
          type: Number,
          default: 0
        },
        note: {
          type: String
        }
      },
      point_4: {
        name: {
          type: String,
          default: 'Không hoàn thành bài tập, chuẩn bị bài trước'
        },
        point: {
          type: Number,
          default: 10
        },
        time: {
          type: Number,
          default: 0
        },
        note: {
          type: String
        }
      },
      point_5: {
        name: {
          type: String,
          default: 'Sử dụng xe phân khối lớn'
        },
        point: {
          type: Number,
          default: 10
        },
        time: {
          type: Number,
          default: 0
        },
        note: {
          type: String
        }
      },
      point_6: {
        name: {
          type: String,
          default: 'Khác'
        },
        point: {
          type: Number,
          default: 10
        },
        time: {
          type: Number,
          default: 0
        },
        note: {
          type: String
        }
      }
    },
    classification: {
      type: String,
      default: ['Khá'],
      enum: ['Giỏi', 'Khá', 'Trung Bình', 'Yếu']
    },
    isDelete: {
      type: Boolean,
      default: false
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

module.exports = mongoose.model('competition', CompetitionSchema)
