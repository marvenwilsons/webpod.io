const { query } = require('./db')

function log(msg) {
    console.log(` ℹ ${msg}`)
}

function CREATE_EXTENSION_UUID_OSSP () {
    /**
     * Add uuid extension to be used as a random id generator
     */
    return query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`)
}

function CREATE_USERS_TABLE () {
    log(' ℹ CREATING USERS TABLE')
    return query(`
        CREATE TABLE users (
            user_id uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
            email VARCHAR(500) NOT NULL, 
            user_password VARCHAR(250) NOT NULL,
            first_name VARCHAR(100) NOT NULL,
            last_name VARCHAR(100) NOT NULL,
            role_id uuid [ ]
        )`
    )
}

function GET_ALL_TABLES () {
    log('GET ALL TABLES')
    return query(`
        SELECT table_name
        FROM information_schema.tables
        WHERE table_schema='public'
        AND table_type='BASE TABLE'
    `)
}

module.exports = () => {
    GET_ALL_TABLES()
    .then(({rows}) => rows.length == 0)
    .then(isNotInitialized => isNotInitialized && CREATE_USERS_TABLE())
    .then(data => {
        console.log('hey', data)
    })
    .catch(err => log('ERROR', err))
}