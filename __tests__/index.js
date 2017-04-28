const EventEmitter = require('events')
const events = new EventEmitter()
const sleep = time => new Promise(resolve => setTimeout(resolve, time))
const Rpc = require('../src')
const { RpcError } = Rpc
const client = Rpc.client(events)
const server = Rpc.server(events)({
  async helloWorld() {
    await sleep(1)
    return 'Hello world'
  },
  async echo(something) {
    await sleep(1)
    return something
  },
  async getToken() {
    return this.token
  },
  faultyProcedure() {
    throw Error('Confidential error message')
  },
  rpcError() {
    throw new RpcError('An RpcError')
  }
})

test('you can send requests', async () => {
  const actual = await client.request('helloWorld')
  const expected = 'Hello world'
  expect(actual).toBe(expected)
})

test('you can pass parameters', async () => {
  const actual = await client.request('echo', 'Loco')
  const expected = 'Loco'
  expect(actual).toBe(expected)
})

test('you can set meta-data', async () => {
  client.set('token', 'lalala')
  const actual = await client.request('getToken')
  const expected = 'lalala'
  expect(actual).toBe(expected)
})

it('throws an error if the procedure isn\'t defined', async () => {
  let error
  try {
    await client.request('nonExistant')
  } catch (_error_) {
    error = _error_
  }
  expect(error.message).toBe('No procedure named "nonExistant" is set!')
})

it('rethrows server side errors, but without the error message', async () => {
  let error
  try {
    await client.request('faultyProcedure')
  } catch (_error_) {
    error = _error_
  }
  expect(error.message).toBe('An error occurred')
})

it('rethrows server side errors with the error message if it is an instance of RpcError', async () => {
  let error
  try {
    await client.request('rpcError')
  } catch (_error_) {
    error = _error_
  }
  expect(error.message).toBe('An RpcError')
})
