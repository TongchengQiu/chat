var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  if (req.session.username) {
    res.redirect('/chat');
  } else {
    res.redirect('/login');
  }
});

router.get('/login', function (req, res, next) {
  if (req.session.username) {
    res.redirect('/chat');
  } else {
    next();
  }
});

router.post('/login', function (req, res, next) {
  if (
    (req.body.username === 'vue' && req.body.password === 'vue') || (req.body.username === 'qiutc' && req.body.password === 'qiutc')
  ) {
    req.session.username = req.body.username;
    res.json({status: 1, msg: ''});
  } else {
    res.json({status: 0, msg: '用户名或者密码错误'});
  }
});

router.get('/chat', function (req, res, next) {
  if (req.session.username) {
    next();
  } else {
    res.redirect('/login');
  }
});

router.get('/getUserData', function (req, res) {
  if (req.session.username === 'vue') {
    res.json({
      status: 1,
      img: 'http://coffcer.github.io/vue-chat/dist/images/2.png',
      username: req.session.username
    });
  } else if (req.session.username === 'qiutc') {
    res.json({
      status: 1,
      img: 'http://coffcer.github.io/vue-chat/dist/images/1.jpg',
      username: req.session.username
    });
  } else {
    res.json({
      status: 0,
      msg: '错误'
    });
  }
});

router.get('/getUserList', function (req, res) {
  if (req.session.username === 'vue') {
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
  if (req.session.username === 'qiutc') {
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

module.exports = router;
