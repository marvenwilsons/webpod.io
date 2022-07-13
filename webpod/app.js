const random_string = (length) => {
  var result           = '';
  var characters       = 'abcdefghijklmnopqrstuvwxyz';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
 return result;
}

const app = require('./app.json')

module.exports = {
  // default 
  app_name: 'webpod.io', 
  
  // default to /admin but for production it is recomended to change this to unique value
  admin_route: 'wpadmin',
  
   // default http://localhost:8443, example: https://mydomain.com
  app_url: 'https://localhost:8443',
  
  // default false, if true build will include pgAdmin config
  use_pg_admin: true,
  
  // secret should be change to unique value
  jwt_secret: 'sample_jwt_secret_you_should_change_this', 

  // when run in your local machine, set this to false in production
  app_mode: 'dev', // dev or production

  postgres: {

      // auto generated it is recommented not to change this part
      POSTGRES_DB: app.database_name || `${random_string(4)}_webpod`,

      // table prefix it is recommented not to change this part
      TABLE_PREFIX: app.db_table_prefix || `${random_string(4)}_`
  },
  
  pg_admin: {
      // More on pgAdmin: https://www.pgadmin.org/docs/pgadmin4/latest/container_deployment.html
      // default PGADMIN_DEFAULT_EMAIL is "user@domain.com" if null
      PGADMIN_DEFAULT_EMAIL: null,

      // default password is password if null
      PGADMIN_DEFAULT_PASSWORD: null,

      // default PGADMIN_URL is pgadmin
      PGADMIN_URL: app.pgadmin_url || 'pgadmin'

  },

  backend: {
    // server 1 for admin api dashboard use, every call on this route requires
    // authentication process like user token and username
    admin_api_route: 'aar_' + random_string(5),
    admin_server_port: 8000,

    // server 2 for public api use, every call on this route requires no
    // authentication, anyone can access this link.
    public_api_route: 'par_' +random_string(5),
    public_server_port: 9000,
  }
}