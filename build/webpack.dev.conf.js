var webpack = require('webpack');
var path = require('path');
var merge = require('webpack-merge');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var config = require('./webpack.base.conf');

// 入口，需要处理
var devClient = './build/dev-client';
Object.keys(config.entry).forEach(function (name, i) {
  var extras = [devClient];
  config.entry[name] = extras.concat(config.entry[name]);
});

// 和 base 合并
module.exports = merge(config, {
  // map 配置
  devtool: '#eval-source-map',
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, '../app/index.html'),
      inject: true
    })
  ]
});
