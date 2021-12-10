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
  
  app.post('/user/signin', async function (req, res) {
    const { user, password } = req.body
    // 1.   Query users database using the "user" variable
    // 2.a  Return an error if the user could not be found
    // 2.b  If the user is found un-hash the password using the jwt_secret key, then 
    //      compare password from database and password from request.
    // 3.a  If password is match generate a token then return it to the user inside content object.
    // 3.b  If password does not match return an error

    const JWT_SECRET = process.env.JWT_SECRET ||  'sample_jwt_secret_you_should_change_this'
    const TOKEN_EXPIRATION = '1hr'

    async function passwordIsValid () {
      return new Promise((resolve,reject) => {
        setTimeout(() => {
          resolve(password == 'admin')
        },3000)
      })
    }


    async function getUserId(user) {
      // query database
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve('sampleUserId')
        }, 5000)
      })
    }

    function generateToken(user_id,JWT_SECRET) {
      const payload = {
          user: user_id
      }
    
      return jwt.sign(payload, JWT_SECRET, {expiresIn: TOKEN_EXPIRATION})
    }

    res.status(200).json({
      isSuccess: await passwordIsValid(),
      msg: await passwordIsValid() ? null : 'Password is incorrect',
      content: {
          token: await passwordIsValid() ? generateToken(await getUserId(user),JWT_SECRET) : null,
          user
      }
    })

  })
}