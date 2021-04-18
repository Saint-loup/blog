const path = require('path')

module.exports = {
  entry: path.resolve(__dirname, 'src/assets/scripts/main.js'),
  output: {
    path: path.resolve(__dirname, 'dist/assets'),
  },

  plugins: [],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
}
