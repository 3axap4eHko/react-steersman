const Path = require('path');
const { DefinePlugin, optimize, HashedModuleIdsPlugin } = require('webpack');
const Html = require('html-webpack-plugin');
const Copy = require('copy-webpack-plugin');

module.exports = {
  entry: {
    'index': Path.resolve(__dirname, 'src/index.js'),
    'common': [
      'react',
      'react-dom',
      'react-steersman',
    ],
  },
  output: {
    path: Path.resolve(__dirname, 'build'),
    filename: 'js/[name].js',
    chunkFilename: 'js/[hash].[chunkhash].js'
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'eslint-loader', enforce: 'pre' },
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader', options: { cacheDirectory: 'cache' } },
      { test: /\.(svg|jpg|png|gif)$/, loader: 'file-loader', options: { name: 'images/[name].[ext]' } },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader',
        options: { name: 'fonts/[name].[ext]', limit: 5000, mimetype: 'application/font-woff' }
      },
      { test: /\.ttf$|\.eot$/, loader: 'file-loader', options: { name: 'fonts/[name].[ext]' } }
    ],
  },
  plugins: [
    new optimize.CommonsChunkPlugin({
      name: 'common',
      filename: 'js/common.js',
    }),
    new DefinePlugin({
      'DEBUG': JSON.stringify(!!process.env.DEBUG),
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new HashedModuleIdsPlugin(),
    new Html({
      filename: 'index.html',
      template: 'src/index.html'
    }),
    new Copy([
      { from: './src/favicon.ico', to: './' },
    ])
  ]
};