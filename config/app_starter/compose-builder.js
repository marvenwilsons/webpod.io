const app_config = require('../app.js')
const adminPort = 5000
const publicPort = 3000
/**************************************************************
 *                  Front End Admin Container                  *
 **************************************************************/
const frontEndAdminContainer = {
  build: {
    context: '../frontend-admin',
    target: 'dev'
  },
  container_name: 'Admin',
  restart: 'unless-stopped',
  working_dir: '/usr/src/admin',
  environment: [
    "APP_HOST=frontend-admin",
    `APP_PORT=${adminPort}`,
    `ADMIN_ROUTE=${app_config.admin_route}`,
    `API_URL=${app_config.backend.admin_api_route}`,
    `API_BASE=backend:${app_config.backend.admin_server_port}`
  ],
  networks: [
    'admin-network'
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
const frontEndPublicContainer = {
  build: {
    context: '../frontend-public',
    target: 'dev'
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
  networks: [
    'public-network'
  ],
  volumes: [
    "../frontend-public/assets:/usr/src/public/assets",
    "../frontend-public/layouts:/usr/src/public/layouts",
    "../frontend-public/middleware:/usr/src/public/middleware",
    "../frontend-public/pages:/usr/src/public/pages",
    "../frontend-public/plugins:/usr/src/public/plugins",
    "../frontend-public/server:/usr/src/public/server",
    "../frontend-public/store:/usr/src/public/store",
    "../frontend-public/static:/usr/src/public/static",
    "../frontend-public/m.js:/usr/src/public/m.js",
    "../frontend-public/nuxt.config.js:/usr/src/public/nuxt.config.js"
  ]
}
/**************************************************************
 *                   Back-End Container                       *
 **************************************************************/
 const backEndContainer = {
  build: {
    context: '../backend',
    args: {
      BACKEND_PORT: app_config.backend.admin_server_port
    }
  },
  container_name: "BackEnd",
  restart: "unless-stopped",
  working_dir: "/usr/src/backend",
  environment: [
    "HOST=backend",
    "ADMIN_SERVER_PORT=8000",
    "PUBLIC_SERVER_PORT=9000",
    `API_URL=${app_config.backend.admin_api_route}`
  ],
  // ports: [
  //   `${app_config.backend.admin_server_port}:${app_config.backend.admin_server_port}`,
  // ],
  depends_on: [
    'frontend-admin',
    'frontend-public',
  ],
  networks: [
    'backend-network'
  ]
}
/**************************************************************
 *                      Nginx Container                       *
 **************************************************************/
const nginxContainer = {
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
    // PG ADMIN
    { PGADMIN_URL:                      app_config.pg_admin.PGADMIN_URL }
  ],
  networks: [
    'backend-network',
    'admin-network',
    'public-network'
  ]
}

nginxContainer.environment.map((e,i) => {
  if(typeof e == 'object') {
    nginxContainer.environment[i] = `${[Object.keys(e)[0]]}=${e[Object.keys(e)[0]]}`
  }
})


let dockerCompose = {
  version: '3',
  services: {
    'backend': backEndContainer,
    'frontend-admin': frontEndAdminContainer,
    'frontend-public': frontEndPublicContainer,
    'nginx': nginxContainer,
  },
  networks:{
    'admin-network' : {
      driver: 'bridge',
    },
    'public-network': {
      driver: 'bridge'
    },
    'backend-network': {
      driver: 'bridge'
    }
  }
}

module.exports = dockerCompose