async function insertNewRole () {

}

async function getRole (role_id) {
  console.log(`=== getRole ${role_id} ===`)
  const roles = [
    {
      role_id: 'sample_kjadbv34',
      role_name: 'master',
      role_menu: [
        {
          /**
           * purpose of this, is I want you to get all of the service version that has this service_id
           * then narrow or filter out all service version that has no same version_name
           * one service can have multiple service_versions
           * when the menu is clicked it will look for the service, then the service will provide the version
           */
          menu_id: 'menu-id-lkasdn1',
          service_id: 'service-id-dmni10', // 
          service_version_name: 'my-custom-version', // primary vesion
          versions: ['my-custom-version', 'my-custom-version1', 'my-custom-version2'] // user is allowed to toggle through versions
        },
        {
          menu_id: 'menu-id-lkasdn2',
          service_id: 'service-id-dmni10',
          service_version_name: 'my-custom-version',
          versions: ['my-custom-version', 'my-custom-version1', 'my-custom-version2']
        },
        {
          menu_id: 'menu-id-lkasdn3',
          service_id: 'service-id-dmni10',
          service_version_name: 'my-custom-version1',
          versions: ['my-custom-version', 'my-custom-version1']
        },
        {
          menu_id: 'menu-id-lkasdn4',
          service_id: 'service-id-dmni10',
          service_version_name: 'my-custom-version2',
          versions: ['my-custom-version', 'my-custom-version1', 'my-custom-version2']
        },
        {
          menu_id: 'menu-id-lkasdn5',
          service_id: 'service-id-dmni10',
          service_version_name: 'my-custom-version3',
          versions: ['my-custom-version', 'my-custom-version1', 'my-custom-version2']
        },
        {
          menu_id: 'menu-id-lkasdn6',
          service_id: 'service-id-dmni10',
          service_version_name: 'my-custom-version4',
          versions: ['my-custom-version', 'my-custom-version1', 'my-custom-version2']
        },
        {
          menu_id: 'menu-id-lkasdn7',
          service_id: 'service-id-dmni10',
          service_version_name: 'my-custom-version5',
          versions: ['my-custom-version', 'my-custom-version1', 'my-custom-version2']
        },
        {
          menu_id: 'menu-id-lkasdn8',
          service_id: 'service-id-dmni10',
          service_version_name: 'my-custom-version6',
          versions: ['my-custom-version', 'my-custom-version1', 'my-custom-version2']
        },
        {
          menu_id: 'menu-id-lkasdn9',
          service_id: 'service-id-dmni10',
          service_version_name: 'my-custom-version7',
          versions: ['my-custom-version', 'my-custom-version1', 'my-custom-version2']
        },
        {
          menu_id: 'menu-id-lkasdn10',
          service_id: 'service-id-dmni10',
          service_version_name: 'my-custom-version8',
          versions: ['my-custom-version', 'my-custom-version1', 'my-custom-version2']
        }
      ]
    }
  ]

  return new Promise((resolve,reject) => {
    setTimeout(() => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].role_id === role_id) { 
          resolve(roles[i])
          break; 
        }
      } 
    }, 50)
  })
}

async function getAllRoles () {

}

async function alterRole () {
   
}

async function dropRole () {
  
}

module.exports = {
  insertNewRole,
  getRole,
  getAllRoles,
  alterRole,
  dropRole
}