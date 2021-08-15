const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env = {}) => {

  const { mode = 'development' } = env;

  const isProd = env.mode === 'production';

  const getStyleLoaders = () => {
    return [
      isProd ? MiniCssExtractPlugin.loader : 'style-loader',
      'css-loader'
    ]
  };

  const getPlugins = () => {
    const plugins = [
      new HtmlWebpackPlugin({
        title: 'hello, world!',
        template: 'public/index.html'
      })
    ];

    if (isProd) {
      plugins.push(
        new MiniCssExtractPlugin({
          filename: 'main-[hash:8].css'
        })
      );
    }

    return plugins;
  }

  return {
    mode: isProd ? 'production' : 'development',

    output: {
      filename: isProd ? 'main-[hash:8].js' : undefined
    },

    module: {
      rules: [
        // loading js
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: "babel-loader"
        },
        // loading images
        {
          test: /\.(png|jpg|jpeg|svg|gif)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: 'img',
                name: '[name]-[sha1:hash:7].ext'
              }
            }
          ]
        },
        //loading fonts
        {
          test: /\.(otf|ttf|eot|woff|woff2)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: 'fonts',
                name: '[name].ext'
              }
            }
          ]
        },
        {
          test: /\.css$/,
          use: getStyleLoaders()
        },
        // loading stylus
        {
          test: /\.styl$/,
          use: [
            ...getStyleLoaders(),
            { loader: 'stylus-loader' }
          ]
        }
      ]
    },

    plugins: getPlugins(),

    devServer: {
      open: true
    }
  }
};