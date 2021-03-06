const path = require('path')
const CopyPlugin = require("copy-webpack-plugin");
const HTMLWebpackPlugin = require('html-webpack-plugin');
const WebpackAssetsManifest = require('webpack-assets-manifest');

module.exports = {

  entry: {
    truchet: path.resolve(__dirname, 'src/truchet.js'),
    'truchet-dom': path.resolve(__dirname, 'src/assets/scripts/truchet-dom.js'),
    main: path.resolve(__dirname, 'src/assets/scripts/main.js'),
    search: path.resolve(__dirname, 'src/assets/scripts/search.js'),
    richPicture: path.resolve(__dirname, 'src/assets/scripts/richPicture.js'),
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
        test: /\.njk$/,
        use: [
          {
            loader: 'simple-nunjucks-loader',
            options: {
              searchPaths: [
                'src/_templates/components',
                'src/_templates/utils'

              ], filters: {
                dateToFormat: path.resolve('src/utils/dateToFormat.js'),
                removeMD: path.resolve('src/utils/removeMD.js')

              }
            }
          }
        ]
      },
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


    new CopyPlugin({
      patterns: [
        //On copie média avec chemins relatifs ou absolus dans un dossier unique intermédiaire, que les scripts puissent processer
        {
          from: "posts/**/*.{png,webp,gif,mp4,jpg,jpeg}",
          context: "src",
          to({ context, absoluteFilename }) {
            return `${context}/assets/imagesToProcess/[name][ext]`;
          },

        },
        {
          from: "assets/images/*",
          context: "src",
          to({ context, absoluteFilename }) {
            return `${context}/assets/imagesToProcess/[name][ext]`;
          },

        },


      ],
      options: {
        concurrency: 100,
      },
    }),
    new WebpackAssetsManifest({
      output: '../../../src/_data/hashes_js.json'
    }),
  ],
}
