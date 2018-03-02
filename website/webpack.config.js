const Path = require('path');
const { DefinePlugin, HashedModuleIdsPlugin, NamedModulesPlugin, HotModuleReplacementPlugin } = require('webpack');
const Html = require('html-webpack-plugin');
const Copy = require('copy-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV || 'production';
const isDev = NODE_ENV === 'development';
const isProd = NODE_ENV === 'production';

module.exports = {
  mode: NODE_ENV,
  devtool: 'source-map',
  devServer: {
    contentBase: './build',
    hot: true,
    quiet: false,
    port: 9090,
    stats: 'errors-only'
  },
  entry: {
    'index': Path.resolve(__dirname, `modules/index.${NODE_ENV}.js`),
  },
  output: {
    path: Path.resolve(__dirname, 'build'),
    filename: 'js/[name].js',
    chunkFilename: 'js/[hash].[chunkhash].js',
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader', options: { cacheDirectory: 'cache' } },
      { test: /\.(svg|jpg|png|gif)$/, loader: 'file-loader', options: { name: 'images/[name].[ext]' } },
      { test: /\.md$/, loader: 'markdown-loader', options: { } },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader',
        options: { name: 'fonts/[name].[ext]', limit: 5000, mimetype: 'application/font-woff' },
      },
      { test: /\.ttf$|\.eot$/, loader: 'file-loader', options: { name: 'fonts/[name].[ext]' } },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  plugins: [
    new DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(NODE_ENV),
      },
    }),
    isDev && new HashedModuleIdsPlugin(),
    isDev && new HotModuleReplacementPlugin(),
    isProd && new NamedModulesPlugin(),
    new Html({
      filename: 'index.html',
      template: 'index.html.ejs',
    }),
    new Copy([
      { from: './static', to: './' },
    ]),
  ].filter(Boolean),
};