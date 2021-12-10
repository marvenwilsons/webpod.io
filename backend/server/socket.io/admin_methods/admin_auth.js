const jwt = require('jsonwebtoken')

function verifyToken (token,secret,user) {
  const payload = jwt.verify(token, secret)
  return payload.user === user.id
}

module.exports = async function ({user, token}) {
  const u = {
    user: 'admin',
    id: 'sampleUserIdz',
    password: 'admin',
    token: undefined
  }
  return new Promise(function(resolve,reject) {
    // check user token, dashboard request authentication
    if(user) {
      setTimeout(() => {
        resolve({
          is_valid: verifyToken(token, process.env.JWT_SECRET,u)
        })
      }, 100)
    } else {
      console.log('authentication failed user is undefined')
      setTimeout(() => {
        resolve({
          is_valid: false
        })
      }, 100)
    }
    
  })
}