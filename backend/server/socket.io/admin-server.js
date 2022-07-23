const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const app = express()
const server = http.createServer(app)
const { query } = require('../postgres/db')
const init = require('../postgres/init')
const io = socketio(server,{cookie: false})
const events = require('events')
const serverEvents = new events.EventEmitter()
const adminEvents = new events.EventEmitter()
const tokenEvents = new events.EventEmitter()
const dashboardEvents = new events.EventEmitter()
const dbEvents = require('../postgres/events')
const dashboardAndAdminApiRoutes = require('../express/index')
const util = require('../utils/util')

app.use(express.json())

app.get('/', async (req,res) => {
  const r = await query(`SELECT * FROM information_schema.tables WHERE table_schema = 'public'`)
  if(r.rows.length == 0) {
    console.log('APP IS NOT INITIALIZED')
    res.json({
      message: 'APP IS NOT INITIALIZED',
      generated_db_info: {
        db_name: process.env.POSTGRES_DB,
        table_prefix: process.env.TABLE_PREFIX
      }
    })
  } else {
    res.json({
      message: 'OK'
    })
  }
  
})
app.post('/init', (req,res) => {
  global.log('initializing ...')
  global.progress('15%')
  init(req.body, (msg) => {
    if(msg === 'OK') {
      console.log('init done')
      res.json({
        message: 'OK'
      })
    }
  })
})

const admin_methods = require('./admin_methods/index')
const admin_auth = require('./admin_methods/admin_auth')
const prompts = {}

io.on('connection', async function (socket) {
  console.log('ℹ Client connected')

  // loggers
  global.log      = Object.freeze(msg => socket.emit('log',msg))
  global.progress = Object.freeze(val => socket.emit('progress', val))
  global.refresh  = Object.freeze(_ => socket.emit('refresh'))
  global.exec     = Object.freeze((fn,arg) => socket.emit('exec', fn, arg))
  global.prompt   = Object.freeze((prompt, cb) => {
    // generate a unique string use it as a key and cb as the value
    // save it to prompts object
    // when prompts response, delete after executing the cb
    const key = util.randId(10)
    socket.emit('prompt', {
      key,
      prompt
    })
    
    prompts[key] = cb

  })

  Object.assign(adminEvents, {
    ...admin_methods(),
    token: tokenEvents
  })

  const dashboard = Object.assign(dashboardEvents, {
    exec: (location,action,payload) => {
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
  })
 
  serverEvents.emit('ready',adminEvents,dashboard,dbEvents)
  dashboardAndAdminApiRoutes(app,dbEvents,adminEvents,dashboard)

  // on request
  socket.on('req', async function ({name, payload}) {
    try {
      console.log('** REQUESTING!!', name)

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
          tokenEvents.emit('data',payload.token)

          if(authenticate_admin.is_valid) {
            console.log('** PROCESSING REQUEST!!', name)
            dashboard.emit(name, payload)
          } else {
            tokenEvents.emit('expire')

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

  socket.on('prompt-response', function (responseBody) {
    
    if('key' in responseBody && 'data' in responseBody) {
      console.log('prompt-response executed')
      if(responseBody.key in prompts) {
        prompts[responseBody.key](responseBody.data)
        setTimeout(function() {
          delete prompts[responseBody.key]
        },0)
      }
    }

  })
})

server.listen(process.env.ADMIN_SERVER_PORT, 'backend', (err) => {
  serverEvents.emit('mount')
  if(err) {
    serverEvents.emit('error')
  }
})

module.exports = serverEvents