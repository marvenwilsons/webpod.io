const random_string = (length) => {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
 return result;
}

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
  jwt_secret: 'k@zsdfi23hdshfakhdsflkahjdhflajksdfh945kjadf', 

  // when run in your local machine, set this to false in production
  app_mode: 'dev', // dev or production

  // if left empty or null values it will use the default postgres values
  postgres: {

      // default POSTGRES_PASSWORD is "postgres" if null
      POSTGRES_PASSWORD: null,

      // default POSTGRES_USER is "postgres" if null
      POSTGRES_USER: null,

      // default POSTGRES_DB is "postgres" if null
      POSTGRES_DB: 'postgres',
  },
  
  pg_admin: {
      // More on pgAdmin: https://www.pgadmin.org/docs/pgadmin4/latest/container_deployment.html
      // default PGADMIN_DEFAULT_EMAIL is "user@domain.com" if null
      PGADMIN_DEFAULT_EMAIL: null,

      // default password is password if null
      PGADMIN_DEFAULT_PASSWORD: null,

      // default PGADMIN_URL is pgadmin
      PGADMIN_URL:'mydb'
  },

  backend: {
    // server 1 for admin api dashboard use, every call on this route requires
    // authentication process like user token and username
    admin_api_route: 'aar_' + random_string(40),
    admin_server_port: 8000,

    // server 2 for public api use, every call on this route requires no
    // authentication, anyone can access this link.
    public_api_route: 'par_' +random_string(40),
    public_server_port: 9000,
  }
}