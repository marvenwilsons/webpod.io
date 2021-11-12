const express = require('express')
const app = express()
const path = require('path')
const port = process.env.PUBLIC_SERVER_PORT

// app.use(express.static(__dirname + '/html'));
app.get('/', (req, res) => {
  // res.sendFile(path.join(__dirname + '/index.html'));
  res.send('')
})

app.listen(port, () => {
  console.log(`\n ℹ Public app listening at http://backend:${port} \n`)
})