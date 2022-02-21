const mock_user = ['admin','admin1']
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { query } = require('../postgres/db')

module.exports = (app) => {
  console.log('user route')
  app.get('/user/confirm_user', async function (req, res ) {
    /** purpose is to check the username or email from req.query if it exist */
    console.log(process.env)
    const { user } = req.query
    const r  = await query(`SELECT username FROM ${process.env.TABLE_PREFIX}users WHERE username = $1`, [user])


    res.status(200).json({
      isSuccess: r.rows.length != 0 ? true : false,
      msg: r.rows.length != 0 ? {} : `Invalid: Cannot find "${user}" in the database`,
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
    const db_user = await query(`SELECT * FROM ${process.env.TABLE_PREFIX}users WHERE username = $1`, [user])
    const { username, user_password, user_id} = db_user.rows[0]

    bcrypt.compare(password, user_password, function(err, hashIsValid) {
      console.log('ey', hashIsValid)
      if(hashIsValid === true) {
        console.log('yeah')

        const JWT_SECRET = process.env.JWT_SECRET ||  'sample_jwt_secret_you_should_change_this'
        const TOKEN_EXPIRATION = '1hr'

        function generateToken(user_id,JWT_SECRET) {
          const payload = {
              user: user_id
          }
        
          return jwt.sign(payload, JWT_SECRET, {expiresIn: TOKEN_EXPIRATION})
        }

        res.status(200).json({
          isSuccess: hashIsValid,
          msg: hashIsValid ? null : 'Password is incorrect',
          content: {
              token: hashIsValid ? generateToken(user_id,JWT_SECRET) : null,
              user: user_id
          }
        })

      } else {
        res.status(200).json({
          isSuccess: false,
          msg: 'Password is incorrect',
        })
      }
    });
  })
}