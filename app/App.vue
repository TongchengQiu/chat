<template>
  <div>
    <!-- 路由渲染的组件位置 -->
    <router-view
      class="view"
      transition="test"
      transition-mode="out-in"
      keep-alive
      :store="store">
    </router-view>
  </div>
</template>

<script>
import store from './store.js';

export default {
  data: function() {
    return {
      store: store
    };
  }
}
</script>
