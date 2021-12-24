
const admin_auth = require('./admin_authentication')
const stored_procedures_services = require('./sp-services')
const stored_procedures_collections = require('./sp-collections')
const stored_procedures_admin = require('./sp-admin')
const stored_procedures_role = require('./sp-role')
const stored_procedures_media = require('./sp-media')

module.exports = async (dashboard) => ({

  onMount() {
    console.log('on Mount')
    dashboard.exec({
      location: 'sidebar',
      action: 'open',
      payload: "test"
    })
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