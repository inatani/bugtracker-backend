// All the require modules goes here
var express = require('express');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var logger = require('morgan');
var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.all('/*', function(req, res, next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  //set custom header
  res.header("Access-Control-Allow-Headers","Content-type,Accept,X-Access-Token,X-Key");
  if(req.method == "OPTIONS") {
    res.status(200).end();
  } else {
    next();
  }
});

app.all('/api/*',[require('./utilities/middleware')]);

app.use('/', routes);

app.use(function(req, res, next){
  var err = new Error('Not Found');
  err.status = 404;
//  next(err);
  res.json({
    "status" : 404,
    "message" : "Request not found"
  });
  return;
});

module.exports = app;
