const events = require('events')
const dbEvents = new events.EventEmitter()
const { query } = require('./db')
const tablePrefix = process.env.TABLE_PREFIX
const bcryptjs = require('bcryptjs')
const util = require('../utils/util')
const df = () => {}

// general
dbEvents.on('get-all-tables', async function (cb = df) {
    return await query(`SELECT * FROM information_schema.tables WHERE table_schema = 'public'`)
    .then(d => {
        dbEvents.emit('get-all-tables-done', d.rows)
        dbEvents.emit('call', 'get-all-tables')
        cb(d.rows)
    })
})

dbEvents.on('install-ossp-extension', function (cb = df) {
    query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`)
    .then(d => 
        {
            dbEvents.emit('install-ossp-extension-done',d)
            dbEvents.emit('call', 'install-ossp-extension')
        }
    )
})

dbEvents.on('create-master-db-user', function (app = {}, cb = df) {
    const { databaseUsername, databasePassword } = app
    query(`CREATE USER ${databaseUsername}`)
    .then(() => {
        dbEvents.emit('query',`CREATE USER ${databaseUsername}`)
        query(`GRANT ALL PRIVILEGES ON DATABASE ${process.env.POSTGRES_DB} TO ${databaseUsername}`)
        .then(() => {
            dbEvents.emit('query', `GRANT ALL PRIVILEGES ON DATABASE ${process.env.POSTGRES_DB} TO ${databaseUsername}`)
            query(`ALTER USER ${databaseUsername} PASSWORD '${databasePassword}'`)
            .then(() => {
                cb()
                dbEvents.emit('create-master-db-user-done')
                dbEvents.emit('call', 'create-master-db-user')
                dbEvents.emit('query',`ALTER USER ${databaseUsername} PASSWORD '${databasePassword}'`)
            })
        })
    })
})

// users
dbEvents.on('create-users-table', function (cb = df) {
    const queryString = `
    CREATE TABLE ${tablePrefix}users (
        user_id uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
        username VARCHAR(100) NOT NULL, 
        email VARCHAR(100) NOT NULL, 
        user_password VARCHAR(100) NOT NULL,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        role_id uuid,
        avatar VARCHAR(500)
    )`

    query(queryString).then(d => {
        cb(d.rows)
        dbEvents.emit('create-users-table-done', d.rows)
        dbEvents.emit('call', 'create-users-table')
        dbEvents.emit('query', queryString)
    }).catch(err => {
        throw err
    })
})

dbEvents.on('insert-user', function (user, cb = df) {
    const {email, username, password, firstName, lastName, roleId} = user
    bcryptjs.genSalt(10, (err, salt) => {
        bcryptjs.hash(password, salt, (err, hashedPassword) => {
            if(err) {
                throw err
            }

            const queryString = `
                INSERT INTO ${tablePrefix}users (email,username,user_password,first_name,last_name,role_id)
                VALUES ($1, $2, $3, $4, $5, $6)
                returning *
            `

            const queryValue = [email, username, hashedPassword, firstName, lastName, roleId]

            query(queryString,queryValue)
            .then(d => {
                dbEvents.emit('insert-user-done', d.rows)
                dbEvents.emit('call', 'insert-user')
                dbEvents.emit('query', queryString, queryValue)
                cb(d.rows)
            })
            .catch(err => {
                throw err
            })
        })
            
    });

    
})

dbEvents.on('list-all-users', function (cb = df) {

})

dbEvents.on('get-user', function (user_name,cb = df) {

})

dbEvents.on('alter-user', function(payload,cb = df) {

})

dbEvents.on('remove-user', function(user_id,cb = df) {
    
})

// services
dbEvents.on('create-services-table', function (cb = df) {
    const queryString = `
        CREATE TABLE ${tablePrefix}services (
            service_id uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
            service_name VARCHAR(100) NOT NULL
        )
    `
    query(queryString)
    .then(d => {
        cb(d.rows)
        dbEvents.emit('create-service-table-done', d.rows)
        dbEvents.emit('call', 'create-service-table')
        dbEvents.emit('query',queryString)
    })
    .catch(err => {
        throw err
    })
})

dbEvents.on('list-all-services', function (cb = df) {

})

dbEvents.on('get-service', function(service_name,cb = df) {

})

dbEvents.on('alter-service', function(cb = df) {

})

dbEvents.on('remove-service', function(cb = df) {

})

// service-version
dbEvents.on('create-service-version-table', function (cb = df) {
    const queryString = `
        CREATE TABLE ${tablePrefix}service_versions (
            version_id uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
            service_id uuid NOT NULL REFERENCES ${tablePrefix}services(service_id),
            version_name VARCHAR(100) NOT NULL,
            version_data jsonb,
            instancer jsonb
        )
    `
    query(queryString)
    .then(d => {
        cb(d.rows)
        dbEvents.emit('create-service-version-table-done', d.rows)
        dbEvents.emit('call', 'create-service-version-table')
        dbEvents.emit('query', queryString)
    })
    .catch(err => {
        throw err
    })
})

dbEvents.on('list-all-service-vesrions', function (service_name, cb = df) {

})

dbEvents.on('get-service-version', function () {

})

dbEvents.on('remove-service-version', function () {

})

dbEvents.on('alter-service-version', function () {
    
})


// menu
dbEvents.on('create-menu-table', function (cb = df) {
    const queryString = `
    CREATE TABLE ${tablePrefix}menu (
        menu_id uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
        menu_name VARCHAR(500) NOT NULL,
        service_id uuid REFERENCES ${tablePrefix}services(service_id),
        primary_version uuid REFERENCES ${tablePrefix}service_versions(version_id),
        versions uuid [ ]
    )`
    query(queryString)
    .then(d => {
        dbEvents.emit('create-menu-table-done', d.rows)
        dbEvents.emit('call', 'create-menu-table')
        dbEvents.emit('query', queryString)
        cb(d.rows)
    })
    .catch(err => {
        throw err
    })
})

dbEvents.on('insert-menus', function (default_menus,cb = df) {
    !Array.isArray(default_menus) && (new Error `Invalid default menu type, it should be an array of strings`)

    const qs = []
    default_menus.map(menu_name => {
        const queryString = `
            INSERT INTO ${tablePrefix}menu (menu_name) 
            VALUES($1) returning *
        `
        const queryValue = [menu_name]
        qs.push(query(queryString,queryValue))
        dbEvents.emit('query',queryString,queryValue)
    })
    
    Promise
        .all(qs)
        .then(data => {
            default_menu_uids = data.map(r => r.rows[0])

            cb(default_menu_uids)
            dbEvents.emit('insert-default-menus-done',default_menu_uids)
            dbEvents.emit('call','insert-menus')
        })
        .catch(err => {
            throw err
        })
})

dbEvents.on('insert-menu', function (menu_name, cb = df) {
    !typeof menu_name === 'string' && (new Error `Invalude menu name type`)
    const queryString = `
        INSERT INTO ${tablePrefix}menu (menu_name) 
        VALUES($1) returning *
    `
    const queryValue = [menu_name]
    query(queryString,queryValue)
    .then(d => {
        cb(d.rows)
        dbEvents.emit('insert-default-menu-done',menu_name)
        dbEvents.emit('call','insert-menu')
        dbEvents.emit('query',queryString,queryValue)
    })
})

dbEvents.on('list-all-menus', function (db = df) {

})

dbEvents.on('alter-menu', function (payload, cb = df) {

})

dbEvents.on('remove-menu', function (payload, cb = df) {

})


// roles
dbEvents.on('create-roles-table', function (cb = df) {
    const queryString = `
    CREATE TABLE ${tablePrefix}roles (
        role_id uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
        role_name VARCHAR(500) NOT NULL, 
        role_menu uuid [ ]
    )`

    query(queryString)
    .then(d => {
        dbEvents.emit('create-roles-table-done', d.rows)
        cb(d.rows)
        dbEvents.emit('call', 'create-roles-table')
        dbEvents.emit('query', queryString)
    })
    .catch(err => {
        throw err
    })
})

dbEvents.on('insert-role', function (roleName, cb = df) {
    if(typeof roleName != 'string' ) {
        throw Error `roleName should be a string`
    }

    const queryString = `
        INSERT INTO ${tablePrefix}roles (role_name) 
        VALUES($1) returning *
    `
    const queryValue = [roleName]

    query(queryString,queryValue)
    .then(d => {
        cb(d.rows)
        dbEvents.emit('insert-role-done', d.rows)
        dbEvents.emit('call', 'insert-role')
        dbEvents.emit('query', queryString, queryValue)
    })
    .catch(err => {
        throw err
    })
})

dbEvents.on('remove-role', function (cb = df) {

})

dbEvents.on('alter-role', function (cb = df) {

})

dbEvents.on('list-all-roles', function (cb =df) {

})


// apps
dbEvents.on('create-apps-table', function (cb = df) {

    const queryString = `
        CREATE TABLE ${tablePrefix}apps (
            app_id uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
            app_name VARCHAR(100) NOT NULL
        )
    `

    query(queryString)
    .then(d => {
        cb(d.rows)
        dbEvents.emit('create-apps-table-done', d.rows)
        dbEvents.emit('call','create-apps-table')
        dbEvents.emit('query', queryString)
    })
    .catch(err => {
        throw err
    })
})

dbEvents.on('install-app', function (payload, cb = df) {

})

dbEvents.on('alter-app', function (payload, cb = df) {
    // rename
    // add new log
    // assign user to app
})

dbEvents.on('remove-app', function (payload, cb = df) {

})

dbEvents.on('create-app-instances-table', function (cb = df) {
    const queryString = `
        CREATE TABLE ${tablePrefix}app_instances (
            instance_id uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
            instance_from uuid NOT NULL,
            instance_title VARCHAR(250) NOT NULL,
            allowed_users uuid [],
            history VARCHAR(500) [],
            app_data jsonb,
            last_modified date,
            modified_by uuid REFERENCES ${tablePrefix}users(user_id)
        )
    `
    query(queryString)
    .then(d => {
        cb(d.rows)
        dbEvents.emit('create-app-instances-table-done',d.rows)
        dbEvents.emit('call','create-app-instances-table')
        dbEvents.emit('query', queryString)
    })
    .catch(err => {
        throw err
    })
})

dbEvents.on('insert-app-instance', function (cb = df) {

})

dbEvents.on('remove-app-instance', function (cb = df) {
    
})

dbEvents.on('alter-app-instance', function (cb = df) {
    
})


// collections
dbEvents.on('create-collections-table', function (cb = df) {
    const queryString =`
        CREATE TABLE ${tablePrefix}collections (
            collection_id uuid DEFAULT uuid_generate_v4(),
            collection_name VARCHAR(255) NOT NULL,
            collection_content uuid [ ],
            collection_schema jsonb NOT NULL,
            config jsonb NOT NULL DEFAULT '{ "loginOnAccess": false, "collectionPassword": "", "collectionUsername": "", "allowedTitlesToAccess": ["master"] }'::jsonb,
            created_on date NOT NULL DEFAULT CURRENT_DATE,
            PRIMARY KEY (collection_id)
        )
    `
    query(queryString).then(d => {
        cb(d.rows)
        dbEvents.emit('create-collections-table-done', d.rows)
        dbEvents.emit('call','create-collections-table')
        dbEvents.emit('query', queryString)
    })
})

dbEvents.on('register-new-collection', function (payload, cb = df) {

})

dbEvents.on('alter-collection', function() {

})

dbEvents.on('drop-collection', function () {
    
})

dbEvents.on('list-all-collections', function () {

})

dbEvents.on('create-collection-instance-table', function (cb = df) {
    const queryString =  `
        CREATE TABLE ${tablePrefix}collection_instance (
            instance_id uuid DEFAULT uuid_generate_v4(),
            instance_of uuid REFERENCES ${tablePrefix}collections(collection_id),
            instance_body jsonb NOT NULL,
            is_trash BOOLEAN DEFAULT FALSE,
            PRIMARY KEY (instance_id)
        )
    `
    query(queryString).then(d => {
        cb(d.rows)
        dbEvents.emit('create-collection-instance-table-done',d.rows)
        dbEvents.emit('call','create-collection-instance-table')
        dbEvents.emit('query', queryString)
    })
})

dbEvents.on('insert-collection-instance', function (payload, cb = df) {

})

dbEvents.on('alter-collection-instance', function() {

})

dbEvents.on('drop-collection-instance', function () {

})

module.exports = dbEvents