const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const axios = require('axios');

app.set('view engine', 'html');
//Logging Middleware
app.use(morgan('dev'));

//creating a static path for public folder
app.use(express.static(path.join(__dirname, './public')));

// statically serve front-end dependencies
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist'));

//parsing middleware so that you can use req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.get('/', function(req, res, next){
//   console.log('hit')
//   res.sendFile('index.html', {root: './views'})
// })

app.use('/', require('./server/index.js'))


// failed to catch req above means 404, forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// handle any errors
app.use(function (err, req, res, next) {
  console.error(err, err.stack);
  res.status(err.status || 500);
  res.render('error', {
    error: err
  });
});

// listen on a port
var port = 3001;
app.listen(port, function () {
  console.log('The server is listening closely on port', port);
});
