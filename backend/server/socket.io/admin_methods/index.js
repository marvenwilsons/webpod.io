const admin_auth = require('./admin_authentication')
const stored_procedures_services = require('./sp-services')
const stored_procedures_collections = require('./sp-collections')
const stored_procedures_admin = require('./sp-admin')
const stored_procedures_role = require('./sp-role')
const stored_procedures_media = require('./sp-media')
const stored_procedures_menu = require('./sp-menu')

module.exports = (cb) => ({
  ...admin_auth,
  ...stored_procedures_services,
  ...stored_procedures_collections,
  ...stored_procedures_admin,
  ...stored_procedures_role,
  ...stored_procedures_media,
  ...stored_procedures_menu
})