const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isProduction = process.env.NODE_ENV === 'production';
const cssLoaders = [
  isProduction ?  MiniCssExtractPlugin.loader : 'style-loader',
  { loader: 'css-loader', options: { importLoaders: 1, minimize: isProduction } },
  {
    loader: 'postcss-loader',
    options: {
      plugins: (loader) => [
        require('autoprefixer')({
          browsers: ['last 2 versions', 'ie > 8']
        })
      ]
    }
  }
];

let config = {
  mode: isProduction ? 'production' : 'development',
  devtool: isProduction ? '' : 'cheap-module-eval-source-map',
  entry: {
    app: './src/app.js'
  },

  output: {
    path: path.resolve('./dist'),
    filename: '[name].js',
    publicPath: '/dist/'
  },

  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
      chunkFilename: "[id].css",
      disable: !isProduction
    })
  ],

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
      }, {
        test: /\.scss$/,
        use: [...cssLoaders, 'sass-loader']
      }
    ]
  }
};

if (isProduction) {
  config.plugins.push(new UglifyJSPlugin());
}

module.exports = config;
