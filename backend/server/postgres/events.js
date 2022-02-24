const events = require('events')
const dbEvents = new events.EventEmitter()
const { query } = require('./db')
const tablePrefix = process.env.TABLE_PREFIX

dbEvents.on('get-all-tables', async function (cb = () => {}) {
    return await query(`SELECT * FROM information_schema.tables WHERE table_schema = 'public'`)
    .then(d => {
        dbEvents.emit('get-all-tables-done', d.rows)
        dbEvents.emit('call', 'get-all-tables')
        cb(d.rows)
    })
})

dbEvents.on('install-ossp-extension', function (cb = () => {}) {
    query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`)
    .then(d => 
        {
            dbEvents.emit('install-ossp-extension-done',d)
            dbEvents.emit('call', 'install-ossp-extension')
        }
    )
})

dbEvents.on('create-users-table', function (cb = () => {}) {
    query(`
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
    ).then(d => {
        cb(d.rows)
        dbEvents.emit('create-users-table-done', d.rows)
        dbEvents.emit('call', 'create-users-table')
    }).catch(err => {
        throw err
    })
})

dbEvents.on('insert-user', function (user, cb = () => {}) {
    const {email, username, password, firstName, lastName, roleId} = user
    bcryptjs.genSalt(10, (err, salt) => {
        bcryptjs.hash(password, salt, (err, hashedPassword) => {
            if(err) {
                throw err
            }

            query(`
                    INSERT INTO ${tablePrefix}users (email,username,user_password,first_name,last_name,role_id)
                    VALUES ($1, $2, $3, $4, $5, $6)
                `,[email, username, hashedPassword, firstName, lastName, roleId]
            )
            .then(d => {
                dbEvents.emit('insert-user-done', d.rows)
                dbEvents.emit('call', 'insert-user')
                cb(d.rows)
            })
            .catch(err => {
                throw err
            })
        })
            
    });

    
})

dbEvents.on('create-services-table', function (cb = () => {}) {
    query(`
        CREATE TABLE ${tablePrefix}services (
            service_id uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
            service_name VARCHAR(100) NOT NULL
        )
    `)
    .then(d => {
        cb(d.rows)
        dbEvents.emit('create-service-table-done', d.rows)
        dbEvents.emit('call', 'create-service-table')
    })
    .catch(err => {
        throw err
    })
})

dbEvents.on('create-service-version-table', function (cb = () => {}) {
    query(`
        CREATE TABLE ${tablePrefix}service_versions (
            version_id uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
            service_id uuid NOT NULL REFERENCES ${tablePrefix}services(service_id),
            version_name VARCHAR(100) NOT NULL,
            version_data jsonb,
            instancer jsonb
        )
    `)
    .then(d => {
        cb(d.rows)
        dbEvents.emit('create-service-version-table-done', d.rows)
        dbEvents.emit('call', 'create-service-version-table')
    })
    .catch(err => {
        throw err
    })
})

dbEvents.on('create-menu-table', function (cb = () => {}) {
    query(`
        CREATE TABLE ${tablePrefix}menu (
            menu_id uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
            menu_name VARCHAR(500) NOT NULL,
            service_id uuid REFERENCES ${tablePrefix}services(service_id),
            primary_version uuid REFERENCES ${tablePrefix}service_versions(version_id),
            versions uuid [ ]
        )`
    )
    .then(d => {
        dbEvents.emit('create-menu-table-done', d.rows)
        dbEvents.emit('call', 'create-menu-table')
        cb(d.rows)
    })
    .catch(err => {
        throw err
    })
})

dbEvents.on('insert-menus', function (default_menus,cb = () => {}) {
    const qs = []

    default_menus.map(menu_name => qs.push(query(`
        INSERT INTO ${tablePrefix}menu (menu_name) 
        VALUES($1) returning *
    `,[menu_name])))
    
    Promise.all(qs)
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

dbEvents.on('create-roles-table', function (cb = () => {}) {
    query(`
        CREATE TABLE ${tablePrefix}roles (
            role_id uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
            role_name VARCHAR(500) NOT NULL, 
            role_menu uuid [ ]
        )`
    )
    .then(d => {
        dbEvents.emit('create-roles-table-done', d.rows)
        cb(d.rows)
        dbEvents.emit('call', 'create-roles-table')
    })
    .catch(err => {
        throw err
    })
})

dbEvents.on('insert-role', function (roleName, cb = () => {}) {
    if(typeof roleName != 'string' ) {
        throw Error `roleName should be a string`
    }

    query(`
        INSERT INTO ${tablePrefix}roles (role_name) 
        VALUES($1) returning *
    `,[roleName])
    .then(d => {
        cb(d.rows)
        dbEvents.emit('insert-role-done', d.rows)
        dbEvents.emit('call', 'insert-role')
    })
    .catch(err => {
        throw err
    })
})

dbEvents.on('create-apps-table', function (cb = () => {}) {
    query(`
        CREATE TABLE ${tablePrefix}apps (
            app_id uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
            app_name VARCHAR(100) NOT NULL
        )
    `)
    .then(d => {
        cb(d.rows)
        dbEvents.emit('create-apps-table-done', d.rows)
        dbEvents.emit('call','create-apps-table')
    })
    .catch(err => {
        throw err
    })
})

dbEvents.on('create-app-instances-table', function (cb = () => {}) {
    query(`
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
    `)
    .then(d => {
        cb(d.rows)
        dbEvents.emit('create-app-instances-table-done',d.rows)
        dbEvents.emit('call','create-app-instances-table')
    })
    .catch(err => {
        throw err
    })
})

dbEvents.on('create-collections-table', function (cb = () => {}) {
    query(`
        CREATE TABLE ${tablePrefix}collections (
            collection_id uuid DEFAULT uuid_generate_v4(),
            collection_name VARCHAR(255) NOT NULL,
            collection_content uuid [ ],
            collection_schema jsonb NOT NULL,
            config jsonb NOT NULL DEFAULT '{ "loginOnAccess": false, "collectionPassword": "", "collectionUsername": "", "allowedTitlesToAccess": ["master"] }'::jsonb,
            created_on date NOT NULL DEFAULT CURRENT_DATE,
            PRIMARY KEY (collection_id)
        )
    `).then(d => {
        cb(d.rows)
        dbEvents.emit('create-collections-table-done', d.rows)
        dbEvents.emit('call','create-collections-table')
    })
})

dbEvents.on('create-collection-instance-table', function (cb = () => {}) {
    query( `
        CREATE TABLE ${tablePrefix}collection_instance (
            instance_id uuid DEFAULT uuid_generate_v4(),
            instance_of uuid REFERENCES ${tablePrefix}collections(collection_id),
            instance_body jsonb NOT NULL,
            is_trash BOOLEAN DEFAULT FALSE,
            PRIMARY KEY (instance_id)
        )
    `).then(d => {
        cb(d.rows)
        dbEvents.emit('create-collection-instance-table-done',d.rows)
        dbEvents.emit('call','create-collection-instance-table')
    })
})


module.exports = dbEvents