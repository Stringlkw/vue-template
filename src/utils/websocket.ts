import io from 'socket.io-client'

const Socket = (namespace: string) => {
  // namespace:命名空间或path
  const url = `ws://127.0.0.1:5000/${namespace}`
  const options = {
    transports: ['websocket'],
    reconnectionAttempts: 3,
    reconnectionDelay: 3000,
    timestampRequests: true,
    autoConnect: false,
  }
  return io(url, options)
}

const socket = Socket('chat')

export default socket
