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

    /**
     * handle client logs and que to insert defaults
     */
    let table_count = 0
    dbEvents.on('call', (name) => {
        table_count++

        console.log('done ==> ',name)

        global.log(name)
        global.progress(`${table_count * 5}%`)

        if(table_count == 10) {
            dbEvents.emit('insert-default-role')
            dbEvents.emit('insert-default-menus')
            
            dbEvents.emit('insert-default-services')
        }
    })

    dbEvents.on('insert-default-menus' , () => {
        const default_menus = ['Dashboard','Site','Collections','Apps','Users','Roles','Services','Settings']
        dbEvents.emit('insert-menus', default_menus)
    })

    dbEvents.on('insert-default-role', () => {
        dbEvents.emit('insert-role', 'master', (rows) => {
            dbEvents.emit('insert-default-user',rows[0].role_id)
        })
    })

    dbEvents.on('insert-default-user', (roleId) => {
        dbEvents.emit('insert-user', {firstName, lastName, username, password, email, roleId}, (rows) => {
            console.log('rows', rows)
        })
    })

    // dbEvents.on('insert-default-user', )

}

module.exports = init