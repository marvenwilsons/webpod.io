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

        // console.log(`layer  ${event_count} - `,name)

        global.log(name)
        global.progress(`${event_count * 5}%`)

        if(event_count == 10) {
            dbEvents.emit('insert-default-role')
            dbEvents.emit('insert-default-menus')
            dbEvents.emit('create-master-db-user', {databaseUsername: username, databasePassword: password})
            dbEvents.emit('insert-default-services')
            dbEvents.emit('install-default-apps')
        }

        if(event_count == 23) {
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

    dbEvents.on('insert-default-menus' , function() {
        const default_menus = ['Dashboard','Site','Collections','Apps','Users','Roles','Services','Settings']
        dbEvents.emit('insert-menus', default_menus)
    })

    dbEvents.on('insert-default-role', function() {
        dbEvents.emit('insert-role', 'master', (rows) => {
            dbEvents.emit('insert-default-user',rows[0].role_id)
        })
    })

    dbEvents.on('insert-default-user', (roleId) => {
        dbEvents.emit('insert-user', {firstName, lastName, username, password, email, roleId}, (rows) => {
            const user_id = rows[0].user_id
            dbEvents.emit('install-default-apps', user_id)
            dbEvents.emit('install-default-services',user_id)
        })
    })

    dbEvents.on('install-default-apps', function(user_id) {
        if(user_id) {
            dbEvents.emit('install-app', {
                app_name: 'unitile', 
                installed_by: user_id,
                about_info: 'unitile version 0.1 by webpod.io'
            })
            dbEvents.emit('install-app', {
                app_name: 'form-builder', 
                installed_by: user_id, 
                about_info: 'form-builder version 0.1 by webpod.io'
            })
            dbEvents.emit('install-app', {
                app_name: 'doc', 
                installed_by: user_id, 
                about_info: 'doc version 0.1 by webpod.io'
            })
            dbEvents.emit('install-app', {
                app_name: 'code-editor', 
                installed_by: user_id, 
                about_info: 'code-editor version 0.1 by webpod.io'
            })
        }
    })

    dbEvents.on('install-default-services', (user_id) => {
        dbEvents.emit('insert-service', {
            service_name: 'master',
            created_by: user_id,
            about_info: null
        }, function (rows) {
            const service_id = rows[0].service_id
            dbEvents.emit('install-default-service-versions',service_id)
        })
    })

    dbEvents.on('install-default-service-versions', function (service_id) {

        dbEvents.emit('insert-service-version',{
            version_name: 'services',
            service_name: 'master',
            service_id,
            instancer: {},
            version_data: null
        })
        dbEvents.emit('insert-service-version',{
            version_name: 'dashboard',
            service_name: 'master',
            service_id,
            instancer: {
                
            },
            version_data: {

            }
        })
        dbEvents.emit('insert-service-version',{
            version_name: 'roles',
            service_name: 'master',
            service_id,
            instancer: {
                
            },
            version_data: {

            }
        })
        dbEvents.emit('insert-service-version',{
            version_name: 'users',
            service_name: 'master',
            service_id,
            instancer: {
                
            },
            version_data: {

            }
        })

    })


}

module.exports = init