var path = require('path');

// 定义根目录
var projectRoot = path.resolve(__dirname, '../');

module.exports = {
  // 入口
  entry: {
    index: './app/index.js'
  },
  // 出口
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: './static/',
    filename: 'static/js/[name].[hash].js',
    chunkFilename: '[id].[chunkhash].js'
  },
  resolve: {
    extensions: ['', '.js', '.vue'],
    // fallback: [path.join(__dirname, '../node_modules')],
    alias: {
      'app': path.resolve(__dirname, '../app')
    }
  },
  // resolveLoader: {
  //   fallback: [path.join(__dirname, '../node_modules')]
  // },
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
        test: /\.scss/,
        loaders: ['style', 'css', 'autoprefixer', 'sass']
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
        test: /\.(jpe?g|png|gif|svg)$/,
        loader: 'url?limit=10240&name=static/images/[name].[ext]'
      },
      {
        test: /\.(woff2?|eot|ttf)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: '[name].[ext]?[hash:7]'
        }
      }
    ]
  }
  // vue: {
  //   loaders: cssLoaders()
  // },
  // eslint: {
  //   formatter: require('eslint-friendly-formatter')
  // }
};
