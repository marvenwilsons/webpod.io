async function insertNewRole () {

}

async function getRole (role_id) {
  console.log(`=== getRole ${role_id} ===`)

  const mock_response = {
    role_id,
    role_name: 'master',
    role_menu: [
      {
        menu_id: 'menu-id-lkasdn',
        service_id: 'service-id-dmni24',
        service_version: 'sevice-ver-nvjb23y8'
      },
      {
        menu_id: 'menu-id-fhtte45y',
        service_id: 'service-id-sdgasdf',
        service_version: 'sevice-ver-wfmiuwfh'
      },
      {
        menu_id: 'menu-id-fhytj34r',
        service_id: 'service-id-prch',
        service_version: 'sevice-ver-dffr4yt'
      },
      {
        menu_id: 'menu-id-fesseft',
        service_id: 'service-id-h6tgwer23',
        service_version: 'sevice-ver-nvjbf23y8'
      },
      {
        menu_id: 'menu-id-hfg45uc',
        service_id: 'service-id-dmni25',
        service_version: 'sevice-ver-nvjb23y8'
      },
      {
        menu_id: 'menu-id-lkasdn22',
        service_id: 'service-id-dmni26',
        service_version: 'sevice-ver-nvjb23y11'
      },
      {
        menu_id: 'menu-id-lkasdn1',
        service_id: 'service-id-dmni25',
        service_version: 'sevice-ver-nvjb23y9'
      },
      {
        menu_id: 'menu-id-lkasdn28',
        service_id: 'service-id-dmni27',
        service_version: 'sevice-ver-nvjb23y10'
      },
      {
        menu_id: 'menu-id-lkasdn',
        service_id: 'service-id-dmni24',
        service_version: 'sevice-ver-nvjb23y21'
      }
    ]
  }

  return new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve(mock_response)
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