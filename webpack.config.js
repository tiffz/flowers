const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  context: path.join(__dirname, 'src'),
  entry: ['webpack-hot-middleware/client?path=/__webpack_hmr', './main.js'],
  output: {
    path: path.join(__dirname, 'public/build'),
    filename: 'bundle.min.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
};
