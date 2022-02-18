const app_config = require('../app.js')
const adminPort = 5000
const publicPort = 3000
const mode = 'dev' // dev or production

// postgres env
function makeid(length) {
  var result           = [];
  var characters       = 'abcdefghijklmnopqrstuvwxyz';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result.push(characters.charAt(Math.floor(Math.random() * 
charactersLength)));
  }
  return result.join('');
}
const postgresEnv = [
  `POSTGRES_PASSWORD=postgres`,
  `POSTGRES_USER=postgres`,
  `POSTGRES_DB=${makeid(7)}_webpod`,
  `PGHOST=postgres`,
  `TABLE_PREFIX=${makeid(7)}_`
]
/**************************************************************
 *                  Front End Admin Container                  *
 **************************************************************/
const frontend_admin_container = {
  build: {
    context: '../frontend-admin',
    target: mode
  },
  container_name: 'Admin',
  restart: 'unless-stopped',
  working_dir: '/usr/src/admin',
  environment: [
    "APP_HOST=frontend-admin",
    `APP_PORT=${adminPort}`,
    `ADMIN_ROUTE=${app_config.admin_route}`,
    `API_URL=${app_config.backend.admin_api_route}`,
    `API_BASE=backend:${app_config.backend.admin_server_port}`,
  ],
  // ports: [
  //   `${adminPort}:${adminPort}`
  // ],
  volumes: [
    "../frontend-admin/assets:/usr/src/admin/assets",
    "../frontend-admin/components:/usr/src/admin/components",
    "../frontend-admin/layouts:/usr/src/admin/layouts",
    "../frontend-admin/middleware:/usr/src/admin/middleware",
    "../frontend-admin/pages:/usr/src/admin/pages",
    "../frontend-admin/plugins:/usr/src/admin/plugins",
    "../frontend-admin/server:/usr/src/admin/server",
    "../frontend-admin/store:/usr/src/admin/store",
    "../frontend-admin/static:/usr/src/admin/static",
    "../frontend-admin/m.js:/usr/src/admin/m.js",
    "../frontend-admin/nuxt.config.js:/usr/src/admin/nuxt.config.js"
  ]
}
/**************************************************************
 *                  Front End Public Container                 *
 **************************************************************/
const frontend_public_container = {
  build: {
    context: '../frontend-public',
    target: mode
  },
  container_name: 'Public',
  restart: 'unless-stopped',
  working_dir: '/usr/src/public',
  environment: [
    'APP_HOST=frontend-public',
    `APP_PORT=${publicPort}`,
    'APP_NAME=sample.com',
    `API_URL=${app_config.backend.public_api_route}`
  ],
  // ports: [
  //   `${publicPort}:${publicPort}`
  // ],

  volumes: [
    "../frontend-public/assets:/usr/src/public/assets",
    "../frontend-public/layouts:/usr/src/public/layouts",
    "../frontend-public/middleware:/usr/src/public/middleware",
    "../frontend-public/pages:/usr/src/public/pages",
    "../frontend-public/plugins:/usr/src/public/plugins",
    "../frontend-public/server:/usr/src/public/server",
    "../frontend-public/components:/usr/src/public/components",
    "../frontend-public/store:/usr/src/public/store",
    "../frontend-public/static:/usr/src/public/static",
    "../frontend-public/m.js:/usr/src/public/m.js",
    "../frontend-public/nuxt.config.js:/usr/src/public/nuxt.config.js"
  ]
}
/**************************************************************
 *                   Back-End Container                       *
 **************************************************************/
 const backend_container = {
  build: {
    context: '../backend',
    args: {
      BACKEND_PORT: app_config.backend.admin_server_port,
    }
  },
  container_name: "BackEnd",
  restart: "unless-stopped",
  working_dir: "/usr/src/backend",
  environment: [
    "HOST=backend",
    "ADMIN_SERVER_PORT=8000",
    "PUBLIC_SERVER_PORT=9000",
    `API_URL=${app_config.backend.admin_api_route}`,
    `JWT_SECRET=${app_config.jwt_secret}`,
    ...postgresEnv
  ],
  volumes: [
    "../backend:/usr/src/backend",
    // "../backend/public:/usr/src/backend/server/public",
    // "../backend/node_modules:/usr/src/backend/node_modules"
  ],
  // ports: [
  //   `${app_config.backend.admin_server_port}:${app_config.backend.admin_server_port}`,
  // ],
  depends_on: [
    'postgres',
    'frontend-admin',
    'frontend-public',
  ],

}
/**************************************************************
 *                      Nginx Container                       *
 **************************************************************/
const nginx_container = {
  image: 'nginx:stable-alpine-perl',
  depends_on: [
    'backend',
    'frontend-admin',
    'frontend-public',
  ],
  container_name: 'nginx',
  volumes: [
    "./nginx:/etc/nginx/templates",
    "./nginx/certs:/etc/nginx/certs"
  ],
  ports: [
    "8443:8443",
    "80:80"
  ],
  environment: [
    "NGINX_HTTPS_PORT=8443",
    "NGINX_HOST=localhost",
    "NGINX_PORT=80",
    // PUBLIC
    { PUBLIC_FRONTEND_SERVER_UPSTREAM:  'frontend-public:' + publicPort },
    { PUBLIC_BACKEND_UPSTREAM:          'backend:' + app_config.backend.public_server_port },
    { PUBLIC_API_LINK:                 app_config.backend.public_api_route },
    // ADMIN
    { ADMIN_FRONTEND_SERVER_UPSTREAM:   'frontend-admin:' + adminPort },
    { ADMIN_DASHBOARD_PUBLIC_LINK:      app_config.admin_route },
    { ADMIN_BACKEND_SERVER:             'backend:' + app_config.backend.admin_server_port },
    { ADMIN_EXPRESS_ROUTE:                    app_config.backend.admin_api_route},
    // PG ADMIN
    { PGADMIN_URL:                      app_config.pg_admin.PGADMIN_URL }
  ],
}
nginx_container.environment.map((e,i) => {
  if(typeof e == 'object') {
    nginx_container.environment[i] = `${[Object.keys(e)[0]]}=${e[Object.keys(e)[0]]}`
  }
})
/**************************************************************
 *                  postgres Container                       *
 **************************************************************/
const postgres_container = {
  container_name: 'postgres',
  image: 'postgres',
  restart: 'always',
  ports: ['5432'],
  environment: [...postgresEnv],
  volumes: [
    '../postgres:/var/lib/postgresql/data'
  ]
}

/**************************************************************
 *                  pgadmin Container                       *
 **************************************************************/
 const pgadmin_container = {
  container_name: 'pgadmin',
  image: 'dpage/pgadmin4',
  restart: 'unless-stopped',
  ports: ['5555:80'],
  environment: [
    "PGADMIN_DEFAULT_EMAIL=user@domain.com",
    "PGADMIN_DEFAULT_PASSWORD=password",
    "PGADMIN_CONFIG_ENHANCED_COOKIE_PROTECTION=True",
    "PGADMIN_CONFIG_LOGIN_BANNER=\"Webpod authorized users only!\""
  ],
  volumes: [
    "../pgadmin:/var/lib/pgadmin",
    "../pgadmin:/pgadmin4/servers.json",
    "../pgadmin:/pgadmin4/config_local.py"
  ]
}

let dockerCompose = {
  version: '3',
  services: {
    'backend': backend_container,
    'frontend-admin': frontend_admin_container,
    'frontend-public': frontend_public_container,
    'nginx': nginx_container,
    'postgres': postgres_container,
  }
}

if(app_config.use_pg_admin) {
  dockerCompose.services.pgadmin = pgadmin_container
}

module.exports = dockerCompose