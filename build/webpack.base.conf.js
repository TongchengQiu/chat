var path = require('path');
var config = require('../config');
var cssLoaders = require('./css-loaders');

// 定义根目录
var projectRoot = path.resolve(__dirname, '../');

module.exports = {
  // 入口
  entry: {
    index: './app/index.js'
  },
  // 出口
  output: {
    path: config.build.assetsRoot,
    publicPath: '/',
    filename: '[name].[hash].js',
    chunkFilename: '[id].[chunkhash].js'
  },
  resolve: {
    extensions: ['', '.js', '.vue'],
    fallback: [path.join(__dirname, '../node_modules')],
    alias: {
      'static': path.resolve(__dirname, '../app/static'),
      'components': path.resolve(__dirname, '../app/components')
    }
  },
  resolveLoader: {
    fallback: [path.join(__dirname, '../node_modules')]
  },
  module: {
    // preLoaders: [
    //   {
    //     test: /\.vue$/,
    //     loader: 'eslint',
    //     include: projectRoot,
    //     exclude: /node_modules/
    //   },
    //   {
    //     test: /\.js$/,
    //     loader: 'eslint',
    //     include: projectRoot,
    //     exclude: /node_modules/
    //   }
    // ],
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel?presets=es2015',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.html$/,
        loader: 'vue-html'
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: path.join(config.build.assetsSubDirectory, '[name].[hash:7].[ext]')
        }
      }
    ]
  },
  vue: {
    loaders: cssLoaders()
  },
  eslint: {
    formatter: require('eslint-friendly-formatter')
  }
};
