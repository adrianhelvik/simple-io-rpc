'use strict';

var uuid = require('uuid/v4');

module.exports = function (io) {
  var metaData = {};

  return {
    request: function request(fn) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      return new Promise(function (resolve, reject) {
        var id = uuid();
        io.once(id, function (response) {
          if (response.error) {
            reject(Error(response.error));
          } else {
            resolve(response.body);
          }
        });
        io.emit('request', { id: id, fn: fn, args: args, metaData: metaData });
      });
    },
    set: function set(key, value) {
      metaData[key] = value;
    }
  };
};