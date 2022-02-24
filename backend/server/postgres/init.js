const dbEvents = require('./events')


function init (body, cb) {
    const {firstName, lastName, username, password, email} = body

    dbEvents.emit('get-all-tables')
    dbEvents.on('get-all-tables-done', (rows) => {
        rows.length === 0 && dbEvents.emit('install-ossp-extension')
    })

    dbEvents.on('install-ossp-extension-done', () => {
        /**
         * Create essential webpod tables
         */
        dbEvents.emit('create-users-table')
        dbEvents.emit('create-services-table', () => {
            dbEvents.emit('create-service-version-table', () => {
                dbEvents.emit('create-menu-table')
            })
        })
        dbEvents.emit('create-roles-table')
        dbEvents.emit('create-apps-table',() => {
            dbEvents.emit('create-app-instance-table')
        })  
        dbEvents.emit('create-collections-table', () => {
            dbEvents.emit('create-collection-instance-table')
        })
    })

    dbEvents.on('call', (name) => {
        console.log('done ==> ',name)
    })

    // dbEvents.on('create-users-table-done', () => {
    //     dbEvents.emit('create-roles-table')
    // })

    // dbEvents.on('create-roles-table-done', () => {
    //     dbEvents.emit('insert-role', 'master')
    // })

    // dbEvents.on('insert-role-done', (rows) => {
    //     const roleId = rows[0].role_id
    //     dbEvents.emit('insert-user', {firstName,lastName,username,password,email,roleId})
    // })

    // dbEvents.on('insert-user-done', () => {
    //     dbEvents.emit('create-menu-table')
    // })

    // dbEvents.on('create-menu-table-done', () => {
    //     dbEvents.emit('insert-menus', ['Dashboard','Site','Collections','Apps','Users','Roles','Services','Settings'])
    // })

}

module.exports = init