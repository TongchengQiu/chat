<template>
  <div class="left-sider">

    <my-card
    :user-data="userData">
    </my-card>

    <search-bar
    :search-str.sync="searchStr">
    </search-bar>

    <list
    :user-list="userList"
    :active-user.sync="activeUser"
    :search-str="searchStr">
    </list>

  </div>
</template>

<script>
import List from './List'
import MyCard from './MyCard'
import SearchBar from './SearchBar'
export default {
  props: ['userData', 'userList', 'activeUser', 'searchStr'],
  components: {
    List,
    MyCard,
    SearchBar
  }
}
</script>

<style lang="scss">
.left-sider {
  float: left;
  width: 200px;
  height: 100%;
  overflow: auto;
  padding-top: 120px;
  position: relative;
  border-radius: 3px 0 0 3px;
}
</style>
