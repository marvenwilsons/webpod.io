module.exports = (app) => {
  console.log('user route')
  app.get('/user/confirm_user', function (req, res ) {
    /** confirm username or email exist */
    console.log('user confirm!')
    res.send('Hello World!')
  })
}