// const server = require('./admin-server')

// server.on('ready', (admin,dashboard,dbEvents) => {
//     console.log('server on ready!')
//     /** DASHBOARD OR CLIENT EVENTS */
//     dashboard.on('getDashboardResource', async (payload) => {
//         const dashExecs = []
//         console.log('getting resource!')

//         // get admin
//         const  { name, email, user, avatar, role_id }  = await admin.getAdmin(payload.user)

//         // set user info to dashboard
//         dashboard.exec('dash','setUser', { name, email, user, avatar })

//         // get admin role
//         const role = await admin.getRole(role_id)
//         const { role_name, role_menu } = role

//         let each_menu = []
//         let selected_service_version = []
//         let selected_service = []

//         role_menu.map(async (e,i) => {
//           const {menu_id,service_id,primary_version,versions} = e
//           // log(`addMenuMappingRole for ${menu_id}`)
//           // progress(i * 10)
//           dashExecs.push(['dash','addMenuMappingRole',{menu_id,service_id,primary_version}])
//           // dashboard.exec('dash','addMenuMappingRole',{menu_id,service_id,primary_version})
//           dashExecs.push(['dash','addServiceMappingRole',{service_id,versions}])
//           // dashboard.exec('dash','addServiceMappingRole',{service_id,versions})

//           each_menu.push(admin.getMenu(menu_id))
//           selected_service.push(admin.getService(service_id))
//           selected_service_version.push(admin.getServiceVersion(service_id,primary_version))

//         })

//         // menu bar
//         Promise.all(each_menu).then((value) => value.map(({menu_id,menu_name},_) => {
//           // setting menubar menu
//           // dashboard.exec('menu','addItem', {menu_id,menu_name})
//           dashExecs.push(['menu','addItem', {menu_id,menu_name}])
//         })).then(() => {
//           // dashboard.exec('menu','setSelected','Dashboard')
//           dashExecs.push(['menu','setSelected','Dashboard'])
//         })


//         Promise.all(selected_service).then((data) => {
//           // console.log(data)
//           // set dashboard services
//         })

//         // promise.all will fail if there is one failed promise, even if other promise resolves.
//         Promise.all(selected_service_version).then((data) => {
//           console.log('atay!')
//           // set dashboard services
//           dashExecs.push(['dash','showInitForms',false])
//           // dashboard.exec('dash','showInitForms',false)
//           // dashboard.exec('dash','constructDashboardServices',data)
//           dashExecs.push(['dash','constructDashboardServices',data])

//           // dashboard.exec('dash','showDashboard',true)
//           dashExecs.push(['dash','showDashboard',true])

//           let i = 0
//           const mi = setInterval(() => {
//             i ++
//             if(i == dashExecs.length) {
//               console.log('stoped!',i)
//               clearInterval(mi)
//             }
//           },10)
//           // setTimeout(() => {
//           //   dashboard.exec('dash','loading',false)
//           // }, 100)

//         }).catch(err => {
//           dashboard.exec('dash','alertError', {
//             message: err,
//             reload: true
//           })
//         })
//     })

//     /** DASHBOARD MENU CHANGE */
//     dashboard.on('menuChange', async ({ token, user, menu }) => {
//       // dashboard.exec('dash','setMenuData', 'hello world!')
//       console.log('menuChange: ', menu)
//     })

//     /** ADMIN EVENTS */
//     admin.on('login', () => {
//       console.log('admin login')
//     })
//     admin.on('logout', () => {
//       console.log('admin logout')
//     })

//     /** ADMIN TOKEN EVENTS */
//     admin.token.on('expire', (data) => {
//         dashboard.exec('dash','alertError', {
//             message: 'Session expired you need to re-login',
//             reload: true
//         })
//     })
//     admin.token.on('data', (data) => {
        
//     })
// })

// server.on('mount', () => {
//   console.log('\n\n\n mounted')
// })
// server.on('error', (error) => {
//   console.log('ℹ There was an error: ', err)
// })