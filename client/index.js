const uuid = require('uuid/v4')

module.exports = io => {
  let metaData = {}

  return {
    request(fn, ...args) {
      return new Promise((resolve, reject) => {
        const id = uuid()
        io.once(id, response => {
          if (response.error) {
            reject(Error(response.error))
          } else {
            resolve(response.body)
          }
        })
        io.emit('request', { id, fn, args, metaData })
      })
    },
    set(key, value) {
      metaData[key] = value
    }
  }
}
