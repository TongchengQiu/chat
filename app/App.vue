<template>
  <div>
    <router-view class="view" transition="test" transition-mode="out-in" keep-alive></router-view>
  </div>
</template>

<script>
// var io = require('socket.io-client');
// window.io = io;
// var secket = io.connect('http://localhost:8888');
// secket.emit('login', 'qiutc');
// secket.emit('send', 'qiutc', 'qiutc', 'hello');
// secket.on('receive', function (msg) {
//   console.log(msg);
// });

export default {

}
</script>
