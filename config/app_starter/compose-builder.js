const app_config = require('../app.json')

const frontEndAdminContainer = {
  build: {
    context: '.',
    target: 'dev'
  },
  container_name: 'Admin',
  restart: 'unless-stopped',
  working_dir: '/usr/src/nuxt-app',
  environment: [
    "APP_HOST=frontend-admin",
    "APP_PORT=3000"
  ],
  ports: [
    "3000:3000"
  ],
  volumes: [
    "../frontend-admin/assets:/usr/src/nuxt-app/assets",
    "../frontend-admin/components:/usr/src/nuxt-app/components",
    "../frontend-admin/layouts:/usr/src/nuxt-app/layouts",
    "../frontend-admin/middleware:/usr/src/nuxt-app/middleware",
    "../frontend-admin/pages:/usr/src/nuxt-app/pages",
    "../frontend-admin/plugins:/usr/src/nuxt-app/plugins",
    "../frontend-admin/server:/usr/src/nuxt-app/server",
    "../frontend-admin/store:/usr/src/nuxt-app/store",
    "../frontend-admin/static:/usr/src/nuxt-app/static",
    "../frontend-admin/m.js:/usr/src/nuxt-app/m.js",
    "../frontend-admin/nuxt.config.js:/usr/src/nuxt-app/nuxt.config.js"
  ]
}
const frontEndPublicContainer = {
  build: {
    context: '.',
    target: 'production'
  },
  container_name: 'Public',
  restart: 'unless-stopped',
  working_dir: 'usr/src/nuxt-app',
  environment: [
    'APP_HOST=frontend-public',
    'APP_PORT=3001',
    'APP_NAME=sample.com'
  ],
  ports: [
    '3001:3001'
  ],
  volumes: [
    "../frontend-public/assets:/usr/src/nuxt-app/assets",
    "../frontend-public/components:/usr/src/nuxt-app/components",
    "../frontend-public/layouts:/usr/src/nuxt-app/layouts",
    "../frontend-public/middleware:/usr/src/nuxt-app/middleware",
    "../frontend-public/pages:/usr/src/nuxt-app/pages",
    "../frontend-public/plugins:/usr/src/nuxt-app/plugins",
    "../frontend-public/server:/usr/src/nuxt-app/server",
    "../frontend-public/store:/usr/src/nuxt-app/store",
    "../frontend-public/static:/usr/src/nuxt-app/static",
    "../frontend-public/m.js:/usr/src/nuxt-app/m.js",
    "../frontend-public/nuxt.config.js:/usr/src/nuxt-app/nuxt.config.js"
  ]
}
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
    "APP_SERVER=site:5000",
    "PGADMIN_URL=mydb"
  ]
}

module.exports = {
  version: '3',
  services: {
    'frontend-admin': frontEndAdminContainer,
    'frontend-public': frontEndPublicContainer,
    'nginx': nginxContainer
  }
}