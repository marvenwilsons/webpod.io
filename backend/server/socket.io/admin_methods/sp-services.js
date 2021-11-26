async function getUserServices(payload) {
  // get services by querying the database using the user value

  const admin =  {
    user: 'marvenwilsons',
    app_name: 'sample.com',
    sidebar_items: ['Dashsboard','Collections','Site','Apps','Services','Settings','Media','Uniview'],
    services: []
  }

  return new Promise(function(resolve,reject) {
    resolve(admin)
  })
}

async function getServices(payload) {
  const { user } = payload

}

async function getAllServices() {

}

async function insertNewService(payload) {
  // generates a new service object only
  // this function shouldn't be aware of any user


}

async function alterService(payload) {

}

async function dropService(payload) {

}

async function insertNewService(payload) {

}


module.exports = {
  getUserServices,
  insertNewService,
  alterService,
  dropService,
  insertNewService,
  getServices,
  getAllServices
}