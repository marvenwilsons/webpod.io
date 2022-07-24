module.exports = (admin,clientExec,dbEvents) => ({
  async getDashboardResource(payload) {
      const dashExecs = []
      console.log('getting resource!')

      // get admin
      const  { name, email, user, avatar, role_id }  = await admin.getAdmin(payload.user)

      // set user info to dashboard
      dashExecs.push(['dash','setUser', { name, email, user, avatar }])

      // get admin role
      const role = await admin.getRole(role_id)
      const { role_name, role_menu } = role

      let each_menu = []
      let selected_service_version = []
      let selected_service = []

      role_menu.map(async (e,i) => {
        const {menu_id,service_id,primary_version,versions} = e
        // log(`addMenuMappingRole for ${menu_id}`)
        // progress(i * 10)
        dashExecs.push(['dash','addMenuMappingRole',{menu_id,service_id,primary_version}])
        // dashboard.exec('dash','addMenuMappingRole',{menu_id,service_id,primary_version})
        dashExecs.push(['dash','addServiceMappingRole',{service_id,versions}])
        // dashboard.exec('dash','addServiceMappingRole',{service_id,versions})

        each_menu.push(admin.getMenu(menu_id))
        selected_service.push(admin.getService(service_id))
        selected_service_version.push(admin.getServiceVersion(service_id,primary_version))

      })

      // menu bar
      Promise.all(each_menu).then((value) => value.map(({menu_id,menu_name},_) => {
        // setting menubar menu
        // dashboard.exec('menu','addItem', {menu_id,menu_name})
        dashExecs.push(['menu','addItem', {menu_id,menu_name}])
      })).then(() => {
        // dashboard.exec('menu','setSelected','Dashboard')
        dashExecs.push(['menu','setSelected','Dashboard'])
      })


      Promise.all(selected_service).then((data) => {
        // console.log(data)
        // set dashboard services
      })

      // promise.all will fail if there is one failed promise, even if other promise resolves.
      Promise.all(selected_service_version).then((data) => {
        console.log('atay!')
        // set dashboard services
        dashExecs.push(['dash','showInitForms',false])
        dashExecs.push(['dash','constructDashboardServices',data])

        dashExecs.push(['dash','showDashboard',true])
        dashExecs.push(['dash','loading',false])

        const getPercentage = (total,percentToGet ) => {
          return Math.round(parseFloat((percentToGet / 100) * total) * 10)
        }

        let i = -1
        const mi = setInterval(() => {
          i ++
          if(i == dashExecs.length) {
            log(null)
            clearInterval(mi)
          } else {
            // console.log(i,dashExecs[i][0],' - ',dashExecs[i][1])
            log(`${dashExecs[i][1]}`)
            progress(getPercentage(dashExecs.length,i))
            clientExec(
              dashExecs[i][0],
              dashExecs[i][1],
              dashExecs[i][2],
            )
          }
        },50)
        // setTimeout(() => {
        //   dashboard.exec('dash','loading',false)
        // }, 100)

      }).catch(err => {
        // dashboard.exec('dash','alertError', {
        //   message: err,
        //   reload: true
        // })
      })
  },
  async menuChange ({ token, user, menu }) {
    console.log('menuChange: ', menu)
  }
})