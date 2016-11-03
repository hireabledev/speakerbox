/* eslint "no-path-concat": 0, "prefer-template": 0, "no-param-reassign": 0 */

const fs = require('fs');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const STATIC_URL = process.env.STATIC_URL || '/assets/';

const webpackConfig = {
  entry: {
    dashboard: '~/dashboard/client/index.jsx',
    marketing: '~/marketing/client/index.jsx',
  },
  output: {
    filename: '[name].[hash].js',
    publicPath: `${STATIC_URL}`,
    path: __dirname + '/src/public/',
    sourceMapFileName: '[file].map',
  },
  module: {
    loaders: [
      {
        test: /\.(css|scss)$/,
        loader: ExtractTextPlugin.extract('style', [
          'css?sourceMap',
          'sass?sourceMap',
          'postcss',
        ]),
      },
      { test: /\.(png|jpg|svg|gif)$/, loader: 'url?limit=8192' },
      { test: /\.(js|jsx)$/, exclude: /node_modules/, loader: 'babel' },
      { test: /\.json$/, loader: 'json' },
      { test: /\.html$/, loader: 'html' },
    ],
  },
  plugins: [
    new ExtractTextPlugin('[name].[hash].css'),
    function saveWebpackStats() {
      this.plugin('done', stats => {
        stats = stats.toJson();
        delete stats.chunks;
        delete stats.modules;
        fs.writeFileSync(
          __dirname + '/src/lib/webpack.stats.json',
          JSON.stringify(stats, null, 2)
        );
      });
    },
  ],
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      '~/lib': 'lib',
      '~/assets': 'assets',
      '~/dashboard': 'dashboard',
      '~/marketing': 'marketing',
    },
    root: [
      __dirname + '/src',
    ],
  },
  devtool: process.env.NODE_ENV === 'production' ? 'source-map' : 'eval-cheap-module-source-map',
  postcss(/* webpack */) {
    return [
      autoprefixer,
    ];
  },
  sassLoader: {
    includePaths: [
      __dirname + '/src',
      __dirname + '/node_modules',
    ],
  },
};

if (process.env.NODE_ENV === 'production') {
  webpackConfig.plugins.push(new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production'),
    },
  }));
}

module.exports = webpackConfig;
