const path = require('path')

module.exports = {
  entry: {
    main: path.resolve(__dirname, 'src/assets/scripts/main.js'),
    search: path.resolve(__dirname, 'src/assets/scripts/search.js'),
    gallery: path.resolve(__dirname, 'src/assets/scripts/gallery.js'),


  },
  output: {
    path: path.resolve(__dirname, 'dist/assets/scripts'),
    //  filename: '[name].min.js?[contenthash]'
    filename: '[name].min.js'

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
