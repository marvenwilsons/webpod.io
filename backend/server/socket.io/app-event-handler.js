const server = require('./admin-server')

server.on('ready', (admin,dashboard) => {

    /** DASHBOARD EVENTS */
    dashboard.on('getDashboardResource', async (admin_id) => {

        // get admin
        const  { name, email, user, avatar, role_id }  = await admin.getAdmin(admin_id)

        // set user info to dashboard
        dashboard.exec('dash','setUser', { name, email, user, avatar })

        // get admin role
        const role = await admin.getRole(role_id)
        const { role_name, role_menu } = role

        let each_menu = []
        let selected_service_version = []
        let selected_service = []

        role_menu.map(async ({menu_id,service_id,primary_version,versions}) => {

          dashboard.exec('dash','addMenuMappingRole',{menu_id,service_id,primary_version})
          dashboard.exec('dash','addServiceMappingRole',{service_id,versions})

          each_menu.push(admin.getMenu(menu_id))
          selected_service.push(admin.getService(service_id))
          selected_service_version.push(admin.getServiceVersion(service_id,primary_version))

        })

        Promise.all(each_menu).then((value) => value.map(({menu_id,menu_name},_) => {
          // setting menubar menu
          dashboard.exec('menu','addItem', {menu_id,menu_name})
        })).then(() => {
          dashboard.exec('menu','setSelected','Dashboard')
        })


        Promise.all(selected_service).then((data) => {
          console.log(data)
          // set dashboard services
        })

        // promise.all will fail if there is one failed promise, even if other promise resolves.
        Promise.all(selected_service_version).then((data) => {
          // set dashboard services
          dashboard.exec('dash','showInitForms',false)
          dashboard.exec('dash','constructDashboardServices',data)
          dashboard.exec('dash','showDashboard',true)
          setTimeout(() => {
            dashboard.exec('dash','loading',false)
          }, 1000)

        }).catch(err => {
          dashboard.exec('dash','alertError', {
            message: err,
            reload: true
          })
        })
    })

    /** ADMIN EVENTS */
    admin.on('login', () => {
      
    })
    admin.on('logout', () => {

    })

    /** ADMIN TOKEN EVENTS */
    admin.token.on('expire', (data) => {
        dashboard.exec('dash','alertError', {
            message: 'Session expired you need to re-login',
            reload: true
        })
    })
    admin.token.on('data', (data) => {
        
    })
})

server.on('mount', () => {
  console.log('\n\n\n mounted')
})
server.on('error', (error) => {
  console.log('ℹ There was an error: ', err)
})