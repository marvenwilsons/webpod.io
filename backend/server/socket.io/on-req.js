module.exports = (socket,dashboard,admin_auth,tokenEvents) => {
    socket.on('req', async function ({name, payload}) {
      try {
        console.log('** REQUESTING!!', name)
        if('token' in payload && 'user' in payload && name != undefined) {
          const authenticate_admin = await admin_auth({token: payload.token, user: payload.user})
            tokenEvents.emit('data',payload.token)

            if(authenticate_admin.is_valid) {
              console.log('** PROCESSING REQUEST!!', name)
              // dashboard.emit(name, payload)
              dashboard[name](payload)
            } else {
              tokenEvents.emit('expire')

              socket.emit('error', {
                method_name: name,
                message: 'authentication failed'
              })
              
            }
        } else {
          socket.emit('error', {
            method_name: undefined,
            message: 'authentication failed'
          })
        }

        
      } catch(err) {
        console.log('an error occured', err)
        socket.emit('error', {
          method_name: name,
          message: err.message
        })
      }
    })
}