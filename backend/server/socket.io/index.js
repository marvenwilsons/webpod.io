const express = require('express')
const app = express()
const socket = require('socket.io')

const port = process.env.PORT || 8000;
const host = process.env.HOST || 'localhost';

app.get('/', (req,res) => {
  console.log('hello world')
  res.status(200).json({
    status: 'success'
  })
})
const server = app.listen(port, host, () => 
{console.log(`ℹ Listening on: http://${host}:${port}`)})
const io = socket(server, { cookie: false})

module.exports = io