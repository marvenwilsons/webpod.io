const { query } = require('./db')
const bcryptjs = require('bcryptjs')


async function GET_ALL_TABLES () {
    const res = await query(`SELECT * FROM information_schema.tables WHERE table_schema = 'public'`)
    return res.rows.length == 0 ? 'no tables found' : res.rows.length
}

module.exports = async (body, cb) => {
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
            uuid_ossp_ext_res = (await query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`)).rows.length == 0 && 'OK'
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
    if(uuid_ossp_ext_res == 'OK') {
        try {
            global.log(`inserting database user: ${databaseUsername} ...`)
            global.progress('30%')
            insert_user_result = (await query(`CREATE USER ${databaseUsername}`)).rows.length == 0 && 'OK'
        } catch(err) {
            console.log('create user error', err)
        }
    }

    /**
     * Granting all orivileges on database
     */
    let user_privilege_grant = undefined
    if(insert_user_result === 'OK' ) {
        try {
            global.log(`granting database privilages to ${databaseUsername}`)
            global.progress('55%')
            user_privilege_grant = (await query(`GRANT ALL PRIVILEGES ON DATABASE ${databaseName} TO ${databaseUsername}`)).rows.length == 0 && 'OK'
        } catch(err) {
            console.log('grant error', err)
        }
    }


     /**
     * Setting database user password
     */
    let set_db_password_result = undefined
    if(user_privilege_grant === 'OK') {
       try {
            global.log(`setting database password for ${databaseUsername} ...`)
            global.progress('60%')
            set_db_password_result = (await query(`ALTER USER ${databaseUsername} PASSWORD '${databasePassword}'`)).rows.length == 0 && 'OK'
       } catch(err) {
           console.log('set user password err', err)
       }
    }

    /**
     * Create users table, this is for webpod dashboard users,
     * database user and webpod user is different
     */
    let create_user_table_result = undefined
    if(set_db_password_result === 'OK') {
        global.log('Creating users table ...')
        global.progress('70%')
        try {
            create_user_table_result = (await query(`
                CREATE TABLE ${tablePrefix}users (
                    user_id uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
                    username VARCHAR(100) NOT NULL, 
                    email VARCHAR(100) NOT NULL, 
                    user_password VARCHAR(100) NOT NULL,
                    first_name VARCHAR(100) NOT NULL,
                    last_name VARCHAR(100) NOT NULL,
                    role_id uuid [ ]
                )`
            )).rows.length == 0 && 'OK'
        } catch(err) {
            console.log('creating users table error ',err)
        }
    }

    /**
     * Create roles table
     */
    let create_roles_table_result = undefined
    if(create_user_table_result === 'OK') {
        global.log('Creating roles table ...')
        global.progress('75%')
        
        create_roles_table_result = (await query(`
            CREATE TABLE ${tablePrefix}roles (
                role_id uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
                role_name VARCHAR(500) NOT NULL, 
                role_menu uuid [ ]
            )`
        )).rows.length == 0 && 'OK'
    }

    /**
     * Add default master role
     */
    let master_role_id = undefined
    if(create_roles_table_result === 'OK') {
        global.log('Inserting master role ...')
        global.progress('80%')
        try {
            master_role_id = (await query(`
                INSERT INTO ${tablePrefix}roles (role_name) 
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
        global.log('Creating menu table ...')
        global.progress('82%')
        try {
            create_menu_table_result = (await query(`
                CREATE TABLE ${tablePrefix}menu (
                    menu_id uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
                    menu_name VARCHAR(500) NOT NULL
                )`
            )).rows.length == 0 && 'OK'
        } catch(err) {
            console.log('create menu table err ', err)
        }
    }

    /**
     * Add default menus to menu table
     */
    let add_default_menu_result = undefined
    let default_menu_uids = []
    if(create_menu_table_result === 'OK') {
        global.log('Inserting default menus ...')
        try {
            const default_menus = ['Dashboard','Site','Collections','Apps','Users','Roles','Services','Settings']
            const qs = []

            default_menus.map(menu_name => qs.push(query(`
                INSERT INTO ${tablePrefix}menu (menu_name) 
                VALUES($1) returning *
            `,[menu_name])))
            
            add_default_menu_result = await Promise.all(qs).then(data => {
                default_menu_uids = data.map(r => r.rows[0].menu_id)
                return 'OK'
            })
        } catch(err) {
            console.log('insert default menus err ', err)
        }
    }


    /**
     * Update master role add menus
     */
    let update_role_menu_result = undefined
    if(add_default_menu_result === 'OK') {
        global.log('Updating role menus ...')

        update_role_menu_result = (await query(`
            UPDATE ${tablePrefix}roles 
            SET role_menu = '{${default_menu_uids.join(',')}}'
            WHERE role_id = '${master_role_id}'
        `)).rows.length == 0 && 'OK'
    }
    
    /**
     * Create a master dashboard admin user
     */
    let create_admin_user_result = undefined
    if(update_role_menu_result === 'OK') {
        try {
            const saltRound = 10
            const salt =  bcryptjs.genSaltSync(saltRound)
            const bcryptPassword =  bcryptjs.hashSync(password, salt)
            create_admin_user_result = (await query(`
                INSERT INTO ${tablePrefix}users (email,username,user_password,first_name,last_name,role_id)
                VALUES ($1, $2, $3, $4, $5, $6)
            `,[email, username, bcryptPassword, firstName, lastName, `{${master_role_id}}`])).rows.length == 0 && 'OK'
        } catch(err) {
            console.log('insert user err', err)
        }
    }

    /**
     * Create apps table
     */
    let create_apps_table_result = undefined
    if(create_admin_user_result == 'OK') {
        try {
            global.log('Creating apps table ...')

            create_apps_table_result = await Promise.all([
                query(`
                    CREATE TABLE ${tablePrefix}apps (
                        app_id uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
                        app_name VARCHAR(100) NOT NULL
                    )
                `),
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
            ]).then(data => 'OK')
        } catch(err) {
            console.log('create_apps_table_err', err)
        }
    }


    /**
     * Create service table
     */
    let create_services_table_result = undefined
    if(create_apps_table_result == 'OK') {
        global.log('Creating services table ...')
        global.progress('90%')

        create_services_table_result = await Promise.all([
            query(`
                CREATE TABLE ${tablePrefix}services (
                    service_id uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
                    service_name VARCHAR(100) NOT NULL
                )
            `),
            query(`
                CREATE TABLE ${tablePrefix}service_versions (
                    version_id uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
                    service_id uuid NOT NULL REFERENCES ${tablePrefix}services(service_id),
                    version_name VARCHAR(100) NOT NULL,
                    version_data jsonb,
                    instancer jsonb
                )
            `)
        ]).then(data => true)
    }

    if(create_services_table_result) {
        global.log('done')
        global.progress('100%')
        
        if(cb) {
            cb('OK')
        }
    }
}