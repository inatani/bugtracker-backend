// All the require modules goes here
var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var logger = require('./utilities/logger');
var morgan = require('morgan');
var app = express();

logger.debug("Overriding 'Express' logger");
app.use(morgan("combined",{ "stream": logger.stream }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', routes);

module.exports = app;
