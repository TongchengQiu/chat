var datas = {
  userData: {},
  userList: [],
  activeUser: -1,
  searchStr: ''
};

var methods = {
  login: function (username, password, conf) {
    setTimeout(function () {
      if (username === '123' && password === '123') {
        conf.seccess();
      } else {
        conf.error('用户名或者密码错误');
      }
    }, 2000);
    return true;
  },
  getUserData: function () {
    datas.userData = {
      img: 'http://coffcer.github.io/vue-chat/dist/images/1.jpg',
      name: 'qiutc',
      id: '12323'
    };
    return datas.userData;
  },
  getUserList: function () {
    datas.userList = [
      {
        img: 'http://coffcer.github.io/vue-chat/dist/images/2.png',
        name: 'vue',
        id: 1,
        chat: [
          {
            time: '24:00',
            type: 'other',
            text: 'hello ?'
          },
          {
            time: '1:12',
            type: 'other',
            text: 'man?'
          },
          {
            time: '1:13',
            type: 'self',
            text: 'fuck'
          },
          {
            time: '1:13',
            type: 'other',
            text: '哈哈哈哈哈哈哈哈哈哈哈哈哈哈啊哈哈哈哈哈哈哈哈哈哈哈哈哈哈啊哈哈哈哈哈哈哈哈哈哈哈哈哈哈啊哈哈哈哈哈哈哈哈哈哈哈哈哈哈啊哈哈哈哈哈哈哈哈哈哈哈哈哈哈啊'
          },
          {
            time: '1:14',
            type: 'self',
            text: '嘿嘿'
          }
        ]
      },
      {
        img: 'http://coffcer.github.io/vue-chat/dist/images/3.jpg',
        name: 'webpack1',
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
        name: 'me',
        id: 4,
        chat: []
      }
    ];
    datas.activeUser = 0;
  }
};

export default {
  datas: datas,
  methods: methods
};
