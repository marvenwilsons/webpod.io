const mock_user = ['admin','admin1']
const jwt = require('jsonwebtoken')


module.exports = (app) => {
  console.log('user route')
  app.get('/user/confirm_user', function (req, res ) {
    /** purpose is to check the username or email from req.query if it exist */

    const { user } = req.query

    res.status(200).json({
      isSuccess: mock_user.includes(user) ? true : false,
      msg: mock_user.includes(user) ? {} : `Invalid: Cannot find "${user}" in the database`,
      contents: null
    })

  })
  
  app.post('/user/signin', function (req, res) {
    const { user, password } = req.body
    // 1.   Query users database using the "user" variable
    // 2.a  Return an error if the user could not be found
    // 2.b  If the user is found un-hash the password using the jwt_secret key, then 
    //      compare password from database and password from request.
    // 3.a  If password is match generate a token then return it to the user inside content object.
    // 3.b  If password does not match return an error

    const mock_password_check = password == 'admin'
    // const token = jwtGenerator(user.id,process.env.JWT_SECRET)

    res.status(200).json({
      isSuccess: mock_password_check,
      msg: mock_password_check ? null : 'Password is incorrect',
      content: {
          token: mock_password_check ? 'nvoYkjsdfkjndkjhf2983475932rksdnf' : null,
          user
      }
    })

  })
}