var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var router = require('./router.js');

var app = express();
var port = process.env.PORT || '3000';

// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/static', express.static(path.join(__dirname, '../dist/static')));

app.use(cookieParser('keyboard cat'));

var sessionStore = new session.MemoryStore();
// use session
app.use(session({
  name: 'sid',
  secret: 'keyboard cat',
  store: sessionStore,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 10
  }
}));

app.use('/', router);

app.get('*', function (req, res) {
  sendIndex(res);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.end('404');
});

app.listen(port, 'localhost', function (error) {
  if (error) {
    console.error(error);
  } else {
    console.info('==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
  }
});

function sendIndex (res) {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
}
