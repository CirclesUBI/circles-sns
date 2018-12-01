// We need to use the sns-mobile module
var SNS = require('sns-mobile')
require('dotenv').config()

var myApp = new SNS({
  platform: SNS.SUPPORTED_PLATFORMS.ANDROID,
  region: 'eu-central-1',
  apiVersion: '2010-03-31',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  platformApplicationArn: process.env.ANDROID_ARN
})

// Handle user added events
myApp.on('userAdded', function (endpointArn, deviceId) {
  console.log('\nSuccessfully added device with deviceId: ' + deviceId + '.\nEndpointArn for user is: ' + endpointArn)
  // Maybe do some other stuff...
})

exports.register = function (req, res) {
  var deviceId = req.body['deviceId']

  console.log('\nRegistering user with deviceId: ' + deviceId)

  // Add the user to SNS
  myApp.addUser(deviceId, null, function (err, endpointArn) {
    // SNS returned an error
    if (err) {
      console.log(err)
      return res.status(500).json({
        status: 'not ok'
      })
    }

    // Tell the user everything's ok
    res.status(200).json({
      status: 'ok'
    })
  })
}
