const path = require('path')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf.js')
const HtmlWebpackPlugin = require('html-webpack-plugin');

const webpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  output: {
    path: path.resolve('./dist'),
    filename: 'js/[name].js?[fullhash:8]',
    chunkFilename: 'js/[name].chunk.js?[fullhash:8]',
    publicPath: '/'
  },
  cache: true,
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            }
          }
        ]
      },
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      // 生成出来的 html 文件名
      // filename: [name],
      // 每个html的模版，这里多个页面使用同一个模版
      template: path.resolve(__dirname, '../public/index.html'),
      // // 自动将引用插入html
      // inject: !config.build.isSsrMode,
      // 每个html引用的js模块，也可以在这里加上vendor等公用模块
      // chunks: [name, `react`, `vendor`],
      // // 自定义 option 在 html 中 使用 <%= htmlWebpackPlugin.options.external %> 调用
      // external: config.build.externalData(replaceLocal),
      // 压缩
      minify: {
        minifyJS: true, // 压缩 HTML 中的 JS
        minifyCSS: true, // 压缩 HTML 中的 CSS
        removeComments: true, // 移除注释
        collapseWhitespace: true, // 去除空格
        removeEmptyAttributes: true, // 去除空属性
        preserveLineBreaks: true // 标签分行
      }
    })
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    hot: true,
    host: '127.0.0.1',
    open: true,
    // firewall: false,
    compress: true,
    port: 3000,
  },
})

module.exports = webpackConfig
