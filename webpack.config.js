const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const HOST = process.env.HOST || '127.0.0.1';
const PORT = process.env.PORT || '8888';

const loaders = require('./webpack.loaders');

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

// local css modules
// loaders.push({
//   test: /\.css$/,
//   exclude: /[\/\\](node_modules|bower_components|public)[\/\\]/,
//   loaders: [
//     'style?sourceMap',
//     'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]'
//   ]
// });

module.exports = {
  entry: [
    'react-hot-loader/patch',
    `webpack-dev-server/client?http://${HOST}:${PORT}`,
    'webpack/hot/only-dev-server',
    './src/index.jsx' // your app's entry point
  ],
  devtool: 'eval-source-map',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      Src: path.resolve(__dirname, 'src')
    }
    //   // src$: './src'
    // }
  },
  module: {
    loaders
  },
  devServer: {
    contentBase: './public',
    // noInfo: true,
    hot: true,
    inline: true,
    historyApiFallback: true,
    port: PORT,
    host: HOST
    // progress: true
    // profile: true
    // proxy: {
    //   '**': {
    //     target: 'http://localhost:8000/',
    //     secure: false
    //   }
    // }
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './src/template.html',
      title: 'Jan\'s homepage'
    }),
    new webpack.EnvironmentPlugin({
      DiscogsAccessToken0: 'VWUpUBLQIKOsMRqMXrtPHnihphtVnyryitIMJTWt',
      DiscogsAccessToken1: 'dAVMYKpvyegUWPkRoEoLvRbkAZGcdPwUlzrvknEG',
      DiscogsAccessToken2: 'lizayMSKFDDFEdaEhTjoUsoSgkIfTPfMxdEVPUBy',
      DiscogsAccessToken3: 'nAgkNmuNTWKDStKwntfHmSQRUhUJVAMUBBtZBnIz',
      InstagramAccessToken:
        '3168846451.1677ed0.73c8db6fb18f44bc9e7be911f549fa5c'
    })
    // new webpack.optimize.ModuleConcatenationPlugin()
  ]
};
