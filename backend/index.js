const express = require('express')
const connectDB = require('./utils/db')
const cors = require('cors')
const bodyParser = require('body-parser')
const { v2: cloudinary } = require('cloudinary')
const path = require('path')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: __dirname + '/.env' })
}

const app = express()
const {
  CLOUDINARY_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
} = require('./config')

const PORT = process.env.PORT || 5000

connectDB()

cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
})
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api/users', require('./router/users'))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend', 'build')))
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'build', 'index.html'))
  })
}

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT} 🔥🔥🔥`)
})
