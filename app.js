const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

app.set('view engine', 'html');
//Logging Middleware
app.use(morgan('dev'));

//creating a static path for public folder
app.use(express.static(path.join(__dirname, './public')));

// using this to redirect bootstrap and jquery routes
app.use('/bootstrap', express.static(path.join(__dirname + '/node_modules/bootstrap/dist')));
app.use('/jquery', express.static(path.join(__dirname + '/node_modules/jquery/dist')));


//parsing middleware so that you can use req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//redirecting all routes to look at the index.js file.
app.use('/', require('./server/index.js'))

// failed to catch req above means 404, forward to error handler
app.use( (req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// handle any errors
app.use((err, req, res, next) => {
  console.error(err, err.stack);
  res.status(err.status || 500);
  res.render('error', {
    error: err
  });
});

// listen on a port
let port = 3001;
app.listen(port, () => {
  console.log('The server is listening closely on port', port);
});
