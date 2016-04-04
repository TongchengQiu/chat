require('./static/style/base.scss');
import Vue from 'vue';
import VueRouter from 'vue-router';
import { configRouter } from './route-config';
import App from './App';

// 调试模式。
Vue.config.debug = true;
// 打开 Vue.js 所有的日志与警告。
Vue.config.silent = false;
// 在加载 Vue 之后立即同步的设置
Vue.config.devtools = true;

// 安装路由
Vue.use(VueRouter);

// 路由配置
const router = new VueRouter({
  history: true,
  saveScrollPosition: true,
  linkActiveClass: 'link-active'
});

// 用我们的路由规则
configRouter(router);

const app = Vue.extend(App);

// 路由器会创建一个 App 实例，并且挂载到选择符 #app 匹配的元素上。
router.start(app, '#app');

/* eslint-disable no-new */
