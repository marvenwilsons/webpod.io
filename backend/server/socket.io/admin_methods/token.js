const jwt = require('jsonwebtoken')

function verifyToken (token) {
  const payload = jwt.verify(token, process.env.JWT_SECRET)
  if(payload.user === user.id) {
      return true
  }
}

function generateToken(user_id,JWT_SECRET) {
  const payload = {
      user: user_id
  }

  return jwt.sign(payload, JWT_SECRET, {expiresIn: "1hr"})
}

module.exports = {
  verifyToken,
  generateToken
}