<template>
  <div class="my-card">
    <div class="inner">
      <img :src="userData.img" :alt="userData.name">
      <h2>{{ userData.username }}</h2>
    </div>
  </div>
</template>

<script>
export default {
  props: ['userData'],
}
</script>

<style lang="sass">
  .my-card {
    position: absolute;
    top: 0px;
    width: 100%;
    height: 70px;
    padding: 10px;
    background: #2E3238;
    .inner {
      height: 40px;
      img {
        vertical-align: middle;
        width: 40px;
        height: 100%;
      }
      h2 {
        width: 136px;
        margin: 0;
        display: inline-block;
        padding-left: 10px;
        line-height: 40px;
        color: #fff;
        font-weight: normal;
        font-size: 18px;
      }
    }
  }
</style>
