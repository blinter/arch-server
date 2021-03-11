const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: "./src/Index.tsx",
  mode: "development",
  module: {
    rules: [
      // {
      //   test: /\.(js|jsx)$/,
      //   exclude: /(node_modules|bower_components)/,
      //   loader: "babel-loader",
      //   options: { presets: ["@babel/env"] }
      // },
      {
        test: /\.(tsx|jsx)$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  resolve: { extensions: [".js", ".ts", ".tsx", ".jsx"] },
  output: {
    path: path.resolve(__dirname, "public/js/"),
    publicPath: "/js/",
    filename: "js/bundle.js"
  },
  devServer: {
    // writeToDisk: true,
    contentBase: path.join(__dirname, "public/"),
    port: 4000,
    publicPath: "http://localhost:4000/",
    hotOnly: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // new HtmlWebpackPlugin({
    //   hash: true,
    //   template: "./public/old.index.html",
    //   filename: "index.html"
    // })
  ]
};