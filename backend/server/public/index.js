const express = require('express')
const app = express()
const port = process.env.PUBLIC_SERVER_PORT
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`\n ℹ Public app listening at http://backend:${port} \n`)
})