const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const BeautifyHtmlWebpackPlugin = require('beautify-html-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const { extendDefaultPlugins } = require('svgo');
const TerserPlugin = require('terser-webpack-plugin');

// data
const setting = require('./webpack.setting.js');
// const devMode = process.env.NODE_ENV !== 'production';
const filePath = setting.filePath; // 檔案路徑
const file = setting.html; // 檔案
const _entry = {};
const plugins = [
  new MiniCssExtractPlugin({
    filename: filePath.css + '[name].css'
  }),
  new CopyPlugin({
    patterns: setting.copy
  }),
  new BeautifyHtmlWebpackPlugin()
];
let IP = null;

const interfaces = require('os').networkInterfaces();
for (const devName in interfaces) {
  const iface = interfaces[devName];
  for (let i = 0; i < iface.length; i += 1) {
    const alias = iface[i];
    if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
      IP = alias.address;
    }
  }
}

for (let i = 0; i < file.length; i++) {
  if (file[i].chunks) {
    for (let j = 0; j < file[i].chunks.length; j++) {
      const _chunks = file[i].chunks[j];

      _entry[file[i].chunks[j]] = _chunks + '.js';
    }
  }

  file[i].inject = 'body';
  plugins.push(new HtmlWebpackPlugin(file[i]));
}

console.log(plugins);

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: _entry,
  output: {
    filename: 'scripts/[name].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  resolve: {
    // alias: {
    //   '@': path.resolve(__dirname, 'src')
    // },
    symlinks: false,
    modules: [
      path.resolve(__dirname, 'src'),
      path.resolve('src/' + filePath.scripts),
      path.resolve('src/' + filePath.css),
      path.resolve('src/' + filePath.imgs),
      path.resolve('src/' + filePath.component),
      path.resolve('src/' + filePath.container),
      // path.resolve('src/'+filePath.fonts),
      path.resolve('src/'+filePath.svgs),
      // path.resolve('src/static/json'),
      'node_modules'
    ]
  },
  module: {
    rules: [
      { test: /\.ejs$/i, use: [{ loader: 'ejs-easy-loader' }] },
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: filePath.csspath
            }
          },
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader'] // polyfill?
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        type: 'asset',
        include: path.resolve(__dirname, `src/${filePath.imgs}`),
        generator: {
          filename: '[path][name][ext]?[hash:8]'
        },
        use: [
          {
            loader: ImageMinimizerPlugin.loader,
            options: {
              // severityError: 'warning',
              minimizerOptions: {
                plugins: [
                  ['gifsicle', {
                    interlaced: true,
                    optimizationLevel: 3
                  }],
                  ['jpegtran', {
                    progressive: true,
                    quality: 75
                  }],
                  ['pngquant', {
                    quality: [0.60, 0.75],
                    speed: 4
                  }],
                  ['svgo', {
                    plugins: extendDefaultPlugins([
                      {
                        name: 'removeViewBox',
                        active: false
                      }

                    ])
                  }]
                ]
              }
            }
          }
        ]
      }, {
        test: /\.svg$/,
        include: path.resolve(__dirname, `src/${filePath.svgs}`),
        use: [
          {
            loader: 'svg-sprite-loader'
          },
          'svgo-loader'
        ]
      },
      // {
      //   test: /\.(jpe?g|png)$/i,
      //   use: [
      //     {
      //       loader: ImageMinimizerPlugin.loader,
      //       options: {
      //         deleteOriginalAssets: false,
      //         filename: '[path][name].webp?[hash:8]',
      //         minimizerOptions: {
      //           plugins: [
      //             ['webp', {
      //               quality: 88
      //             }]
      //           ]
      //         }
      //       }
      //     }
      //   ]
      // },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource'
      }
    ]
  },
  optimization: {
    runtimeChunk: false,
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin({
        extractComments: false
      })
    ]
  },
  plugins,
  devServer: {
    host: IP, // 預設是 localhost，設定則可讓外網存取
    compress: true, // 使用 gzip 壓縮
    port: 8080,
    hot: true, // 使用 HMR
    hotOnly: true,
    watchContentBase: true,
    https: true,
    open: false
  }
};
