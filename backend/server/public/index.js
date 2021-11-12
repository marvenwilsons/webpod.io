const express = require('express')
const app = express()
const path = require('path')
const port = process.env.PUBLIC_SERVER_PORT

const auth_token = (req, res, next) => {
  // http://localhost/url/videos/sample.mp4?token="22teoasdakjdsvnkansdfsadf2"&&user_prefix="iadsjfh"
  console.log('this is auth_token', req.query.token, req.query.user_prefix)
  setTimeout(() => {
    console.log('authentication done!')
    next()
  },3000)
}

app.use('/images', auth_token, express.static(__dirname + '/images'));
app.use('/videos', auth_token, express.static(__dirname + '/videos'));
// app.get('/images', (req, res) => {
//   res.sendFile(path.join(__dirname + '/images/'));
// })

app.listen(port, () => {
  console.log(`\n ℹ Public app listening at http://backend:${port} \n`)
})