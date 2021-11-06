const admin_auth = require('./admin_authentication')
const admin_dashboard_users = require('./admin_dashboard_users')

module.exports = (cb) => ({
  test(payload) {
    console.log('ℹ Executing test method')
    console.log('ℹ Payload from client- ', payload)
    cb({
      method_name: 'test',
      payload: 'hello'
    })

    setTimeout(() => {
      cb({
        method_name: 'test',
        payload: 'another payload'
      })
    },1000)
  },
  ...admin_auth,
  ...admin_dashboard_users
})