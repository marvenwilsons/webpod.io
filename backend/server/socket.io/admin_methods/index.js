const admin_auth = require('./admin_authentication')
const admin_dashboard_users = require('./admin_dashboard_users')

module.exports = (cb) => ({
  ...admin_auth,
  ...admin_dashboard_users
})