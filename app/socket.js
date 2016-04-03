var io = require('socket.io-client');

export default function (username, receiveFoo) {
  var socket = io.connect('http://localhost:8888');

  socket.emit('login', username);

  socket.on('receive', function (obj) {
    receiveFoo(obj);
  });

  return function (to, msg) {
    socket.emit('send', username, to, msg);
  };
};
