var express = require('express')
var push = require('./push.js')
var bodyParser = require('body-parser')

require('dotenv').config()

var app = express()

// Body parser extracts POST data from incoming
// requests for our use
app.use(bodyParser())

app.get('/', (req, res) => {
  res.send('hi ed!')
})

// Path used to register for push notifications
// push.register is the handler function
app.post('/register', push.register)

app.listen(3000, function (error) {
  if (error) {
    // Something unexpected happened
    throw error
  }

  console.log('Listening on 127.0.0.1:3000')
})
