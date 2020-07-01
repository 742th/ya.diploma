const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development';
const webpack = require('webpack');

module.exports = {
  entry: {
      'main': './src/index.js',
      'articles': './src/articles/articles.js'
    },
  output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].[chunkhash].js'
    },
  module: {
    rules: [{
        test: /\.js$/,
        use: {loader: "babel-loader"},
        exclude: /node_modules/,
        },
        {
          test: /\.css$/i,
          use: [
            isDev ? { loader: 'style-loader' } : {
              loader: MiniCssExtractPlugin.loader,
              options: {
              },
            },
            'css-loader',
            'postcss-loader',
          ],
        },
        {
        test: /\.(png|jpg|gif|ico|svg|jpeg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[name].[ext]',
              // outputPath: 'images',
              esModule: false,
              publicPath: '../'
            }
          },
            // {loader: 'file-loader?name=./images/[name].[ext]'},
            {
                loader: 'image-webpack-loader',
                options: {
                  // name: '[name].[ext]',
                  // outputPath: 'images',
                  // publicPath: '../'
                }
            },
            ]
        },
        {
            test: /\.(eot|ttf|woff|woff2)$/,
            loader: 'file-loader?name=./vendor/[name].[ext]',
            options: {
              outputPath: './vendor',
              publicPath: '../vendor'
            }
        }

        ]
    },
  plugins: [
    new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash].css',
    }),
    new HtmlWebpackPlugin({
        inject: true,
        template:  './src/index.html',
        filename: 'index.html',
        chunks: ['main'],
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template:  './src/articles.html',
      filename: 'articles.html',
      // чтобы засовывать css and js в нужные html
      chunks: ['articles']
    }),
    new WebpackMd5Hash(),
    new webpack.DefinePlugin({
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessor: require('cssnano'),
        cssProcessorPluginOptions: {
                preset: ['default'],
        },
        canPrint: true
    })
]
};
