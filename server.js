var express = require('express');
var http = require('http');
var https = require('https');
var router = express.Router(); // https://scotch.io/tutorials/learn-to-use-the-new-router-in-expressjs-4
var xml2js = require('xml2js');
var parser = new xml2js.Parser();
parser.on('error', function(err) { console.log('Parser error', err); });
var app = express();
app.set('port', process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 8080);


// route middleware that will happen on every request
router.use(function(req, res, next) {
    // log each request to the console
    console.log(req.method, req.url);
    // continue doing what we were doing and go to the route
    next(); 
});


app.route('/login')
    // show the form (GET http://localhost:8080/login)
    .get(function(req, res) {
        res.send('this is the login form');
    })
    // process the form (POST http://localhost:8080/login)
    .post(function(req, res) {
        console.log('processing');
        res.send('processing the login form!');
    });


// route with parameters (http://localhost:8080/hello/:name)
router.get('/hello/:name', function(req, res) {
    res.send('hello ' + req.params.name + '!');
});


router.get('/title/:title', function(req, res) {
  // http://www.omdbapi.com/?t=Man&y=&plot=short&r=xml
  var data = '';
  var title = req.params.title || 'Man';
  http.get('http://www.omdbapi.com/?t='+title+'&y=&plot=short&r=xml', function(response) {
    if (response.statusCode >= 200 && response.statusCode < 400) {
      response.on('data', function(datablock) { 
        console.log('on data: datablock received');
        data += datablock.toString(); 
      });
      response.on('end', function() {
        console.log('on end: data complete');
        parser.parseString(data, function(err, result) {
          res.setHeader('Content-Type', 'application/json');
          res.json(result);
          console.log('json returned');
        });
      });
    }
  });
})


router.get('/', function(req, res) {
  // https://downloads2.makemusic.com/musicxml/BeetAnGeSample.xml
  var data = '';
  var title = req.params.title || 'Man';
  https.get('https://downloads2.makemusic.com/musicxml/BeetAnGeSample.xml', function(response) {
    if (response.statusCode >= 200 && response.statusCode < 400) {
      response.on('data', function(datablock) { 
        console.log('on data: datablock received');
        data += datablock.toString(); 
      });
      response.on('end', function() {
        console.log('on end: data complete');
        parser.parseString(data, function(err, result) {
          res.setHeader('Content-Type', 'application/json');
          res.json(result);
          console.log('json returned');
        });
      });
    }
  });
})


router.get('/about', function(req, res) {
    res.send('im the about page!'); 
});


// apply the routes to our application
app.use('/', router);


app.listen(app.get('port'), function () {
  console.log('Middleware server listening on port: ' + app.get('port'))
})
