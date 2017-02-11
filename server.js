var express = require('express')
var app = express()
var port = parseInt(process.env.OPENSHIFT_NODEJS_PORT) || 8080;

app.get('/', function (req, res) {
  res.send('Hello World via port ' + port)
})

app.listen(port, function () {
  console.log('Example app listening on port ' + port)
})
