<template>
  <div class="no-found">
    <h1>404</h1>
    <h2>找不到你啦~</h2>
    <a v-link="{ path: '/' }">回去 -></a>
  </div>
</template>

<style media="screen" lang="scss">
  .no-found {
    text-align: center;
    padding-top: 140px;
    h1 {
      font-size: 38px;
    }
    h2 {
      font-size: 33px;
    }
    a {
      margin-top: 30px;
      font-size: 28px;
      color: #427BB5;
      &:hover {
        color: darken(#427BB5, 10%)
      }
    }
  }
</style>
