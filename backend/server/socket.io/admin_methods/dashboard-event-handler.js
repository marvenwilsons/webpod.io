
const procedures = require('./index')

module.exports = async (dashboard) => ({

  onMount() {
    console.log('on Mount')
    // dashboard.exec({
    //   location: 'sidebar',
    //   action: 'open',
    //   payload: "test"
    // })
    // dashboard.send('media')
  },

  // onRequest is executed by admin-server.js
  async onRequest(request_name,admin_username) {
    // console.log('** on request', request_name, user)
    switch(request_name) {
      case 'getUserServices':
        const userServices = await procedures()['getUserServices']()

        dashboard
          .exec('dash','setUser',{
            name: userServices.name,
            email: userServices.email,
            avatar: userServices.avatar
          })
          .exec('topbar',   'setMsg',       userServices.app_name)
          .exec('service',  'setServices',  userServices.services)
          // .exec('menu',     'setItems',     userServices.menu_items)
          // .exec('menu',     'setSelected',  'Dashboard')

      break;
      case 'getDashboardResource':
        const sys = procedures()
        
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

        // get admin
        const admin_basic_info = await sys.getAdmin(admin_username)
        const { name, email, user, avatar, role_id } = admin_basic_info
        dashboard.exec('dash','setUser', { name, email, user, avatar })
        
        
        // get admin role
        const role = await sys.getRole(role_id)
        const { role_name, role_menu } = role
        
        // fetching admin menu and services
        let each_menu = []
        let selected_service_version = []
        let selected_service = undefined
        const x = role_menu.map(async ({menu_id,service_id,service_version_name}) => {
          each_menu.push(sys.getMenu(menu_id))
          selected_service = sys.getService(service_id)

          console.log('looking for service -> ', service_id,service_version_name)
          selected_service_version.push(sys.getServiceVersion(service_id,service_version_name))
        })

        // promise.all will fail if there is one failed promise, even if other promise resolves.
        Promise.all(selected_service_version)
        .then(({service_id,version_id,version_name,version_data,versions}) => {
          // set dashboard services
        }).catch(err => {
          dashboard.exec('dash','alertError', {
            message: err,
            reload: true
          })
        })

        Promise.all(each_menu)
        .then((value) => value.map(({menu_id,menu_name, use_instancer},_) => {
          // setting sidebar menu
          dashboard.exec('menu','addItem', {menu_id,menu_name, use_instancer})
          return {menu_id,menu_name, use_instancer}
        }))
        .then(data => {
          dashboard.exec('menu','setSelected',  'Dashboard')
        })


        selected_service.then(({service_name,service_id}) => {
          // set dashboard services
        })
        
        

      break;
    }
  },

  onTokenExpire() {
    console.log('token expired')
  },

  onSideBarItemClick() {

  },

  onPodCommand() {
    // when admin clicks or emits something from a service ui
  },

  beforeLogout() {
    console.log('** before logout')
  },

  onLogout() {
    console.log('** on logout')
  },

  onMediaRequest() {

  },

})