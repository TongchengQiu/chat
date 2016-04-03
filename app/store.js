var datas = {
  userData: {},
  userList: [],
  activeUser: -1,
  searchStr: ''
};

var methods = {
  login: function (username, password, conf) {
    datas.userData.name = username;
    fetch('/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
    .then(parseJSON)
    .then(function (result) {
      if (result.status === 1) {
        conf.seccess();
      } else if (result.status === 0) {
        conf.error(result.msg);
      }
    });
    return true;
  },
  getUserData: function () {
    datas.userData = {
      img: 'http://coffcer.github.io/vue-chat/dist/images/1.jpg',
      name: datas.userData.name,
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
          }
        ]
      },
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
    ];
    datas.activeUser = 0;
  },
  receiveMsg: function (obj) {
    datas.userList.forEach((item, idx) => {
      if (item.name === obj.from) {
        datas.userList[idx].chat.push({
          time: obj.time,
          type: 'other',
          text: obj.mgs
        });
      }
    });
  }
};

export default {
  datas: datas,
  methods: methods
};

function parseJSON (response) {
  return response.json();
};
