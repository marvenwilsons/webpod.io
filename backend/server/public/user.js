const mock_user = ['admin','admin1']

module.exports = (app) => {
  console.log('user route')
  app.get('/user/confirm_user', function (req, res ) {
    /** confirm username or email exist */

    const { user } = req.query

    res.status(200).json({
      isSuccess: mock_user.includes(user) ? true : false,
      msg: mock_user.includes(user) ? {} : `Invalid: Cannot find "${user}" in the database`,
      contents: null
    })

  })
  
  app.post('/user/signin', function (req, res) {

    const { user, password } = req.body

    const mock_password_check = password == 'admin'

    res.status(200).json({
      isSuccess: mock_password_check,
      msg: mock_password_check ? null : 'Password is incorrect',
      content: {
          token: mock_password_check ? 'nvoYkjsdfkjndkjhf2983475932rksdnf' : null
      }
    })

  })
}