'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var RpcError = require('../error');

module.exports = function (io) {
  return function (routes) {
    io.on('request', function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee(_ref) {
        var id = _ref.id,
            fn = _ref.fn,
            args = _ref.args,
            metaData = _ref.metaData;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (routes[fn]) {
                  _context.next = 3;
                  break;
                }

                io.emit(id, {
                  error: 'No procedure named "' + fn + '" is set!'
                });
                return _context.abrupt('return');

              case 3:
                _context.prev = 3;
                _context.t0 = io;
                _context.t1 = id;
                _context.next = 8;
                return routes[fn].apply(metaData, args);

              case 8:
                _context.t2 = _context.sent;
                _context.t3 = {
                  body: _context.t2
                };

                _context.t0.emit.call(_context.t0, _context.t1, _context.t3);

                _context.next = 16;
                break;

              case 13:
                _context.prev = 13;
                _context.t4 = _context['catch'](3);

                if (_context.t4 && _context.t4.isRpcError) {
                  io.emit(id, {
                    error: _context.t4.message
                  });
                } else {
                  io.emit(id, {
                    error: 'An error occurred'
                  });
                }

              case 16:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, undefined, [[3, 13]]);
      }));

      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }());
  };
};