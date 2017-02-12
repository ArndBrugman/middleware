var express = require('express')
var app = express()
app.set('port', process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 8080);

app.get('/', function (req, res) {
  res.send('Hello World via port ' + app.get('port'))
})

app.listen(app.get('port'), function () {
  console.log('Example app+ listening on port ' + app.get('port'))
})
