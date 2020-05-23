const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');

const app = express();

const compiler = webpack(webpackConfig);

app.use(
  webpackHotMiddleware(compiler, {
    log: console.info,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000,
  }),
);

app.use(
  webpackDevMiddleware(compiler, {
    hot: true,
    filename: 'bundle.min.js',
    publicPath: '/',
    stats: {
      colors: true,
    },
    historyApiFallback: true,
  }),
);

app.use(express.static(`${__dirname}/public`));

const server = app.listen(8080, () => {
  const host = server.address().address;
  const { port } = server.address();
  console.info('App listening at http://%s:%s', host, port);
});
