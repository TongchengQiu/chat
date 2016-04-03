require('./static/style/base.scss');
import Vue from 'vue';
import VueRouter from 'vue-router';
import { configRouter } from './route-config';
import App from './App';

Vue.use(VueRouter);

const router = new VueRouter({
  history: true,
  saveScrollPosition: true
});

configRouter(router);

const app = Vue.extend(App);

router.start(app, '#app');

/* eslint-disable no-new */

// Vue.config.debug = true;

// new Vue(App);
