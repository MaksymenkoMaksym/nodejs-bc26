const mongoose = require('mongoose')
require('dotenv').config()
require('./config/passport-config.js')

const app = require('./app')
const PORT = process.env.PORT || 3000
const uriDb = process.env.DB_HOST

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
