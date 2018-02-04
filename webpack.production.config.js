const webpack = require('webpack');
const path = require('path');
const loaders = require('./webpack.loaders');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');

// local css modules
// loaders.push({
//   test: /[\/\\]src[\/\\].*\.css/,
//   exclude: /(node_modules|bower_components|public)/,
//   loader: ExtractTextPlugin.extract(
//     'style',
//     'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
//   )
// });
//
// // local scss modules
// loaders.push({
//   test: /[\/\\]src[\/\\].*\.scss/,
//   exclude: /(node_modules|bower_components|public)/,
//   loader: ExtractTextPlugin.extract(
//     'style',
//     'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
//     'sass'
//   )
// });
// // global css files
// loaders.push({
//   test: /[\/\\](node_modules|global)[\/\\].*\.css$/,
//   loader: ExtractTextPlugin.extract('style', 'css')
// });

loaders.push(
  {
    // global css
    test: /\.css$/,
    exclude: /[/\\]src[/\\]/,
    // include: /[\/\\](globalStyles)[\/\\]/,
    loaders: ['style-loader?sourceMap', 'css-loader']
  },
  // global scss
  {
    test: /\variables.scss$/,
    // exclude: /[\/\\]src[\/\\]/,
    // include: /[/\\](styles/variables.scss)[/\\]/,
    loaders: ['sass-variable-loader']
  },
  // global scss
  {
    test: /\.scss$/,
    // exclude: /[\/\\]src[\/\\]/,
    include: /[/\\](global)[/\\]/,
    loaders: ['style-loader?sourceMap', 'css-loader', 'sass-loader']
  },
  {
    test: /\.less/,
    // exclude: /[\/\\]src[\/\\]/,
    include: /[/\\](node_modules)[/\\]/,
    loaders: ['style-loader?sourceMap', 'css-loader', 'less-loader']
  },
  // local scss modules
  {
    test: /\.scss$/,
    // include: /[/\\](components)[/\\]/,
    exclude: /[/\\](global)[/\\]/,
    loaders: [
      'style-loader?sourceMap',
      'css-loader?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
      'postcss-loader',
      'sass-loader'
    ]
  },
  // local scss modules
  {
    test: /\.css$/,
    include: /[/\\](components)[/\\]/,
    loaders: [
      'style-loader?sourceMap',
      'css-loader?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
      'postcss-loader'
    ]
  },
  {
    test: /bootstrap\/dist\/js\/umd\//,
    loader: 'imports-loader?jQuery=jquery'
  }
  // {
  //   test: /mapbox-gl.+\.js$/,
  //   loader: 'transform-loader/cacheable?brfs'
  // }
);
module.exports = {
  entry: ['./src/index.jsx'],
  output: {
    path: path.join(__dirname, 'docs'),
    filename: '[chunkhash].js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    loaders
  },
  plugins: [
    new WebpackCleanupPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false,
    //     screw_ie8: true,
    //     drop_console: true,
    //     drop_debugger: true
    //   }
    // }),
    // new webpack.optimize.OccurenceOrderPlugin(),
    // new ExtractTextPlugin('[contenthash].css', {
    //   allChunks: true
    // }),
    new HtmlWebpackPlugin({
      template: './src/template.html',
      title: 'Webpack App'
    })
    // new webpack.optimize.DedupePlugin()
  ]
};
