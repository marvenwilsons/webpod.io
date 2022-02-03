const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const fs = require('fs')
const app = express()
const server = http.createServer(app)
const io = socketio(server,{
  cookie: false
})

app.get('/test', () => {
  console.log("hey")
})

const admin_methods = require('./admin_methods/index')
const admin_auth = require('./admin_methods/admin_auth')
const dashboard_event_handler = require('./admin_methods/dashboard-event-handler')

io.on('connection', async function (socket) {
  console.log('ℹ Client connected')
  const dashboard_exec = {
    exec(location,action,payload) {
      setTimeout(() => {
        socket.emit('exec', {
          location,
          action,
          payload
        })
      },100)
      return {
        exec: this.exec
      }
    }
  }
  const dashboard_events = await dashboard_event_handler(dashboard_exec)
  dashboard_events.onMount()

  socket.on('req', async function ({name, payload}) {
    try {
      if(payload) {
        if(payload.token == undefined && payload.user == undefined) {
          // without user and token in payload object is invalid request
          socket.emit('error', {
            method_name: undefined,
            message: 'authentication failed'
          })
        } else if(name == undefined) {
          // without method name string is an invalid request
          socket.emit('error', {
            method_name: undefined,
            message: 'authentication failed'
          })
        } else {
          // process request
          const authenticate_admin = await admin_auth({token: payload.token, user: payload.user})

          if(authenticate_admin.is_valid) {
            
            dashboard_events.onRequest(name, payload.user)

            const requested_method = admin_methods()[name]
            
            if(requested_method) {
              const request_response = await requested_method(payload)

              // response to request
              socket.emit('notification', {
                method_name: name,
                payload: request_response
              })
            }

          } else {
            dashboard_events.onTokenExpire()

            socket.emit('error', {
              method_name: name,
              message: 'authentication failed'
            })
            
          }
        }
      }

      
    } catch(err) {
      console.log('an error occured', err)
      socket.emit('error', {
        method_name: name,
        message: err.message
      })
    }
  })
})

server.listen(process.env.ADMIN_SERVER_PORT, 'backend', (err) => {
  if(err) {
    console.log('ℹ There was an error: ', err)
  }
})