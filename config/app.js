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
    rest_api_route: 'iasdhflasihsdfpq',
    // node js server port
    port: '8000'
  }
}