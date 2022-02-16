const { query } = require('./db')

function GET_ALL_TABLES () {
    return query(`
        SELECT table_name
        FROM information_schema.tables
        WHERE table_schema='public'
        AND table_type='BASE TABLE'
    `)
}

module.exports = async (body) => {
    const {firstName, lastName, applicationName, username, password, email, databaseName, databaseUsername, tablePrefix, databasePassword} = body
    console.log(body)
    /**
     * Check if there are tables in database
     * if there are no tables it means its a fresh install and needs
     * to install the essential tables
     */
    GET_ALL_TABLES()
    .then(({rows}) => rows.length == 0)

    /**
     * Install the uuid extension first, its needed for generating unique id for tables
     */
    .then(isNotInitialized => {
        isNotInitialized &&  
        global.log('installing uuid-ossp extension')
        global.progress('20%')
        return query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`)
    })

    /**
     * Create user's table
     */
    .then(data => {
        global.log('Creating users table ...')
        global.progress('30%')
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
    })

    /**
     * Create db user
     */
    .then(data => {
        global.log(`inserting database user: ${databaseUsername} ...`)
        global.progress('50%')
        return query(`CREATE USER ${databaseUsername}`)
    })

    /**
     * Setting user password
     */
    .then(data => {
        global.log(`setting database password for ${databaseUsername} ...`)
        global.progress('55%')
        return query(`ALTER USER ${databaseUsername} PASSWORD '${databasePassword}'`)
    })

    /**
     * handle error
     */
    .catch(err => log('ERROR', err))
}