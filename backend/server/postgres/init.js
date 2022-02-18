const { query } = require('./db')

async function GET_ALL_TABLES () {
    const res = await query(`SELECT * FROM information_schema.tables WHERE table_schema = 'public'`)
    return res.rows.length == 0 ? 'no tables found' : res.rows.length
}

module.exports = async (body) => {
    const {firstName, lastName, applicationName, username, password, email, databaseName, databaseUsername, tablePrefix, databasePassword} = body
    console.log(body)
    /**
     * Check if there are tables in database
     * if there are no tables it means its a fresh install and needs
     * to install the essential tables
     */
    const get_all_talbes_result = await GET_ALL_TABLES()

    /**
     * Install the uuid extension first, its needed for generating unique id for tables
     */
    let uuid_ossp_ext_res = undefined
    if(get_all_talbes_result == 'no tables found') {
        try {
            global.log('installing uuid-ossp extension')
            global.progress('25%')
            uuid_ossp_ext_res = (await query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`)).rows.length == 0 && 'success'
        } catch(err) {
            console.log('ossp_error', err)
        }
    } else {
        global.log(`Error: found unknown table in ${databaseName} database`)
    }


    /**
     * Create postgres database user
     */
    let insert_user_result = undefined
    if(uuid_ossp_ext_res == 'success') {
        try {
            global.log(`inserting database user: ${databaseUsername} ...`)
            global.progress('30%')
            insert_user_result = (await query(`CREATE USER ${databaseUsername}`)).rows.length == 0 && 'success'
        } catch(err) {
            console.log('create user error', err)
        }
    }

    /**
     * Granting all orivileges on database
     */
    let user_privilege_grant = undefined
    if(insert_user_result === 'success' ) {
        try {
            global.log(`granting database privilages to ${databaseUsername}`)
            global.progress('55%')
            user_privilege_grant = (await query(`GRANT ALL PRIVILEGES ON DATABASE ${databaseName} TO ${databaseUsername}`)).rows.length == 0 && 'success'
        } catch(err) {
            console.log('grant error', err)
        }
    }


     /**
     * Setting database user password
     */
    let set_db_password_result = undefined
    if(user_privilege_grant === 'success') {
       try {
            global.log(`setting database password for ${databaseUsername} ...`)
            global.progress('60%')
            set_db_password_result = (await query(`ALTER USER ${databaseUsername} PASSWORD '${databasePassword}'`)).rows.length == 0 && 'success'
       } catch(err) {
           console.log('set user password err', err)
       }
    }

    /**
     * Create users table, this is for webpod dashboard users,
     * database user and webpod user is different
     */
    let create_user_table_result = undefined
    if(set_db_password_result === 'success') {
        global.log('Creating users table ...')
        global.progress('70%')
        try {
            create_user_table_result = (await query(`
                CREATE TABLE ${tablePrefix}users (
                    user_id uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
                    email VARCHAR(500) NOT NULL, 
                    user_password VARCHAR(250) NOT NULL,
                    first_name VARCHAR(100) NOT NULL,
                    last_name VARCHAR(100) NOT NULL,
                    role_id uuid [ ]
                )`
            )).rows.length == 0 && 'success'
        } catch(err) {
            console.log('creating users table error ',err)
        }
    }

    /**
     * Create roles table
     */
    let create_roles_table_result = undefined
    if(create_user_table_result === 'success') {
        global.log('Creating roles table ...')
        global.progress('75%')
        
        create_roles_table_result = (await query(`
            CREATE TABLE ${tablePrefix}roles (
                role_id uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
                role_name VARCHAR(500) NOT NULL, 
                role_menu uuid [ ]
            )`
        )).rows.length == 0 && 'success'
    }

    /**
     * Add default master role
     */

    let master_role_id = undefined
    if(create_roles_table_result === 'success') {
        global.log('Inserting master role ...')
        global.progress('80%')
        try {
            master_role_id = (await query(`
                INSERT INTO roles (role_name) 
                VALUES($1) returning *
            `,['master'])).rows[0].role_id
        } catch(err) {
            console.log('insert master role error ', err)
        }
    }

    /**
     * Add menu table
     */
    let create_menu_table_result = undefined
    if(master_role_id != undefined) {
        try {
            create_menu_table_result = (await query(`
                CREATE TABLE ${tablePrefix}menu (
                    menu_id uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
                    menu_name VARCHAR(500) NOT NULL
                )`
            )).rows.length == 0 && 'success'
        } catch(err) {
            console.log('create menu table err ', err)
        }
    }

    console.log('sdfag',create_menu_table_result)


    /**
     * Add role menus to role_menu column in roles table
     */

    /**
     * Add user to users table referencing the master role as its role
     */
    // let insert_user_result = undefined
    // if(insert_master_role_result === 'success') {
    //     try {
    //         global.log('Inserting master user  ...')
    //         global.progress('85%')
    //         insert_user_result = (await query(`
    //             INSERT INTO users (email, user_password, first_name, last_name) 
    //             VALUES($1, $2, $3, $4)
    //         `,['master'])).rows.length == 0 && 'success'
    //     } catch(err) {
    //         console.log('insert user err', err)
    //     }
    // }


    

    
}