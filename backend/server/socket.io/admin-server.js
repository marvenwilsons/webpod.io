const http = require('http')
const express = require('express')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server,{
  cookie: false
})

const admin_methods = require('./admin_methods/index')

io.on('connection', (socket) => {
  console.log('ℹ Client connected')

  socket.on('req', ({name, payload}) => {
    console.log('ℹ request received for ',name)

    try {
      admin_methods(data => socket.emit('notification',data))[name](payload)
    } catch(err) {
      socket.emit('error', {
        method_name: name,
        message: err
      })
    }
  })
})

server.listen(process.env.PORT, 'backend', (err) => {
  if(err) {
    console.log('ℹ There was an error: ', err)
  }
})