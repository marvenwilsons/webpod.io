const admin_auth = require('./admin_authentication')
const stored_procedures_services = require('./sp-services')
const stored_procedures_collections = require('./sp-collections')
const stored_procedures_admin = require('./sp-admin')
const stored_procedures_role = require('./sp-role')

module.exports = (cb) => ({
  ...admin_auth,
  ...stored_procedures_services,
  ...stored_procedures_collections,
  ...stored_procedures_admin,
  ...stored_procedures_role
})