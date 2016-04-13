import socket from './socket';
require('whatwg-fetch');

var datas = {
  // username: '',
  userData: {},
  userList: [],
  activeUser: -1,
  searchStr: ''
};

var methods = {

  // 接受 用户名，密码，以及 conf{ success, error}两个函数
  login: function (username, password, conf) {
    window.fetch('/login', {
      method: 'POST',
      credentials: 'same-origin',
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
        // datas.username = username;
        lstorage.clear();
        // lstorage.setItem('username', datas.username);
        conf.seccess();
      } else if (result.status === 0) {
        conf.error(result.msg);
      }
    });
    return true;
  },

  // 获取当前用户数据，接受 username
  getUserData: function () {
    window.fetch('/getUserData', {
      credentials: 'same-origin',
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(parseJSON)
    .then((result) => {
      if (result.status === 1) {
        datas.userData = {
          img: result.img,
          username: result.username
        };
      } else if (result.status === 0) {
        console.log(result.error);
      }
    });
    return true;
  },

  // 获取用户列表
  getUserList: function () {
    var _userList = lstorage.getItem('userList');
    if (_userList) {
      datas.userList = _userList;
      datas.activeUser = 0;
      return true;
    }

    window.fetch('/getUserList', {
      credentials: 'same-origin',
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(parseJSON)
    .then((result) => {
      if (result.status === 1) {
        datas.userList = result.data;
        datas.activeUser = 0;
        lstorage.setItem('userList', datas.userList);
      } else if (result.status === 0) {
        console.log(result.error);
      }
    });
  },

  // 打开 socket
  openSocket: function () {
    this.sendFoo = socket((msg) => {
      this.receiveMsg(msg);
    });
  },

  // 发送消息
  sendMessage: function (msg) {
    let date = new Date();
    let time = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    datas.userList[datas.activeUser].chat.push({
      time: time,
      text: msg,
      type: 'self'
    });
    lstorage.setItem('userList', datas.userList);
    this.sendFoo(datas.userList[datas.activeUser].name, msg);
  },

  // 收到消息
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
    lstorage.setItem('userList', datas.userList);
  }
};

export default {
  datas: datas,
  methods: methods
};

function parseJSON (response) {
  return response.json();
};

var lstorage = {
  setItem: function (key, val) {
    var _val = JSON.stringify(val);
    window.localStorage.setItem(key, _val);
    return true;
  },
  getItem: function (key) {
    var _val = window.localStorage.getItem(key);
    if (_val === undefined) {
      return '';
    }
    return JSON.parse(_val);
  },
  deleteItem: function (key) {
    return window.localStorage.removeItem(key);
  },
  clear: function () {
    return window.localStorage.clear();
  }
};
