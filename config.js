var path = require('path');

module.exports = {
  build: {
    index: path.resolve(__dirname, 'dist/index.html'),
    assetsRoot: path.resolve(__dirname, 'dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: false
  },
  dev: {
    port: 3000,
    proxyTable: {
      'http://localhost:3000/api': 'http://localhost:8080/',
      'http://localhost:3000/socket.io/': 'http://localhost:8080/'
    }
  }
};
