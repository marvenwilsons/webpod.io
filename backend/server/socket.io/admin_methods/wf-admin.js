// admin workflow
// admin can emit events to client
// define relationships between collections, roles and services

module.exports = function (client ,admin, collection, role, services, token) {

  client.onSideBarItemClick = function() {

  }

  client.onPodCommand = function() {
    // when admin clicks or emits something from a service ui
  }

  client.beforeLogout = function () {
    console.log('** before logout')
  }

  client.onLogout = function () {
    console.log('** on logout')
  }

  client.onMount = function () {
    console.log('** on mount')
  }

}