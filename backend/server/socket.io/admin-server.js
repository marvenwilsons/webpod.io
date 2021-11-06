const http = require('http')
const express = require('express')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server,{
  cookie: false
})

io.on('connection', (socket) => {
  console.log('ℹ Client connected')
})

setInterval(() => {
  io.emit('ping', 'test')
},5000)

server.listen(8000, 'backend', (err) => {
  console.log('ℹ There was an error: ', err)
})