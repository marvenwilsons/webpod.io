async function getUserServices(payload) {
    // get services by querying the database using the user value
  
    const mock_services_admin = require('./mock/admin-services')
  
    return new Promise(function(resolve,reject) {
      resolve(mock_services_admin)
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