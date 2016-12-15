const webpack = require('webpack');
const { resolve } = require('path');

module.exports = {
  entry: [
    'react-hot-loader',
    'webpack/hot/only-dev-server',
    'webpack-dev-server/client?http://localhost:3000',
    './src/main'
  ],

  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, 'dist'),
    publicPath: '/'
  },

  devtool: 'source-map',

  devServer: {
    port: 3000,
    hot: true,
    quiet: true,
    contentBase: resolve(__dirname, 'dist'),
    publicPath: '/'
  },

  module: {
    loaders: [
      {
        test: /\.js?$/,
        loaders: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
}
