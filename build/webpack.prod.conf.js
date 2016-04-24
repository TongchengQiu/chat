var webpack = require('webpack');
var path = require('path');
var merge = require('webpack-merge');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var baseConfig = require('./webpack.base.conf');
var cssLoaders = require('./css-loaders');
var config = require('../config');

module.exports = merge(baseConfig, {
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {
    path: config.build.assetsRoot,
    publicPath: config.build.assetsPublicPath,
    filename: path.join(config.build.assetsSubDirectory, '[name].[chunkhash].js'),
    chunkFilename: path.join(config.build.assetsSubDirectory, '[id].[chunkhash].js')
  },
  vue: {
    loaders: cssLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true
    })
  },
  loaders: [
    {
      test: /\.scss/,
      loader: ExtractTextPlugin.extract('style-loader', ['css', 'autoprefixer', 'sass'])
    }
  ],
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
    new ExtractTextPlugin(path.join(config.build.assetsSubDirectory, '[name].[contenthash].css')),
    new HtmlWebpackPlugin({
      filename: process.env.NODE_ENV === 'testing'
        ? 'index.html'
        : config.build.index,
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
