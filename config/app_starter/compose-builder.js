const app_config = require('../app.json')

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
    `APP_PORT=${adminPort}`
  ],
  ports: [
    `${adminPort}:${adminPort}`
  ],
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
    target: 'production'
  },
  container_name: 'Public',
  restart: 'unless-stopped',
  working_dir: '/usr/src/public',
  environment: [
    'APP_HOST=frontend-public',
    `APP_PORT=${publicPort}`,
    'APP_NAME=sample.com'
  ],
  ports: [
    `${publicPort}:${publicPort}`
  ],
  volumes: [
    "../frontend-public/assets:/usr/src/public/assets",
    "../frontend-public/components:/usr/src/public/components",
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
 *                      Nginx Container                       *
 **************************************************************/
const nginxContainer = {
  image: 'nginx',
  depends_on: [
    'frontend-admin',
    'frontend-public'
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
    `UPSTREAM_ADMIN=frontend-admin:${adminPort}`,
    `ADMIN_ROUTE=${app_config.admin_route}`,
    `UPSTREAM_PUBLIC=frontend-public:${publicPort}`,
    "PGADMIN_URL=mydb"
  ]
}

const final = {
  version: '3',
  services: {
    'frontend-admin': frontEndAdminContainer,
    'frontend-public': frontEndPublicContainer,
    'nginx': nginxContainer
  }
}

module.exports = final