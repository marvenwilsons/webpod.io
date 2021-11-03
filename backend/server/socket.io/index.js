const express = require('express')
const app = express()
const socket = require('socket.io')

const port = process.env.port;
const host = process.env.host;
const server = app.listen(port, host)
const io = socket(server, { cookie: false})