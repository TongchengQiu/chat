var socketIo = require('socket.io');
var cookie = require('cookie');
var cookieParser = require('cookie-parser');

var userList = {};

module.exports = function (server, sessionStore) {
  var io = socketIo(server);

  io.use(function (socket, next) {
    try {
      var data = socket.handshake || socket.request;
      if (!data.headers.cookie) {
        return next(new Error('Missing cookie headers'));
      }
      console.log('cookie header ( %s )', JSON.stringify(data.headers.cookie));
      var cookies = cookie.parse(data.headers.cookie);
      console.log('cookies parsed ( %s )', JSON.stringify(cookies));
      if (!cookies['sid']) {
        return next(new Error('Missing cookie ' + 'sid'));
      }
      var sid = cookieParser.signedCookie(cookies['sid'], 'keyboard cat');
      if (!sid) {
        return next(new Error('Cookie signature is not valid'));
      }
      console.log('session ID ( %s )', sid);
      data.sid = sid;
      sessionStore.get(sid, function (err, session) {
        if (err) return next(err);
        if (!session) return next(new Error('session not found'));
        data.session = session;
        next();
      });
    } catch (err) {
      console.error(err.stack);
      next(new Error('Internal server error'));
    }
  });

  // 设置日志级别
  io.set('log level', 1);

  io.on('connection', function (socket) {
    var _username = socket.handshake.session.username;
    console.log(_username + ' connected');
    userList[_username] = socket;

    // 对message事件的监听
    socket.on('send', function (to, msg) {
      console.log(_username + ' send ' + msg + ' to ' + to);
      if (userList[to]) {
        userList[to].emit('receive', {
          time: getTime(),
          mgs: msg,
          from: _username,
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
