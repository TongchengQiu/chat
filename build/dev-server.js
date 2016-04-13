var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.dev.conf');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');

var chatSocket = require('../server/chat-socket');
var router = require('../server/router.js');

// 端口号
var port = process.env.PORT || 8888;

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

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

// 调用webpack并把配置传递过去
var compiler = webpack(config);

// 使用 webpack-dev-middleware 中间件
var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath,
  stats: {
    colors: true,
    chunks: false
  }
});

// 使用 webpack-hot-middleware 中间件
var hotMiddleware = require('webpack-hot-middleware')(compiler);

// webpack插件，监听html文件改变事件
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    // 发布事件
    hotMiddleware.publish({ action: 'reload' });
    cb();
  });
});

app.use(require('connect-history-api-fallback')());

// 注册中间件
app.use(devMiddleware);
// 注册中间件
app.use(hotMiddleware);

app.use('/static', express.static('./static'));

// 监听 8888端口，开启服务器
var server = app.listen(port, function (err) {
  if (err) {
    console.log(err);
    return false;
  }
  console.info('==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
});

// socket
chatSocket(server, sessionStore);
