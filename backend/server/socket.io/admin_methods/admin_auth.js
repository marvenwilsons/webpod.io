module.exports = async function ({user, token}) {
  const sampleUser = {
    user: 'admin',
    password: 'admin',
    token: undefined
  }
  return new Promise(function(resolve,reject) {
    if(user) {
      
    
      setTimeout(() => {
        resolve({
          is_valid: true
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