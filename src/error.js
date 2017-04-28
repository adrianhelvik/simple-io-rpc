class RpcError extends Error {
  constructor(...args) {
    super(...args)
    this.isRpcError = true
  }
}

module.exports = RpcError
