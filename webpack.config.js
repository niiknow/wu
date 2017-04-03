/*global __dirname, require, module*/

const webpack = require('webpack');
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const path = require('path');
const env  = require('yargs').argv.env; // use --env with webpack 2
const pkg = require('./package.json');

let libraryName = 'Wu';
let plugins = [], outputFile;

let banner = [
  ` ${pkg.name}.js - v${pkg.version}`,
  ` build: ${new Date()}`,
  ` ${pkg.description}`
].join('\n');

plugins.push( new webpack.BannerPlugin(banner) );

if (env === 'build') {
  plugins.push(new UglifyJsPlugin({ minimize: true }));
  outputFile = libraryName + '.min.js';
} else {
  outputFile = libraryName + '.js';
}


/*
plugins.push( new webpack.ProvidePlugin({
    '$global': ''
  })
);
*/

const config = {
  entry: __dirname + '/src/index.js',
  devtool: 'source-map',
  output: {
    path: __dirname + '/lib',
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /(\.jsx|\.js)$/,
        loader: "eslint-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    modules: [path.resolve('./src')],
    extensions: ['.json', '.js']
/*    alias: {
      '$inc': path.resolve(__dirname, './lib/index.js')
    }
*/
  },
  plugins: plugins,
  target: 'web'
};

module.exports = config;