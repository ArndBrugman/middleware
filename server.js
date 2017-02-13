var express = require('express');
var http = require('http');
var xml2js = require('xml2js');
var parser = new xml2js.Parser();
parser.on('error', function(err) { console.log('Parser error', err); });
var app = express();
app.set('port', process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 8080);

app.get('/', function (req, res) {
  // http://www.w3schools.com/xml/note.xml
  // http://www.omdbapi.com/?t=Man&y=&plot=short&r=xml
  var data = '';
  http.get('http://www.omdbapi.com/?t=Man&y=&plot=short&r=xml', function(response) {
    if (response.statusCode >= 200 && response.statusCode < 400) {
      response.on('data', function(datablock) { 
        console.log('datablock ' + datablock);
        data += datablock.toString(); 
      });
      response.on('end', function() {
        console.log('data from request', data);
        parser.parseString(data, function(err, result) {
          res.json(result);
          console.log('result as json', result);
        });
      });
    }
  });
})

app.listen(app.get('port'), function () {
  console.log('Example app+ listening on port ' + app.get('port'))
})
