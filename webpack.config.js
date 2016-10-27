var webpack = require('webpack');
var path = require('path');

var config = {
  entry: [
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:3000',
    './src/main.js'
  ],
  resolve: {
    root: [
      path.resolve(__dirname, './src')
    ],
    extensions: ['', '.js', '.json', '.jsx']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel'
      }
    ]
  },
  devServer: {
    port: 3000,
    devtool: 'eval-source-map',
    progress: true,
    colors: true,
    quiet: true,
  }
}

module.exports = config;
