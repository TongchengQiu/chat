<template>

  <div class="login-box">

    <h1>登录</h1>

    <validator name="validation1">

      <form novalidate>

        <div class="input-group">
          <label for="username">用户名:</label>
          <input
          @focus="cleanErrorTip"
          v-model="username"
          id="username"
          type="text" v-validate:username="['required']">
          <span
          class="error"
          v-if="$validation1.username.touched && $validation1.username.required">
          请输入帐号
          </span>
        </div>

        <div class="input-group">
          <label for="password">密码:</label>
          <input
          @focus="cleanErrorTip"
          v-model="password"
          id="password"
          type="password" v-validate:password="['required']">
          <span
          class="error"
          v-if="$validation1.password.touched && $validation1.password.required">
          请输入密码
          </span>
        </div>

        <input @click="handleLogin" type="submit" value="登录" class="submit">

        <div class="error-tip" v-if="errorTip">
          {{ errorTip }}
        </div>

      </form>

    </validator>

    <div class="mask" v-if="isLogining"></div>

  </div>

</template>

<script>
import Vue from 'vue';
import VueValidator from 'vue-validator';
Vue.use(VueValidator);

export default {
  data () {
    return {
      username: '',
      password: '',
      errorTip: '',
      isLogining: false
    };
  },
  props: ['store'],
  methods: {
    handleLogin: function(e) {
      e.preventDefault();
      if(this.isLogining) {
        return false;
      }
      this.cleanErrorTip();
      if(this.username.trim() && this.password.trim()) {
        this.isLogining = true;
        let that = this;
        this.store.methods.login(this.username.trim(), this.password.trim(), {
          seccess: function () {
            that.isLogining = false;
            that.$route.router.replace({name: 'chat'});
          },
          error: function(err) {
            that.errorTip = err;
            that.isLogining = false;
          }
        });
        return true;
      } else {
        this.errorTip = '请输入用户名或者密码～';
        return false;
      }
    },
    cleanErrorTip: function(e) {
      this.errorTip = '';
      return true;
    }
  }
}
</script>

<style media="screen" lang="sass">
  body {
    padding-top: 50px;
  }
  .login-box {
    position: relative;
    width: 600px;
    height: 400px;
    background: #F6F9FB;
    border-radius: 4px;
    margin: 50px auto;
    margin-top: 0;
    text-align: center;
    overflow: hidden;
    h1 {
      font-size: 30px;
      text-align: center;
      margin: 0;
      line-height: 2em;
      color: #5B787D;
      margin-bottom: 50px;
    }
    .input-group {
      position: relative;
      width: 50%;
      height: 50px;
      margin: 20px auto;
      label {
        display: inline-block;
        font-size: 15px;
        text-align: right;
        width: 4em;
      }
      input {
        height: 32px;
        width: 220px;
        margin-left: 5px;
        border-radius: 5px;
        outline: none;
        border: 1px solid #eee;
        padding: 8px 1em;
        &:focus {
          border: 1px solid #ccc;
        }
      }
      .error {
        position: absolute;
        display: block;
        top: 0px;
        color: red;
        font-size: 13px;
        right: -130px;
        width: 120px;
        text-align: left;
        line-height: 1.25em;
        padding-top: 7px;
      }
    }
    .submit {
      display: block;
      margin: 0 auto;
      margin-top: 50px;
      width: 120px;
      height: 32px;
      line-height: 30px;
      font-size: 15px;
      text-align: center;
      border-radius: 5px;
      border: 0;
      background-color: #5AD469;
      color: #fff;
      outline: none;
      &:hover {
        background-color: darken(#5AD469, 5%)
      }
      &:active {
        background-color: darken(#5AD469, 12%)
      }
    }
    .error-tip {
      color: red;
      font-size: 13px;
      line-height: 4em;
    }
    .mask {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, .7);
    }
  }
</style>
