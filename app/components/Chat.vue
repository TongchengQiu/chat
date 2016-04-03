<template>

  <div class="chat">

    <left-sider
      :user-data="userData"
      :user-list="userList"
      :active-user.sync="activeUser"
      :search-str.sync="searchStr">
    </left-sider>

    <chat-box
      :user-data="userData"
      :chat-cont.sync="userList[activeUser]">
    </chat-box>

  </div>

</template>

<script>
import store from '../store.js';
let datas = store.datas;
let methods = store.methods;

import socket from '../socket';

import LeftSider from './LeftSider';
import ChatBox from './ChatBox';

export default {
  data () {
    methods.getUserData();
    methods.getUserList();
    return datas;
  },
  components: {
    LeftSider,
    ChatBox
  },
  events: {
    'send-msg': function (msg) {
      console.log(msg);
      this.sendFoo(datas.userList[datas.activeUser].name, msg);
    }
  },
  ready: function() {

    this.sendFoo = socket(datas.userData.name, function (msg) {
      methods.receiveMsg(msg);
    });

  }
};
</script>

<style lang="sass">
body {
  padding-top: 30px;
}
.chat {
  overflow: hidden;
  width: 800px;
  height: 600px;
  margin: 0 auto;
}
</style>
