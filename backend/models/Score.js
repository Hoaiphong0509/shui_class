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
    math: {
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
