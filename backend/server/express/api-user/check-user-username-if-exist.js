/**
 * Checks if users username exist in the database
 */
const {  query } = require('../../postgres/db')
module.exports = async (username, cb) => {

    // if it return non zero rows it means the user exist
    const r  = await query(`SELECT username FROM ${process.env.TABLE_PREFIX}users WHERE username = $1`, [username])

    cb(r.rows.length != 0 ? true : false)
}