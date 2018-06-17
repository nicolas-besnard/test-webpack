const path = require('path')

const isProduction = process.env.NODE_ENV === "production";

module.exports = {
  mode: isProduction ? "production" : "development",
  entry: './src/app.js',

  output: {
    path: path.resolve('./dist'),
    filename: 'bundle.js'
  }
}
