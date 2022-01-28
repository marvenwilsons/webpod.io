
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

  async onRequest(request_name,user) {
    // console.log('** on request', request_name, user)
    switch(request_name) {
      case 'getUserServices':
        const userServices = await procedures()[request_name]()

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
        //  1. get user object
        //  2. get user-role using the user object
        //  3. get the required user services for that the menu items pointed to
        //  4. Services requires an app instance data, locate the app and the required instance
        //  5. Compose all and sent to client
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