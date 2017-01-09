const webpack = require('webpack');
const { resolve } = require('path');

module.exports = {
  entry: [
    'react-hot-loader',
    'webpack/hot/only-dev-server',
    'webpack-dev-server/client?http://localhost:8080',
    './src/main'
  ],

  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, 'dist'),
    publicPath: '/'
  },

  devtool: 'source-map',

  devServer: {
    hot: true,
    quiet: false,
    contentBase: resolve(__dirname, 'dist'),
    publicPath: '/'
  },

  module: {
    loaders: [
      {
        test: /\.js?$/,
        loaders: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        loaders: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.png$/,
        loader: "url-loader?limit=100000"
      },
      {
        test: /\.jpg$/,
        loader: "file-loader"
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff"
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader"
      }

    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
}
