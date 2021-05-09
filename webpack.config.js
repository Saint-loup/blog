const path = require('path')
const WebpackAssetsManifest = require('webpack-assets-manifest'); module.exports = {
  entry: {
    main: path.resolve(__dirname, 'src/assets/scripts/main.js'),
    search: path.resolve(__dirname, 'src/assets/scripts/search.js'),
    gallery: path.resolve(__dirname, 'src/assets/scripts/gallery.js'),
  },


  output: {

    path: path.resolve(__dirname, 'dist/assets/scripts'),
    /*    détournement du publicpatch*/
    publicPath: path.resolve(__dirname, 'src'),
    filename: (process.env.NODE_ENV === "production" ? '[name].[contenthash].js' : '[name].js')

  },

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
  plugins: [
    new WebpackAssetsManifest({
      output: '../../../src/_data/hashes_js.json'
    }),
  ],
}
