
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
          .exec('menu',     'setItems',     userServices.menu_items)
          .exec('menu',     'setSelected',  'Dashboard')

      break;
      case 'getDashboardResource':
        const sys = procedures()
        let dashboard_resource = {
          admin: undefined,
          role: undefined,
          menu: undefined,
          services: undefined
        }
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
        const each_menu = []
        const each_selected_service_version = []
        role_menu.map(({menu_id,service_id,service_version}) => {
          each_menu.push(sys.getMenu(menu_id))
        })

        const dashboard_menu = await Promise.all(each_menu).then((value) => value.map(({menu_id,menu_name, use_instancer},_) => ({
          menu_id,
          menu_name,
          use_instancer
        })))
        dashboard.exec('menu','setItems', dashboard_menu)

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