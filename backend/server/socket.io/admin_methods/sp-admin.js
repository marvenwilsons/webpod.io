const { query } = require('../../postgres/db')
async function insertNewAdmin (payload) {
  const admin = {
    admin_id: undefined, // string
    admin_name: undefined, // string
    admin_username: undefined, // string
    admin_email: undefined, // string
    admin_password: undefined, // string
    admin_role: undefined, // string
    admin_tile: undefined, // string
    admin_services: undefined // array of strings
  }
}

async function getAdmin (user_id) {
  const user = (await query(`SELECT * FROM ${process.env.TABLE_PREFIX}users WHERE user_id = $1`, [user_id])).rows[0]
  return new Promise((resolve,reject) => {
    resolve({
      name: `${user.first_name} ${user.last_name}`,
      email: user.email,
      user: user.username,
      avatar: user.avatar,
      role_id: user.role_id
    })
  })
}

async function getAllAdmins (payload) {

}

async function dropAdmin (payload) {

}

async function alterAdmin (payload) {

}

module.exports = {
  insertNewAdmin,
  getAdmin,
  dropAdmin,
  alterAdmin,
  getAllAdmins
}