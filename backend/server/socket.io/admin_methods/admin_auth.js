const jwt = require('jsonwebtoken')

function verifyToken (token,secret,user) {
  const payload = jwt.verify(token, secret)
  return payload.user === user.id
}

module.exports = async function ({user, token}) {
  const u = { // TODO
    user: 'admin',
    id: 'sampleUserId',
    password: 'admin',
    token: undefined
  }
  return new Promise(function(resolve,reject) {ion
    if(user) {
    // check user token, dashboard request authenticat
      setTimeout(() => {
        resolve({
          is_valid: verifyToken(token, process.env.JWT_SECRET,u)
        })
      }, 100)
    } else {
      setTimeout(() => {
        resolve({
          is_valid: false
        })
      }, 100)
    }
    
  })
}