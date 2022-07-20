const appsApi = require('./api-apps/index')
const usersApi = require('./api-user/index')
const wpGetApi = require('./api-wp-get/index')

module.exports = function(app,db,adminEvents,dashboard) {
    appsApi(app,db,adminEvents,dashboard)
    usersApi(app,db,adminEvents,dashboard)
    wpGetApi(app,db,adminEvents,dashboard)
}