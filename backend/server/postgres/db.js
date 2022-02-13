const { Pool } = require('pg')
const pool = new Pool({
    host: 'localhost',
    user: 'database-user',
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  })


module.exports = {
    query : (text, params) => pool.query(text,params)
}

/**
 * postgres:
    container_name: "postgres"
    image: "postgres"
    restart: "always"
    ports:
      - "5432"
    environment:
      POSTGRES_PASSWORD: "postgres"
      POSTGRES_USER: "postgres"
      POSTGRES_DB: "money"
      PGHOST: "postgres"
    volumes:
      - "./pgdata:/var/lib/postgresql/data"
    depends_on:
      - "site"
  pgadmin:
    container_name: "pgadmin"
    image: "dpage/pgadmin4"
    environment:
      - "PGADMIN_DEFAULT_EMAIL=user@domain.com"
      - "PGADMIN_DEFAULT_PASSWORD=password"
      - "PGADMIN_CONFIG_ENHANCED_COOKIE_PROTECTION=True"
      - "PGADMIN_CONFIG_LOGIN_BANNER=\"Authorised users only!\""
    volumes:
      - "./pgadmin:/var/lib/pgadmin"
      - "./pgadmin:/pgadmin4/servers.json"
      - "./pgadmin:/pgadmin4/config_local.py"
    ports:
      - "5555:80"
    restart: "unless-stopped"
 */