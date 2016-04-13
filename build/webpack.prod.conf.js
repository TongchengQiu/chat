var webpack = require('webpack');
var path = require('path');
var merge = require('webpack-merge');
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

var config = require('./webpack.base.conf');
var cssLoaders = require('./css-loaders');

var SOURCE_MAP = false;

module.exports = merge(config, {
  devtool: SOURCE_MAP ? '#source-map' : false,
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    filename: 'static/js/[name].[hash].js',
    chunkFilename: 'static/js/[id].[chunkhash].js'
  },
  // vue: {
  //   loaders: cssLoaders({
  //     sourceMap: SOURCE_MAP,
  //     extract: true
  //   })
  // },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new ExtractTextPlugin('static/css/[name].[contenthash].css'),
    new HtmlWebpackPlugin({
      filename: './index.html',
      template: path.resolve(__dirname, '../app/index.html'),
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      }
    })
  ]
});
