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
  return new Promise(function(resolve,reject) {
    if(user) {
    // check user token, dashboard request authenticat
      try {
        const is_valid = verifyToken(token, process.env.JWT_SECRET,{
          id: user
        })
        resolve({
          is_valid
        })
      } catch(err) {
        // when token expires
        resolve({
          is_valid: false
        })
      }
    } else {
      // when user is undefined
      resolve({
        is_valid: false
      })
    }
    
  })
}