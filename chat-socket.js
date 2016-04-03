var socketIo = require('socket.io');

var userList = {};

module.exports = function (server) {
  var io = socketIo.listen(server);

  // 设置日志级别
  io.set('log level', 1);

  io.on('connection', function (socket) {
    console.log('connected');
    var _username = '';

    socket.on('login', function (username) {
      console.log(username + ' logined');
      userList[username] = socket;
      _username = username;
    });

    // 对message事件的监听
    socket.on('send', function (from, to, msg) {
      if (userList[to]) {
        console.log(msg);
        userList[to].emit('receive', {
          time: getTime(),
          mgs: msg,
          from: from,
          to: to
        });
      }
    });

    // 监听出退事件
    socket.on('disconnect', function () {
      delete userList[_username];
      console.log(_username + ' disconnect');
    });
  });
};

var getTime = function () {
  var date = new Date();
  return date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
};
