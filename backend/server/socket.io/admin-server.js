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

io.on('connection', function (socket) {
  console.log('ℹ Client connected')

  socket.on('req', async function ({name, payload}) {

    try {

      const authenticate_admin = await admin_auth({token: payload.token, user: payload.user})

      if(authenticate_admin.is_valid) {

        const requested_method = admin_methods()[name]

        const request_response = await requested_method(payload)

        socket.emit('notification', {
          method_name: name,
          payload: request_response
        })

      } else {

        socket.emit('error', {
          method_name: name,
          message: 'authentication failed'
        })
        
      }
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