const express = require('express')
const { createServer } = require('node:http')
const { join } = require('node:path')
const { Server } = require('socket.io')

const app = express()

app.use(express.static('public'))

const server = createServer(app)
const io = new Server(server)

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, req.url))
})

io.on('connection', (socket) => {
    console.log('a user connected')
    socket.on('disconnect', () => {
        console.log('user disconnected')
    })

    socket.on('command', (cmd) => {
        console.log('command: ' + cmd)
        io.emit('command', cmd)
    })
})



server.listen(3000, () => {
    console.log('server running at http://localhost:3000')
})