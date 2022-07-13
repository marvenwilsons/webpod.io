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
          },
          {
              name: 'Site',
              service: 'services/master',
          },
          {
              name: 'My Settings',
              service: 'settings/master'
          },
          {
              name: 'Media Files',
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

  return new Promise(function(resolve,reject) {
    resolve(mock_services_admin)
  })
}

async function  getService(service_id) {
  // console.log(`=== getService ${service_id} ===`)

  const mock_services = [
    {
      service_name: 'test-service',
      service_id: 'service-id-dmni10'
    },
    {
      service_name: 'test-service2',
      service_id: 'service-id-dmni11'
    }
  ]

  return new Promise((resolve,reject) => {
    for(let i = 0; i < mock_services.length; i++) {
      if(mock_services[i].service_id == service_id) {
        resolve(mock_services[i])
        break
      } else {
        // TODO
      }
    }
  })
}

async function  getServiceVersion(service_id, version_name) {
  // db("SELECT * FROM service_versions WHERE service_id = $1 AND version_name = $2", [service_id,version_name])
  // console.log(`=== getServiceVersion ${service_id} ===`)

  const ver9_instancer = {
    // instancer sample
    instance_types: [
      {
        type: 'Static Layout',
        desc: '',
        svg: '',
      },
      {
        type: 'Dynamic Layout',
        desc: '',
        svg: ''
      },
      {
        type: 'List Display Provider',
        desc: '',
        svg: ''
      }
    ],
    app_name: 'unitile' // fetches all unitile instances
    
  }

  const srvc_instancer = {
    instance_types: [
      {
        type: 'NEW SERVICE',
        desc: 'an application logic wrapper',
        svg: '',
      },
    ]
  }

  const collection_instancer = {
    instance_types: {

    }
  }

  const sample_ver_data = {
    body: {
        paneConfig: {
            isClosable: false,
            title: 'sample',
        },
        viewConfig: {},
        view: 'pd',
        viewData: undefined,
        viewHooks: ''
    }
  }

  const media_files = {
    body: {
        paneConfig: {
            isClosable: false,
            title: 'sample',
        },
        viewConfig: {},
        view: 'media-explorer',
        viewData: undefined,
        viewHooks: ''
    }
  }

  const collections = {
    body: {
        paneConfig: {
            isClosable: false,
            title: 'Collections',
        },
        viewConfig: {},
        view: 'collections',
        viewData: undefined,
        viewHooks: ''
    }
  }

  const role = {
    body: {
        paneConfig: {
            isClosable: false,
            title: '',
        },
        viewConfig: {},
        view: 'wp-system-manager',
        viewData: {
          wp_get: [
            'users',
            'roles',
            'services',
            'collections/staff'
          ],
          sampleExisitngPayload: {
            name: 'John Doe'
          }
        },
        viewHooks: ''
    }
  }
  

  const mock_service_versions = [
    // mock value of one service but owns 10 version
    {service_id: 'service-id-dmni10', version_id: 'ver-123', version_name: 'my-custom-version', version_data: null, instancer: ver9_instancer},
    {service_id: 'service-id-dmni10', version_id: 'ver-124', version_name: 'my-custom-version1', version_data: null},
    {service_id: 'service-id-dmni10', version_id: 'ver-125', version_name: 'my-custom-version2', version_data: collections}, // collections menu uses this
    {service_id: 'service-id-dmni10', version_id: 'ver-126', version_name: 'my-custom-version3', version_data: null},
    {service_id: 'service-id-dmni10', version_id: 'ver-127', version_name: 'my-custom-version4', version_data: media_files},
    {service_id: 'service-id-dmni10', version_id: 'ver-128', version_name: 'my-custom-version5', version_data: null},
    {service_id: 'service-id-dmni10', version_id: 'ver-130', version_name: 'my-custom-version6', version_data: null},
    {service_id: 'service-id-dmni10', version_id: 'ver-131', version_name: 'my-custom-version7', version_data: role},
    {service_id: 'service-id-dmni10', version_id: 'ver-132', version_name: 'my-custom-version8', version_data: null},
    {service_id: 'service-id-dmni10', version_id: 'ver-133', version_name: 'my-custom-version9', version_data: collections},
  ]
  

  return new Promise((resolve,reject) => {
    try {
      for(let i = 0; i < mock_service_versions.length; i++) {
        // console.log(`id:${service_id} name:${version_name}`)
        if(mock_service_versions[i].service_id == service_id && mock_service_versions[i].version_name == version_name) {
          console.log(`   > found service `, service_id)
          resolve(mock_service_versions[i])
        } else {
          if(i === mock_service_versions.length - 1) {
            const err = `<div> <strong>FATAL! </strong> Not found service version <strong>'${version_name}'</strong> with service_id </br>  <strong>'${service_id}'</strong> </div>`
            reject(err)
          }
        }
      }
    } catch(err) {
      console.log('yaw', err)
    }
  })
}

  async function getDashboardResource() {

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
    getService,
    getAllServices,
    getServiceVersion
  }