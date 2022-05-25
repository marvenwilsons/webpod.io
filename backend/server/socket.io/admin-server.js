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

app.get('/apps', (req,res) => {
  // returns an array of all apps installed
  // example: [{app_name: 'unitile'},{app_name: 'uniview'}]
  console.log('apps', req.query)
})

// returns all app instances basic info
// example instance object: {last_modified, title, modified_by}
// example route call: /apps/unitile
// access: req.params
app.get('/apps/:app_name', (req,res) => {
  
  setTimeout(() => {
    res.json([
      {title: 'VID D23 23GDS',modified_date: '05/03/2022', modified_by: 'Marven Wilson Donque', instance_from: 'unitile'},
      {title: 'GFOADHF SDV', modified_date: '04/02/2022', modified_by: 'Kill kla', instance_from: 'unitile'},
      {title: 'BD 3 DF', modified_date: '05/11/2021', modified_by: 'Kill kla', instance_from: 'unitile'},
      {title: 'Custom 1', modified_date: '05/11/2021', modified_by: 'Kill kla', instance_from: 'unitile'},
      {title: 'Custom 2', modified_date: '05/11/2021', modified_by: 'Kill kla', instance_from: 'unitile'},
      {title: 'App page', modified_date: '05/11/2021', modified_by: 'Kill kla', instance_from: 'unitile'},
    ])
  },0)
})
app.delete('/apps/:app_name', (req,res) => {

})
app.post('/apps/:app_name', (req,res) => {
  console.log('posting!')
})
// manage specific app data instance
app.get('/apps/:app_name/:instance_title', (req,res) => {
  // returns a specific app instance project data
  // access: req.params
  const {app_name, instance_title} = req.params
  // query the app_instances table

  const sample_response = {
    app_name: '',
    instance_data: '',
    last_modified: '',
    modified_by: '',
    instance_title: '',
    allowed_users: '',
    history: ''
  }

  const stringify = function (fn) {
      return fn.toString()
  }


  sample_response.app_name = 'unitile'
  sample_response.last_modified = '05/03/2022'
  sample_response.modified_by = 'Marven Wilson Donque'
  sample_response.instance_title = instance_title
  sample_response.allowed_users = ['Marven Wilson Donque', 'Janny Ann']
  sample_response.history = ['EIW231s']
  sample_response.instance_data = {
    name: 'Layout Builder',
    body: {
      paneConfig: {
        title: 'Layout Builder (unitile ver-alpha)',
        isClosable: true,
        allowOverflow: false
      },
      view: 'unitile',
      viewData: {
        title: "My Custom Layout",
        screens: {
          default: {"tiles":[{"id":"vCQM4lQca1","rowStart":1,"rowEnd":7,"colStart":2,"colEnd":6,"selected":true,"customClasses":[],"customStyle":{},"align":"stretch","blocks":[],"layers":[{"layer_id":"layer-ViZEdLwwUW","layer_order":1,"layer_blocks":[],"layer_rows":[{"custom_style":{},"classes":[],"wrap_items":false,"blocks":[{"text_style":"text","value":"Lorem ipsum","component_name":"text","custom_inline_style":{},"classes":[],"id":"QifCUXZ9mt"}],"row_id":"MtXwLRK3Ma"}],"layer_name":"default","layer_lock":true,"layer_show":true,"active_layer":"default"}],"layerOnFocus":1,"zIndex":1}],"gridGap":5,"maxCol":6,"gridContainerStyle":{"background":"#E0F2F1"},"tiles_global_style":{},"gridColumns":["1fr","3fr","3fr","3fr","3fr","1fr"],"gridContainerJustify":"stretch"},
          '1-300': {"tiles":[{"id":"vCQM4lQca1","rowStart":1,"rowEnd":7,"colStart":2,"colEnd":4,"selected":false,"customClasses":[],"customStyle":{},"align":"stretch","blocks":[],"layers":[{"layer_id":"layer-ViZEdLwwUW","layer_order":1,"layer_blocks":[],"layer_rows":[{"custom_style":{},"classes":[],"wrap_items":false,"blocks":[{"text_style":"text","value":"Lorem ipsum","component_name":"text","custom_inline_style":{},"classes":[],"id":"QifCUXZ9mt"}],"row_id":"MtXwLRK3Ma"}],"layer_name":"default","layer_lock":true,"layer_show":true,"active_layer":"default"}],"layerOnFocus":1,"zIndex":1},{"id":"vT7hX6G2Ss","rowStart":1,"rowEnd":7,"colStart":4,"colEnd":6,"selected":true,"customClasses":[],"customStyle":{},"align":"stretch","blocks":[],"layers":[{"layer_id":"layer-WebtyeMein","layer_order":1,"layer_blocks":[],"layer_rows":[],"layer_name":"default","layer_lock":true,"layer_show":true,"active_layer":"default"}],"layerOnFocus":1,"zIndex":1}],"gridGap":5,"maxCol":6,"gridContainerStyle":{"background":"#E0F2F1"},"tiles_global_style":{},"gridColumns":["1fr","3fr","3fr","3fr","3fr","1fr"],"gridContainerJustify":"stretch"},
          '300-700': {"tiles":[{"id":"vCQM4lQca1","rowStart":1,"rowEnd":7,"colStart":2,"colEnd":4,"selected":false,"customClasses":[],"customStyle":{},"align":"stretch","blocks":[],"layers":[{"layer_id":"layer-ViZEdLwwUW","layer_order":1,"layer_blocks":[],"layer_rows":[{"custom_style":{},"classes":[],"wrap_items":false,"blocks":[{"text_style":"text","value":"Lorem ipsum","component_name":"text","custom_inline_style":{},"classes":[],"id":"QifCUXZ9mt"}],"row_id":"MtXwLRK3Ma"}],"layer_name":"default","layer_lock":true,"layer_show":true,"active_layer":"default"}],"layerOnFocus":1,"zIndex":1},{"id":"vT7hX6G2Ss","rowStart":1,"rowEnd":7,"colStart":4,"colEnd":6,"selected":true,"customClasses":[],"customStyle":{},"align":"stretch","blocks":[],"layers":[{"layer_id":"layer-WebtyeMein","layer_order":1,"layer_blocks":[],"layer_rows":[],"layer_name":"default","layer_lock":true,"layer_show":true,"active_layer":"default"}],"layerOnFocus":1,"zIndex":1}],"gridGap":5,"maxCol":6,"gridContainerStyle":{"background":"#E0F2F1"},"tiles_global_style":{},"gridColumns":["1fr","3fr","3fr","3fr","3fr","1fr"],"gridContainerJustify":"stretch"},
        },
      },
      viewHooks: stringify((paneCollection,pane,view) => ({
        onSaveLayout(layout) {
          layout.map(e => {
            console.log('heheh',JSON.stringify(e))
          })
        }
      })),
      viewConfig: {
        editable: true
      }
    }
  }

  setTimeout(() => {
    res.json(sample_response)
  //   res.status(400).send({
  //     message: 'This is an error!'
  //  })
  },500)

})
app.get('/apps/:app_name/data/:instance_title', (req,res) => {
  // returns a specific app instance project data
  // access: req.params
  const {app_name, instance_title} = req.params
  // query the app_instances table

  const sample_response = {
    app_name: '',
    instance_data: '',
    last_modified: '',
    modified_by: '',
    instance_title: '',
    allowed_users: '',
    history: ''
  }

  const stringify = function (fn) {
      return fn.toString()
  }
  
})
app.delete('/apps/:app_name/:instance_title', (req,res) => {
  // returns a specific app instance project data
  // access: req.params
  console.log('delete app instance data',req.params)
  setTimeout(() => {
    res.json({
      message: 'File not found'
    })
  },500)
})
app.post('/apps/:app_name/:instance_title', (req,res) => {
  // inset an app instance with an empty viewData
  setTimeout(() => {
    res.json({
      message: 'OK'
    })
  },500)
})
app.put('/apps/:app_name/:instance_title', (req,res) => {
  // update existing
  const {app_name, instance_title} = req.params
  const body = req.body
  const query = req.query
  if(query.rename) {
    console.log('renaming ', instance_title, 'to', query.rename)
    setTimeout(() => {
      console.log('renaming response OK')
      res.json({
        message: 'OK',
        new_title: query.rename
      })
    },500)
  } else {
    setTimeout(() => {
      res.json({
        message: 'OK'
      })
    },500)
  }

  
})


const admin_methods = require('./admin_methods/index')
const admin_auth = require('./admin_methods/admin_auth')

io.on('connection', async function (socket) {
  console.log('ℹ Client connected')

  // loggers
  global.log      = Object.freeze(msg => socket.emit('log',msg))
  global.progress = Object.freeze(val => socket.emit('progress', val))
  global.exec     = Object.freeze((fn,arg) => socket.emit('exec', fn, arg))

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
 
  serverEvents.emit('ready',adminEvents,dashboard)

  // on request
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
          tokenEvents.emit('data',payload.token)

          if(authenticate_admin.is_valid) {

            dashboardEvents.emit(name, payload.user)
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
})

server.listen(process.env.ADMIN_SERVER_PORT, 'backend', (err) => {
  serverEvents.emit('mount')
  if(err) {
    serverEvents.emit('error')
  }
})

module.exports = serverEvents