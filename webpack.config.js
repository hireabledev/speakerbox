/* eslint "no-param-reassign":, "import/no-extraneous-dependencies": 0 */

const fs = require('fs');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const babelConfig = require('./.babelrc-client.json');

const ENV = process.env.NODE_ENV || 'development';
const STATIC_URL = process.env.STATIC_URL || '/assets/';

const webpackConfig = {
  entry: {
    vendor: ['./src/vendor.jsx', 'babel-polyfill', 'whatwg-fetch'],
    dashboard: 'dashboard/client/index.jsx',
    marketing: 'marketing/client/index.jsx',
    sso: 'sso/client/index.jsx',
  },
  output: {
    filename: '[name].[hash].js',
    publicPath: `${STATIC_URL}`,
    path: `${__dirname}/src/public/`,
    sourceMapFileName: '[file].map',
  },
  module: {
    loaders: [
      {
        test: /\.(css|scss)$/,
        loader: ExtractTextPlugin.extract('style', [
          `css?${ENV === 'development' ? 'sourceMap' : 'minimize'}`,
          `sass?${ENV === 'development' ? 'sourceMap' : 'minimize'}`,
          'postcss',
        ]),
      },
      { test: /\.(png|jpg|svg|gif)$/, loader: 'url?limit=8192' },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: Object.assign({ babelrc: false }, babelConfig),
      },
      { test: /\.json$/, loader: 'json' },
      { test: /\.html$/, loader: 'html' },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(ENV),
      },
    }),
    new ExtractTextPlugin('[name].[hash].css'),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      chunks: ['dashboard', 'marketing', 'sso', 'vendor'],
    }),
    new webpack.optimize.OccurrenceOrderPlugin(true),
    function saveWebpackStats() {
      this.plugin('done', webpackStats => {
        const stats = webpackStats.toJson();
        delete stats.chunks;
        delete stats.modules;
        fs.writeFileSync(
          `${__dirname}/src/lib/webpack.stats.json`,
          JSON.stringify(stats, null, 2)
        );
      });
    },
  ],
  resolve: {
    extensions: ['', '.js', '.jsx'],
    root: [
      `${__dirname}/src`,
    ],
  },
  devtool: (ENV === 'production' ? 'source-map' : 'cheap-source-map'),
  postcss(/* webpack */) {
    return [
      autoprefixer,
    ];
  },
  sassLoader: {
    includePaths: [
      `${__dirname}/src`,
      `${__dirname}/node_modules`,
    ],
  },
};

module.exports = webpackConfig;
