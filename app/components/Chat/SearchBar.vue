<template>
  <div class="search-bar">
    <input
    type="text"
    name="search"
    class="search-ipt"
    v-model="searchStr"
    >
  </div>
</template>

<script>
export default {
  props: ['searchStr']
}
</script>

<style lang="scss">
  .search-bar {
    position: absolute;
    top: 70px;
    width: 100%;
    height: auto;
    padding: 10px;
    background: #2E3238;
    .search-ipt {
      width: 100%;
      height: 30px;
      background: #1F2125;
      border-radius: 2px;
      box-shadow: none;
      border: 1px solid #6F6F6F;
      outline: none;
      padding: 7px 10px;
      color: #fff;
      &:focus {
        border: 1px solid #828080;
      }
    }
  }
</style>
