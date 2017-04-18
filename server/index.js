const RpcError = require('../error')

module.exports = io => routes => {
  io.on('request', async ({ id, fn, args, metaData }) => {
    if (! routes[fn]) {
      io.emit(id, {
        error: 'No procedure named "' + fn + '" is set!'
      })
      return
    }
    try {
      io.emit(id, {
        body: await routes[fn].apply(metaData, args)
      })
    } catch (error) {
      if (error instanceof RpcError) {
        io.emit(id, {
          error: error.message
        })
      } else {
        io.emit(id, {
          error: 'An error occurred'
        })
      }
    }
  })
}
