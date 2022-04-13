const path = require('path')
const config = require('../config')
const PostcssCustomProperties = require('postcss-custom-properties')
const PostcssPresetEnv = require('postcss-preset-env')
const PostcssFlexbugsFixes = require('postcss-flexbugs-fixes')

const {
  NODE_ENV,
  compile_mode,
  TAG_ENVIRONMENT,
  ANALYZER,
  npm_package_version,
} = process.env

console.log('compile_mode1', compile_mode);

module.exports = {
  entry: {
    index: compile_mode === 'build' ? path.resolve(__dirname, '../src/components/index.tsx')  : path.resolve(__dirname, '../src/index')
  },
  resolve: {
    alias: {
      '@/src': path.resolve(__dirname, '../src'),
    },
    extensions: ['.js', '.json', '.ts', '.tsx', '.scss']
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          { loader: 'css-loader' }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          { loader: 'css-loader' },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  PostcssFlexbugsFixes,
                  PostcssPresetEnv({
                    autoprefixer: {
                      flexbox: 'no-2009'
                    },
                    stage: 3
                  }),
                ]
              }
            }
          },
          { loader: 'sass-loader' }
        ]
      },
      {
        test: /[^iconfont]\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: `${config.build.assetsRoot}/images/[name].[ext]`
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: `${config.build.assetsRoot}/media/[name].[ext]`
        }
      },
      {
        test: /iconfont.svg|\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: `${config.build.assetsRoot}/fonts/[name].[ext]`
        }
      }
    ]
  }
}
