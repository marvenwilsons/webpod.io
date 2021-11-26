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

async function getAdmin (payload) {

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