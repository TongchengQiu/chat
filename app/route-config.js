export function configRouter (router) {
  router.map({
    '/login': {
      name: 'login',
      component: require('./components/Login')
    },
    '/chat': {
      name: 'chat',
      component: require('./components/Chat')
    },
    '*': {
      component: require('./components/NotFound')
    }
  });
  router.redirect({
    '/': '/chat'
  });
};
