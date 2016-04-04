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
import LeftSider from './LeftSider';
import ChatBox from './ChatBox';

export default {
  data () {
    return this.store.datas;
  },
  props: ['store'],
  components: {
    LeftSider,
    ChatBox
  },
  events: {
    'send-msg': function (msg) {
      this.store.methods.sendMessage(msg);
    }
  },
  created: function() {

    this.store.methods.getUserData();
    this.store.methods.getUserList();
    this.store.methods.openSocket();

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
