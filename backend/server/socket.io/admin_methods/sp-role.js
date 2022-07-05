const { query } = require('../../postgres/db')

async function insertNewRole () {

}

async function getRole (_role_id) {

  const { role_id, role_menu, role_name } = (await query(`SELECT * FROM ${process.env.TABLE_PREFIX}roles WHERE role_id = $1`, [_role_id]))
  // const menus = (await query(`SELECT menu_id FROM ${process.env.TABLE_PREFIX}menu WHERE `))
  console.log('ROLE MENU', role_menu)
  
  return new Promise((resolve,reject) => {
    // admin is assigned by a role
    // a role contains role_menu that points to serveral services
    // so for example, a master role has this set of role_menu and services with the assigned version of that service.
    // example 2: an analyst role has a different set of role_menu and services.
    resolve({
      role_id,
      role_menu: [
        { // Dashboard Menu
          /**
           * purpose of this, is I want you to get all of the service version that has this service_id
           * then narrow or filter out all service version that has no same version_name
           * one service can have multiple service_versions
           * when the menu is clicked it will look for the service, then the service will provide the version
           */

          // refers to menu item from menu table
          menu_id: 'menu-id-lkasdn1', 

          // refers to service item from service table
          service_id: 'service-id-dmni10',

          // refers to a version item from service_version table 
          // a service_version contains content that the dashboard system uses to run
          primary_version: 'my-custom-version', 

          // refers to multiple version from service_version table
          // the user can toggle through this versions to have a different view in the dashboard
          versions: ['my-custom-version', 'my-custom-version1', 'my-custom-version2'] 
        },
        { // Collections Menu
          menu_id: 'menu-id-lkasdn2',
          service_id: 'service-id-dmni10',
          primary_version: 'my-custom-version2',
          versions: ['my-custom-version', 'my-custom-version1', 'my-custom-version2']
        },
        { // Site Menu
          menu_id: 'menu-id-lkasdn3',
          service_id: 'service-id-dmni10',
          primary_version: 'my-custom-version1',
          versions: ['my-custom-version', 'my-custom-version1']
        },
        { // Services Menu
          menu_id: 'menu-id-lkasdn4',
          service_id: 'service-id-dmni10',
          primary_version: 'my-custom-version2',
          versions: ['my-custom-version', 'my-custom-version1', 'my-custom-version2']
        },
        { // Settings Menu
          menu_id: 'menu-id-lkasdn5',
          service_id: 'service-id-dmni10',
          primary_version: 'my-custom-version3',
          versions: ['my-custom-version', 'my-custom-version1', 'my-custom-version2']
        },
        { // Media Files
          menu_id: 'menu-id-lkasdn6',
          service_id: 'service-id-dmni10',
          primary_version: 'my-custom-version4',
          versions: ['my-custom-version', 'my-custom-version1', 'my-custom-version2']
        },
        { // Apps
          menu_id: 'menu-id-lkasdn7',
          service_id: 'service-id-dmni10',
          primary_version: 'my-custom-version5',
          versions: ['my-custom-version', 'my-custom-version1', 'my-custom-version2']
        },
        { // User
          menu_id: 'menu-id-lkasdn8',
          service_id: 'service-id-dmni10',
          primary_version: 'my-custom-version6',
          versions: ['my-custom-version', 'my-custom-version1', 'my-custom-version2']
        },
        { // Roles
          menu_id: 'menu-id-lkasdn9',
          service_id: 'service-id-dmni10',
          primary_version: 'my-custom-version7',
          versions: ['my-custom-version', 'my-custom-version1', 'my-custom-version7']
        },
        { // Layout Builder
          menu_id: 'menu-id-lkasdn10',
          service_id: 'service-id-dmni10',
          primary_version: 'my-custom-version8',
          versions: ['my-custom-version', 'my-custom-version1', 'my-custom-version2']
        }
      ],
      role_name
    })
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