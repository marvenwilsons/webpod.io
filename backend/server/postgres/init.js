const dbEvents = require('./events')
const fs = require('fs')
const path = require('path')

function init (body, cb) {
    const {firstName, lastName, username, password, email, applicationName} = body

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
    let event_count = 0
    dbEvents.on('call', (name) => {
        event_count++

        console.log('done ==> ',name)

        global.log(name)
        global.progress(`${event_count * 5}%`)

        if(event_count == 10) {
            dbEvents.emit('insert-default-role')
            dbEvents.emit('insert-default-menus')
            dbEvents.emit('create-master-db-user', {databaseUsername: username, databasePassword: password})
            dbEvents.emit('insert-default-services')
        }

        if(event_count == 14) {
            global.progress('100%')
            global.log('finishing up ...')
            const man = {
                app_name: applicationName,
                jwt_secret: 'sample_jwt_secret_you_should_change_this',
                database_name: process.env.POSTGRES_DB,
                db_table_prefix: process.env.TABLE_PREFIX,
                use_pg_admin: true,
                pgadmin_url: null
            }
            fs.writeFileSync(path.join(__dirname,'../man.json'), JSON.stringify(man,null,4))
            if(cb) {
                cb('OK')
            }
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
        dbEvents.emit('insert-user', {firstName, lastName, username, password, email, roleId})
    })

    let queries = []
    dbEvents.on('query', (str,val) => {
        // queries.push(str.replace("\\\s\\\s", ""))

        // if(event_count == 14) {
        //     fs.writeFileSync(path.join(__dirname,'start.sql'),queries.join('\n'))
        // }
    })
}

module.exports = init