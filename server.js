const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
require('./config/passport-config.js')

const PORT = process.env.PORT || 3000
const uriDb = process.env.DB_HOST

const contactApi = require('./routes/api/contacts')
const userApi = require('./routes/api/user')
const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(
  cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  }),
)

app.use(express.json())

app.use('/', contactApi)
app.use('/', userApi)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message, er: 'er' })
})
mongoose.Promise = global.Promise

const connection = mongoose.connect(uriDb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

connection
  .then(() => {
    app.listen(PORT, function () {
      console.log(
        `Database connection successful. Server running. Use our API on port: ${PORT}`,
      )
    })
  })
  .catch((err) => {
    console.log(`Server not running. Error message: ${err.message}`)
    process.exit(1)
  })
