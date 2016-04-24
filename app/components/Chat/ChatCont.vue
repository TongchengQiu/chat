<template>
  <div class="chat-cont">
    <ul>
      <li v-if="chatCont" v-for="chat in chatCont.chat" :class="chat.type">
        <p class="time"><span>{{ chat.time }}</span></p>
        <div class="cont">
          <img :src="chat.type == 'other' ? chatCont.img : userData.img" alt="qiutc" />
          <div class="text">{{ chat.text }}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  props: ['chatCont', 'userData']
}

</script>

<style media="screen" lang="scss">
.chat-cont {
  width: 100%;
  height: 440px;
  background: #eee;
  overflow: auto;
  padding: 10px;
  ul {
    li {
      margin-bottom: 15px;
      .time {
        margin-bottom: 6px;
        text-align: center;
        &>span {
          background: #dcdcdc;
          color: #fff;
          font-size: 12px;
          padding: 2px 12px;
          border-radius: 2px;
        }
      }
      .cont {
        img {
          float: left;
          margin: 0 10px 0 0;
          border-radius: 3px;
          width: 30px;
          height: 30px;
        }
        .text {
          display: inline-block;
          position: relative;
          padding: 0 10px;
          max-width: calc(100% - 40px);
          min-height: 30px;
          line-height: 2.5;
          font-size: 9pt;
          text-align: left;
          word-break: break-all;
          background-color: #fafafa;
          border-radius: 4px;
          &::before {
            content: " ";
            position: absolute;
            top: 9px;
            right: 100%;
            border: 6px solid transparent;
            border-right-color: #fafafa;
          }
        }
      }
      &.self {
        text-align: right;
        .cont {
          img {
            margin: 0 0 0 10px;
            float: right;
          }
          .text {
            background-color: #b2e281;
            &::before {
              content: " ";
              position: absolute;
              top: 9px;
              left: 100%;
              border: 6px solid transparent;
              border-left-color: #b2e281;
            }
          }
        }
      }
    }
  }
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
</style>
