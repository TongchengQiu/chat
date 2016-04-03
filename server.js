var path = require('path');
var express = require('express');

var app = express();
var port = 3000;

app.use('/static', express.static(__dirname + '/dist/static'));
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, './dist/index.html'));
});

app.listen(port, 'localhost', function(error) {
  if (error) {
    console.error(error);
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port);
  }
});
