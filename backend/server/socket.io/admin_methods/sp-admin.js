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

async function getAdmin (user) {
  console.log('=== getAdmin ===', user)
  return new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve({
        name: 'Marven Wilson Donque',
        email: 'marvenwilsons@gmail.com',
        user: 'marvenwilsons',
        avatar: '',
        role_id: 'sample_kjadbv34'
      })
    }, 100);
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