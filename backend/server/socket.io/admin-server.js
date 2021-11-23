const http = require('http')
const express = require('express')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server,{
  cookie: false
})

const admin_methods = require('./admin_methods/index')
const admin_auth = require('./admin_methods/admin_auth')

io.on('connection', (socket) => {
  console.log('ℹ Client connected')

  socket.on('req', ({name, payload}) => {
    console.log('ℹ request received for ',name)

    try {
      admin_auth(
        {token: payload.token, user: payload.user}, 
        () => {
          admin_methods()
          [name]
          ({req: payload}, data => socket.emit('notification',{
            payload: data,
            method_name: name
          }))
        }
      )
    } catch(err) {
      socket.emit('error', {
        method_name: name,
        message: err
      })
    }
  })
})

server.listen(process.env.ADMIN_SERVER_PORT, 'backend', (err) => {
  if(err) {
    console.log('ℹ There was an error: ', err)
  }
})