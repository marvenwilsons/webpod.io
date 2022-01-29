function mock_getUser(user) {
  // this is just a sample function
  return new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve({
          name: 'Marven Wilson Donque',
          email: '',
          username: 'admin',
          password: 'admin',
          role: 'master' // points to a role instance
      })
    }, 100)
  })
}

function mock_getUserRole(roleName) {
  /**
   * SELECT roles_table FROM 
   */
  return new Promise((resolve,reject) => {
    resolve({
      role_name: 'master',
      menus: [
          {
              name: 'Dashboard',
              service: 'dashboard/master'
          },
          {
              name: 'Collections',
              service: 'collections/master',
              useInstancer: true
          },
          {
              name: 'Site',
              service: 'services/master',
              useInstancer: true
          },
          {
              name: 'My Settings',
              service: 'settings/master'
          },
          {
              name: 'Media',
              service: 'media/master'
          },
          {
              name: 'Apps',
              service: 'apps/master',
              useInstancer: true
          },
          {
              name: 'User & Roles',
              service: 'user&roles/master'
          },
          {
              name: 'Layout Builder',
              service: 'layoutBuilder/master',
              useInstancer: true,
              instaceTypes: ['Static Layout','Dynamic Layout','List Display Provider']
          }
      ],
    })
  })
}

function mock_getService({serviceName, serviceVersion}) {
  const s = {
    serviceName: 'dashboard',
    versions: [
        {
            versionName: 'master',
            body: {
                view: 'empty', // points to an app name
                viewConfig: '',
                viewData:'', // points to an app instance, ex. 
                viewHooks:'',
                paneConfig: '',
                paneHooks: ''
            }
        }
    ]
  }
}

async function getUserServices(payload) {
  // get services by querying the database using the user value
  console.log(payload)
  const mock_services_admin = require('./mock/admin-services')
  if(payload != undefined) {
    
    /**
     * Get user query database for the user
     * SELECT * FROM users WHERE username = payload.user
     * it will return user's basic info and a role_id
     * use that role_id to query the roles
     * 
     * Get user role
     * SELECT * FROM roles WHERE role_id = user.role_id
     * it will return a role_name and role_menu, role_menu is an array 
     * containing object that properties are mapped to different tables.
     * { role_menu object sample
     *    menuId: 'rand string' -> points to menu table
     *    serviceId: 'rand string' -> points to service table
     *    serviceVersion: 'rand string' -> pointer to instances of a service table
     * }
     */
    const user = await mock_getUser(payload.user)
    
    // get user role, query the roles database
    const {role_name,menus} = await mock_getUserRole(user.role)
    
    // get services
    menus.map(menu => {
      console.log(menu.service)
    })
  }

  return new Promise(function(resolve,reject) {
    resolve(mock_services_admin)
  })
}

  async function getDashboardResource() {

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