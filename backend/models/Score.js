const mongoose = require('mongoose')

const ScoreSchema = new mongoose.Schema(
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
    classification: {
      type: String,
      enum: ['Xuất sắc','Giỏi', 'Khá', 'Trung Bình', 'Yếu']
    },
    math: {
      name: {
        type: String,
        default: 'Toán'
      },
      oral_1: {
        type: Number
      },
      oral_2: {
        type: Number
      },
      test15m_1: {
        type: Number
      },
      test15m_2: {
        type: Number
      },
      test15m_3: {
        type: Number
      },
      test45m_1: {
        type: Number
      },
      test45m_2: {
        type: Number
      },
      final: {
        type: Number
      },
      avg: {
        type: Number
      }
    },
    physics: {
      name: {
        type: String,
        default: 'Vật lý'
      },
      oral_1: {
        type: Number
      },
      oral_2: {
        type: Number
      },
      test15m_1: {
        type: Number
      },
      test15m_2: {
        type: Number
      },
      test15m_3: {
        type: Number
      },
      test45m_1: {
        type: Number
      },
      test45m_2: {
        type: Number
      },
      final: {
        type: Number
      },
      avg: {
        type: Number
      }
    },
    chemistry: {
      name: {
        type: String,
        default: 'Hoá học'
      },
      oral_1: {
        type: Number
      },
      oral_2: {
        type: Number
      },
      test15m_1: {
        type: Number
      },
      test15m_2: {
        type: Number
      },
      test15m_3: {
        type: Number
      },
      test45m_1: {
        type: Number
      },
      test45m_2: {
        type: Number
      },
      final: {
        type: Number
      },
      avg: {
        type: Number
      }
    },
    literature: {
      name: {
        type: String,
        default: 'Ngữ văn'
      },
      oral_1: {
        type: Number
      },
      oral_2: {
        type: Number
      },
      test15m_1: {
        type: Number
      },
      test15m_2: {
        type: Number
      },
      test15m_3: {
        type: Number
      },
      test45m_1: {
        type: Number
      },
      test45m_2: {
        type: Number
      },
      final: {
        type: Number
      },
      avg: {
        type: Number
      }
    },
    english: {
      name: {
        type: String,
        default: 'Tiếng Anh'
      },
      oral_1: {
        type: Number
      },
      oral_2: {
        type: Number
      },
      test15m_1: {
        type: Number
      },
      test15m_2: {
        type: Number
      },
      test15m_3: {
        type: Number
      },
      test45m_1: {
        type: Number
      },
      test45m_2: {
        type: Number
      },
      final: {
        type: Number
      },
      avg: {
        type: Number
      }
    },
    biology: {
      name: {
        type: String,
        default: 'Sinh học'
      },
      oral_1: {
        type: Number
      },
      oral_2: {
        type: Number
      },
      test15m_1: {
        type: Number
      },
      test15m_2: {
        type: Number
      },
      test15m_3: {
        type: Number
      },
      test45m_1: {
        type: Number
      },
      test45m_2: {
        type: Number
      },
      final: {
        type: Number
      },
      avg: {
        type: Number
      }
    },
    civic: {
      name: {
        type: String,
        default: 'GDCD'
      },
      oral_1: {
        type: Number
      },
      oral_2: {
        type: Number
      },
      test15m_1: {
        type: Number
      },
      test15m_2: {
        type: Number
      },
      test15m_3: {
        type: Number
      },
      test45m_1: {
        type: Number
      },
      test45m_2: {
        type: Number
      },
      final: {
        type: Number
      },
      avg: {
        type: Number
      }
    },
    tech: {
      name: {
        type: String,
        default: 'Công nghệ'
      },
      oral_1: {
        type: Number
      },
      oral_2: {
        type: Number
      },
      test15m_1: {
        type: Number
      },
      test15m_2: {
        type: Number
      },
      test15m_3: {
        type: Number
      },
      test45m_1: {
        type: Number
      },
      test45m_2: {
        type: Number
      },
      final: {
        type: Number
      },
      avg: {
        type: Number
      }
    },
    geography: {
      name: {
        type: String,
        default: 'Địa lý'
      },
      oral_1: {
        type: Number
      },
      oral_2: {
        type: Number
      },
      test15m_1: {
        type: Number
      },
      test15m_2: {
        type: Number
      },
      test15m_3: {
        type: Number
      },
      test45m_1: {
        type: Number
      },
      test45m_2: {
        type: Number
      },
      final: {
        type: Number
      },
      avg: {
        type: Number
      }
    },
    history: {
      name: {
        type: String,
        default: 'Lịch sử'
      },
      oral_1: {
        type: Number
      },
      oral_2: {
        type: Number
      },
      test15m_1: {
        type: Number
      },
      test15m_2: {
        type: Number
      },
      test15m_3: {
        type: Number
      },
      test45m_1: {
        type: Number
      },
      test45m_2: {
        type: Number
      },
      final: {
        type: Number
      },
      avg: {
        type: Number
      }
    },
    it: {
      name: {
        type: String,
        default: 'Tin học'
      },
      oral_1: {
        type: Number
      },
      oral_2: {
        type: Number
      },
      test15m_1: {
        type: Number
      },
      test15m_2: {
        type: Number
      },
      test15m_3: {
        type: Number
      },
      test45m_1: {
        type: Number
      },
      test45m_2: {
        type: Number
      },
      final: {
        type: Number
      },
      avg: {
        type: Number
      }
    },
    dnu: {
      name: {
        type: String,
        default: 'Quốc phòng'
      },
      oral_1: {
        type: Number
      },
      oral_2: {
        type: Number
      },
      test15m_1: {
        type: Number
      },
      test15m_2: {
        type: Number
      },
      test15m_3: {
        type: Number
      },
      test45m_1: {
        type: Number
      },
      test45m_2: {
        type: Number
      },
      final: {
        type: Number
      },
      avg: {
        type: Number
      }
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('score', ScoreSchema)
