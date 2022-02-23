const { query } = require('../../postgres/db')

async function insertNewRole () {

}

async function getRole (_role_id) {

  const { role_id, role_menu, role_name } = (await query(`SELECT * FROM ${process.env.TABLE_PREFIX}roles WHERE role_id = $1`, [_role_id]))
  // const menus = (await query(`SELECT menu_id FROM ${process.env.TABLE_PREFIX}menu WHERE `))
  console.log('ROLE MENU', role_menu)
  
  return new Promise((resolve,reject) => {
    resolve({
      role_id,
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
          primary_version: 'my-custom-version', // primary vesion
          versions: ['my-custom-version', 'my-custom-version1', 'my-custom-version2'] // user is allowed to toggle through versions
        },
        {
          menu_id: 'menu-id-lkasdn2',
          service_id: 'service-id-dmni10',
          primary_version: 'my-custom-version',
          versions: ['my-custom-version', 'my-custom-version1', 'my-custom-version2']
        },
        {
          menu_id: 'menu-id-lkasdn3',
          service_id: 'service-id-dmni10',
          primary_version: 'my-custom-version1',
          versions: ['my-custom-version', 'my-custom-version1']
        },
        {
          menu_id: 'menu-id-lkasdn4',
          service_id: 'service-id-dmni10',
          primary_version: 'my-custom-version2',
          versions: ['my-custom-version', 'my-custom-version1', 'my-custom-version2']
        },
        {
          menu_id: 'menu-id-lkasdn5',
          service_id: 'service-id-dmni10',
          primary_version: 'my-custom-version3',
          versions: ['my-custom-version', 'my-custom-version1', 'my-custom-version2']
        },
        {
          menu_id: 'menu-id-lkasdn6',
          service_id: 'service-id-dmni10',
          primary_version: 'my-custom-version4',
          versions: ['my-custom-version', 'my-custom-version1', 'my-custom-version2']
        },
        {
          menu_id: 'menu-id-lkasdn7',
          service_id: 'service-id-dmni10',
          primary_version: 'my-custom-version5',
          versions: ['my-custom-version', 'my-custom-version1', 'my-custom-version2']
        },
        {
          menu_id: 'menu-id-lkasdn8',
          service_id: 'service-id-dmni10',
          primary_version: 'my-custom-version6',
          versions: ['my-custom-version', 'my-custom-version1', 'my-custom-version2']
        },
        {
          menu_id: 'menu-id-lkasdn9',
          service_id: 'service-id-dmni10',
          primary_version: 'my-custom-version7',
          versions: ['my-custom-version', 'my-custom-version1', 'my-custom-version2']
        },
        {
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