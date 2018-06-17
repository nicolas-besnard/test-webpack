const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';
const cssLoaders = [
  'style-loader',
  { loader: 'css-loader', options: { importLoaders: 1 } },
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
      }, {
        test: /\.css$/,
        use: cssLoaders
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
