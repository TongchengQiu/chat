<template>
  <div class="chat-box">

    <chat-cont
      :user-data="userData"
      :chat-cont.sync="chatCont">
    </chat-cont>

    <chat-text :chat-cont.sync="chatCont"></chat-text>

  </div>
</template>

<script>
import ChatCont from './ChatCont';
import ChatText from './ChatText';

export default {
  props: ['chatCont', 'userData'],
  components: {
    ChatCont,
    ChatText
  }
}

</script>

<style media="screen" lang="sass">
  .chat-box {
    width: 600px;
    height: 100%;
    float: left;
    overflow: auto;
    position: relative;
    border-radius: 0 3px 3px 0;
  }
</style>
