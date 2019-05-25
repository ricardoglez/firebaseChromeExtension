var webpack = require("webpack");
var    path = require("path");
var    MiniCssExtractPlugin = require("mini-css-extract-plugin");
var    CopyWebpackPlugin = require("copy-webpack-plugin");
var    HtmlWebpackPlugin = require("html-webpack-plugin");

var beautify = require('js-beautify').js_beautify;

var options = {
  entry:  {
    bundle: './src/js/index.js',
    background: './src/js/background.js'
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name].js",
    publicPath:'/'
  },
  module: {
    rules: [
      {/** Images Rules */
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          // {
          //   loader: 'url-loader',
          //   options:{ limit: 18192},
          // },
          'file-loader?context=src/icons/[path][name].[ext]',
          {
            // images loader
            loader: 'image-webpack-loader',
            options: {
              disable: process.env.NODE_ENV != 'production' && process.env.NODE_ENV != 'compileTesting',
              mozjpeg: {
                progressive: true,
                quality: 65,
              },
              optipng: {
                enabled: true,
              },
              pngquant: {
                quality: '60-80',
                speed: 3
              },
              gifsicle: {
                interlaced: false
              },
            }
          },
        ],
        exclude: /node_modules/,
        // include: __dirname
      },    
      {/**Fonts and Svgs */
        test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file-loader?name=fonts/[name].[ext]'
      },
      {/**Styles Scss */
        test: /\.(scss)$/, 
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader", 
          },
          "sass-loader"
        ]
      },
      {/**Styles css */
        test: /\.css$/,
        use:[
          {
            loader: MiniCssExtractPlugin.loader,
            options: { publicPath: '../'},
          },
          "css-loader"
        ]
      },
      {/** Jsx && Js */
        test: /\.(jsx|js)$/, 
        exclude: /node_modules/ ,
        use:{loader: 'babel-loader'}, 
      }
    ] 
  },
  resolve: {
    // These options change how modules are resolved
    extensions: [
      '.js',
      '.jsx',
      '.json',
      '.scss',
      '.css',
      '.jpeg',
      '.jpg',
      '.gif',
      '.png'
    ], // Automatically resolve certain extensions
    modules: [
        'node_modules',
        path.resolve( __dirname, './node_modules' ),
        path.resolve( __dirname, './src' )
    ],
    alias: {
      // Create aliases
      icons: path.resolve(__dirname, 'src/icons') ,
      images: path.resolve(__dirname, 'src/images') 
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/popup/popup.html',
      filename: "./popup.html"
    }),
    new HtmlWebpackPlugin({
      template: 'src/js/background/background.html',
      filename: "./background.html"
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      filename: "./index.html"
    }),
    new MiniCssExtractPlugin({
      filename:"styles.css",
      chunkFilename:"[name].css",
    }),
    new webpack.HotModuleReplacementPlugin(),
    // clean the build folder
    // expose and write the allowed env vars on the compiled bundle
    new CopyWebpackPlugin([{
      from: "src/manifest.json",
      transform: function (content, path) {
        // generates the manifest file using the package.json informations
        return Buffer.from( beautify (
            JSON.stringify({
              description: process.env.npm_package_description,
              version: process.env.npm_package_version,
              ...JSON.parse(content.toString())
            }), { indent_size:2 } ));
      }
    }]),
  ],
  devServer:{
    contentBase: path.resolve(__dirname, 'build'),
    hot: true
  },
  devtool: 'eval-source-map'
};

module.exports = options;
