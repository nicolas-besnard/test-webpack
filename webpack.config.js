const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ManifestPlugin = require('webpack-manifest-plugin');
const CleanWebpackPlugin = require("clean-webpack-plugin");

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
    app: ['./src/app.js', './src/app.scss']
  },

  output: {
    path: path.resolve('./dist'),
    filename: isProduction ? '[name].[chunkhash].js' : '[name].js',
    publicPath: '/dist/'
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: isProduction ? "[name].[hash].css" : "[name].css",
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
  config.plugins.push(new ManifestPlugin());
  config.plugins.push(
    new CleanWebpackPlugin([
      path.resolve("dist")
    ]));
}

module.exports = config;
