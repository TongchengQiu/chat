<template>

<ul class="list">

  <li
  v-for="user in userList | filterBy searchStr in 'name'"
  user-id="{{ user.id }}"
  user-index="{{ $index }}"
  :class="activeUser == $index ? 'active' : ''"
  @click="chooseUser($index)"
  >

    <img :src="user.img" alt="{{ user.name }}" />
    <span class="name">{{ user.name }}</span>

  </li>

</ul>

</template>

<script>
export default {
  props: ['userList', 'activeUser', 'searchStr'],
  methods: {
    chooseUser: function(index) {
      this.activeUser = index;
      document.querySelector('.chat-text textarea').focus();
      document.querySelector('.chat-text textarea').value = '';
    }
  }
}
</script>

<style lang="sass">
.list {
  width: 100%;
  height: 100%;
  overflow: auto;
  background: #2E3238;
  li {
    cursor: pointer;
    height: 54px;
    padding: 12px;
    border-top: 1px solid #24272c;
    transition: background-color .1s;
    img {
      vertical-align: middle;
      width: 30px;
      height: 30px;
      border-radius: 2px;
    }
    .name {
      vertical-align: middle;
      padding-left: 10px;
      color: #f4f4f4;
      font-size: 15px;
    }
    &.active {
      background: hsla(0,0%,100%,.1);
    }
    &:hover {
      background: hsla(0,0%,100%,.03);
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
