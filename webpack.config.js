const path = require('path');

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

let config = {
  mode: isProduction ? 'production' : 'development',
  devtool: isProduction ? "" : "cheap-module-eval-source-map",
  entry: './src/app.js',

  output: {
    path: path.resolve('./dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        //use: [{
        //  loader: 'babel-loader',
        //  options: {
        //    presets: ['@babel/preset-env']
        //  }
        //}]
        use: ['babel-loader']
      }
    ]
  },
};

if (isProduction) {
  config.plugins.push(new UglifyJSPlugin())
}

module.exports = config
