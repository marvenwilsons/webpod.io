const admin = require('./admin-server')

admin.on('request', (name, payload) => {
    console.log('something is requesting', name, payload)
})