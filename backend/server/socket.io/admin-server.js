const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const fs = require('fs')
const app = express()
const server = http.createServer(app)
const io = socketio(server,{
  cookie: false
})

const bodyParser = require('body-parser')
app.use(bodyParser.json({ extended: false }))

app.get('/apps', (req,res) => {
  // returns an array of all apps installed
  // example: [{app_name: 'unitile'},{app_name: 'uniview'}]
  console.log('apps', req.query)
})
app.get('/apps/:app_name', (req,res) => {
  // returns all app instances basic info
  // example instance object: {last_modified, title, modified_by}
  // example route call: /apps/unitile
  // access: req.params
  setTimeout(() => {
    res.json([
      {title: 'VID D23 23GDS',modified: '05/03/2022', modified_by: 'Marven Wilson Donque'},
      {title: 'GFOADHF SDV', modified: '04/02/2022', modified_by: 'Kill kla'},
      {title: 'BD 3 DF', modified: '05/11/2021', modified_by: 'Kill kla'},
      {title: 'Custom 1', modified: '05/11/2021', modified_by: 'Kill kla'},
      {title: 'Custom 2', modified: '05/11/2021', modified_by: 'Kill kla'},
      {title: 'App page', modified: '05/11/2021', modified_by: 'Kill kla'},
    ])
  },2000)
})
app.delete('/apps/:app_name', (req,res) => {

})
app.post('/apps/:app_name', (req,res) => {

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
      },
      view: 'unitile',
      viewData: [
        {"id":"kxTbRahwYk","rowStart":2,"rowEnd":3,"colStart":1,"colEnd":3,"selected":false,"customClasses":[],"customStyle":{},"align":"stretch"},
        {"id":"wRxrs27gOf","rowStart":2,"rowEnd":3,"colStart":3,"colEnd":5,"selected":false,"customStyle":{},"customClasses":[],"isAClone":"kxTbRahwYk"},
        {"id":"DViGBGR20e","rowStart":1,"rowEnd":2,"colStart":1,"colEnd":5,"selected":false,"customClasses":[],"customStyle":{},"align":"stretch"}
      ],
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
  },4000)

})
app.delete('/apps/:app_name/:instance_title', (req,res) => {
  // returns a specific app instance project data
  // access: req.params
  console.log(req.params)
  setTimeout(() => {
    res.json({
      message: 'success'
    })
  },1000)
})
app.post('/apps/:app_name/:instance_title', (req,res) => {
  // add new
  console.log("adding",req.body)
  setTimeout(() => {
    res.json({
      message: 'success'
    })
  },1000)
})
app.put('/apps/:app_name/:instance_title', (req,res) => {
  // update existing
  const address = req.params
  const body = req.body

  setTimeout(() => {
    res.json({
      message: 'success'
    })
  },1000)
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