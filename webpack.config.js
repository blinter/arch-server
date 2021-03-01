const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./src/client/Index.js",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: { presets: ["@babel/env"] }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  resolve: { extensions: ["*", ".js", ".jsx"] },
  output: {
    path: path.resolve(__dirname, "public/js/"),
    publicPath: "/js/",
    filename: "bundle.js"
  },
  devServer: {
    // writeToDisk: true,
    contentBase: path.join(__dirname, "public/"),
    port: 4000,
    publicPath: "http://localhost:4000/",
    hotOnly: true
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
};