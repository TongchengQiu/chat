var io = require('socket.io-client');

export default function (receiveFoo) {
  var socket = io.connect('http://localhost:8080/api');

  socket.on('receive', function (obj) {
    receiveFoo(obj);
  });

  return function (to, msg) {
    socket.emit('send', to, msg);
  };
};
