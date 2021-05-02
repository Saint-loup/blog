const path = require('path')
const WebpackAssetsManifest = require('webpack-assets-manifest'); module.exports = {
  entry: {
    main: path.resolve(__dirname, 'src/assets/scripts/main.js'),
    search: path.resolve(__dirname, 'src/assets/scripts/search.js'),
    gallery: path.resolve(__dirname, 'src/assets/scripts/gallery.js'),
  },


  output: {

    path: path.resolve(__dirname, 'dist/assets/scripts'),
    filename: '[name].[contenthash].js',
    /*    détournement du publicpatch*/
    publicPath: path.resolve(__dirname, 'src')


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
