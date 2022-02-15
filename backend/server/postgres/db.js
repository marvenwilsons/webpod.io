const { Pool } = require('pg')
const pool = new Pool({
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD
})


module.exports = {
    query : (text, params) => pool.query(text,params)
}