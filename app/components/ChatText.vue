<template>
  <div class="chat-text">
    <textarea @keyup.enter="sendMessage" v-model="text" name="text" placeholder="请输入..." autofocus="true"></textarea>
    <button @click="sendMessage" type="button" name="send" class="send-btn">发送</button>
  </div>
</template>

<script>

export default {
  data: function() {
    return {
      text: ''
    };
  },
  props: ['chatCont'],
  methods: {
    sendMessage: function () {
      if (!this.text.trim()) {
        return false;
      }
      let date = new Date();
      let time = date.getHours() + ':' + date.getMinutes();
      this.chatCont.chat.push({
        time: time,
        text: this.text.trim(),
        type: 'self'
      });
      this.text = '';
    }
  }
}

</script>

<style media="screen" lang="sass">
  .chat-text {
    position: relative;
    width: 100%;
    height: 160px;
    background: #fff;
    overflow: hidden;
    border-top: 1px solid #ddd;
    padding-bottom: 50px;

    textarea {
      width: 100%;
      height: 100%;
      overflow: auto;
      padding: 10px;
      outline: none;
      border: 0;
      resize: none;
      &::-webkit-scrollbar {
        width: 2px;
      }
      &::-webkit-scrollbar-thumb {
        background: #335A82;
      }
      &::-webkit-scrollbar-track {
        background: #ddd;
      }
    }
    .send-btn {
      width: 100px;
      height: 28px;
      position: absolute;
      right: 10px;
      bottom: 10px;
      border: #a2a2a2 1px solid;
      outline: none;
      border-radius: 3px;
      background: #ccc;
      color: #333;
      &:active {
        background: darken(#ccc, 10%)
      }
    }
  }
</style>
