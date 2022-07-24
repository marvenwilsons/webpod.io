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
const dashboardEventHandler = require('./dash-event-handler')
const dbEvents = require('../postgres/events')
const dashboardAndAdminApiRoutes = require('../express/index')
const util = require('../utils/util')
const socketOnReq = require('./on-req')

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

  // const dashboard = Object.assign(dashboardEvents, {
  //   exec: (location,action,payload) => {
  //     setTimeout(() => {
  //       socket.emit('exec', {
  //         location,
  //         action,
  //         payload
  //       })
  //     },100)
  //     return {
  //       exec: this.exec
  //     }
  //   }
  // })

  // dashboardEvents.on('exec',(location,action,payload) => {
  //   socket.emit('exec', {location,action,payload})
  // })
  const dashExec = (location,action,payload) => {
    socket.emit('exec', {location,action,payload})
  }

  const dashboard = dashboardEventHandler(adminEvents,dashExec,dbEvents)
 
  serverEvents.emit('ready',adminEvents,dashboard,dbEvents)
  dashboardAndAdminApiRoutes(app,dbEvents,adminEvents,dashboard)
  dashboardEventHandler(adminEvents,dashboard,dbEvents)

  // on request
  socketOnReq(socket,dashboard,admin_auth,tokenEvents, adminEvents)

  socket.on('prompt-response', function (responseBody) {
    
    if('key' in responseBody && 'data' in responseBody) {
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

// module.exports = serverEvents