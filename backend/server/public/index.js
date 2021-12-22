const express = require('express')
const app = express()
const port = process.env.PUBLIC_SERVER_PORT

const auth_token = (req, res, next) => {
  // http://localhost/url/videos/sample.mp4?token="22teoasdakjdsvnkansdfsadf2"&&user_prefix="iadsjfh"
  console.log('this is auth_token', req.query.token, req.query.user_prefix)
  setTimeout(() => {
    console.log('authentication done!')
    next()
  },0)
}

// access for videos and images
app.use('/images', auth_token, express.static(__dirname + '/images'));
app.use('/videos', auth_token, express.static(__dirname + '/videos'));
app.use('/server_assets', auth_token, express.static(__dirname + '/server_assets'));

// for user related routes
const user = require('./user')
app.use(express.json())
user(app)

app.listen(port, () => {
  console.log(`\n ℹ Public app listening at http://backend:${port} \n`)
})