var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.dev.conf');
var chatSocket = require('../chat-socket');
var bodyParser = require('body-parser');
var session = require('express-session');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// use session
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 10
  }
}));

app.post('/login', function (req, res) {
  if ((req.body.username === 'vue' && req.body.password === 'vue') || (req.body.username === 'qiutc' && req.body.password === 'qiutc')) {
    req.session.username = req.body.username;
    res.json({status: 1, msg: ''});
  } else {
    res.json({status: 0, msg: '用户名或者密码错误'});
  }
});
app.post('/getUserData', function (req, res) {
  if (req.body.username === 'vue') {
    res.json({
      status: 1,
      img: 'http://coffcer.github.io/vue-chat/dist/images/2.png',
      name: req.body.username
    });
  } else if (req.body.username === 'qiutc') {
    res.json({
      status: 1,
      img: 'http://coffcer.github.io/vue-chat/dist/images/1.jpg',
      name: req.body.username
    });
  } else {
    res.json({
      status: 0,
      msg: '错误'
    });
  }
});
app.post('/getUserList', function (req, res) {
  if (req.body.username === 'vue') {
    res.json({
      status: 1,
      data: [
        {
          img: 'http://coffcer.github.io/vue-chat/dist/images/3.jpg',
          name: 'qiutc',
          id: 2,
          chat: []
        },
        {
          img: 'http://coffcer.github.io/vue-chat/dist/images/3.jpg',
          name: 'webpack2',
          id: 3,
          chat: []
        },
        {
          img: 'http://coffcer.github.io/vue-chat/dist/images/1.jpg',
          name: '123',
          id: 4,
          chat: []
        }
      ]
    });
  }
  if (req.body.username === 'qiutc') {
    res.json({
      status: 1,
      data: [
        {
          img: 'http://coffcer.github.io/vue-chat/dist/images/3.jpg',
          name: 'webpack2',
          id: 3,
          chat: []
        },
        {
          img: 'http://coffcer.github.io/vue-chat/dist/images/1.jpg',
          name: '123',
          id: 4,
          chat: []
        },
        {
          img: 'http://coffcer.github.io/vue-chat/dist/images/2.png',
          name: 'vue',
          id: 1,
          chat: []
        }
      ]
    });
  }
});

app.get('/login', function (req, res, next) {
  if (req.session.username) {
    res.redirect('/');
  }
  next();
});

// 端口号
var port = process.env.PORT || 8888;

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
chatSocket(server);
