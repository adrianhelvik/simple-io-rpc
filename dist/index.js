'use strict';

require('babel-polyfill');

module.exports = {
  client: require('./client'),
  server: require('./server'),
  RpcError: require('./error')
};