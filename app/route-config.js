export function configRouter (router) {
  router.map({
    '/login': {
      name: 'login',
      component: function (resolve) {
        require(['./components/Login/Login'], resolve);
      }
    },
    '/chat': {
      name: 'chat',
      component: function (resolve) {
        require(['./components/Chat/Chat'], resolve);
      }
    },
    '*': {
      component: function (resolve) {
        require(['./components/NotFound/NotFound'], resolve);
      }
    }
  });
  router.redirect({
    '/': '/chat'
  });
};
