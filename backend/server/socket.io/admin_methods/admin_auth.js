module.exports = async function ({user, token}) {
  // verifying: check if the token 
  console.log('authenticating')
  return new Promise(function(resolve,reject) {
    setTimeout(() => {
      resolve({
        is_valid: true
      })
    })
  })
}