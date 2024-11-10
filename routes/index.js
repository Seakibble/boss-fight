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

let volume = 1
let storedVolume = 1

let tokens = []
let active = 0
io.on('connection', (socket) => {
    console.log('a user connected')
    socket.emit('command', 'vol ' + volume)
    socket.on('disconnect', () => {
        console.log('user disconnected')
    })

    socket.on('command', (cmd) => {
        console.log('command: ' + cmd)
        

        let components = cmd.split(' ')

        switch (components[0]) {
            case 'vol':
                console.log('volume is now ' + components[1])
                volume = components[1]
                storedVolume = volume
                io.emit('command', 'vol ' + volume)
                break
            case 'mute':
                console.log('volume is now 0')
                storedVolume = volume
                volume = 0
                io.emit('command', 'vol ' + volume)
                break
            case 'unmute':
                volume = storedVolume
                console.log('volume is now ' + volume)                
                io.emit('command', 'vol ' + volume)
                break
            default: 
                io.emit('command', cmd)
        }
    })


    socket.on('commandInit', (cmd) => {
        console.log('commandInit: ' + cmd)
        switch(cmd) {
            case 'clear': 
                tokens=[]
                io.emit('setInitiative', null)
                break
            case 'get': 
                socket.emit('setInitiative', tokens)
                io.emit('setActive', active)
                break
            case 'next':                 
                active++
                if (active >= tokens.length) {
                    active = 0
                }
                io.emit('setActive', active)
                break
        }
    })
    socket.on('removeToken', (index) => {
        console.log('Removing: ' + index)
        tokens.splice(index, 1)
        if (index <= active) {
            active -= 1
            if (active < 0) {
                active = 0
            }
        }
        io.emit('setInitiative', tokens)
        io.emit('setActive', active)
    })
    socket.on('addInitiative', (token) => {
        console.log('Initiative: ' + token.name + ', ' + token.init)
        tokens.push(token)
        tokens = tokens.sort((a,b)=>{
            return b.init - a.init
        })
        console.log(tokens, "ACTIVE: " + active)
        io.emit('setInitiative', tokens)
        io.emit('setActive', active)
    })


    socket.on('commandInit', (cmd) => {
        console.log('commandInit: ' + cmd)
        switch(cmd) {
            case 'clear': 
                tokens=[]
                io.emit('setInitiative', null)
                break
            case 'get': 
                socket.emit('setInitiative', tokens)
                io.emit('setActive', active)
                break
            case 'next':                 
                active++
                if (active >= tokens.length) {
                    active = 0
                }
                io.emit('setActive', active)
                break
        }
    })
    socket.on('removeToken', (index) => {
        console.log('Removing: ' + index)
        tokens.splice(index, 1)
        if (index <= active) {
            active -= 1
            if (active < 0) {
                active = 0
            }
        }
        io.emit('setInitiative', tokens)
        io.emit('setActive', active)
    })
    socket.on('addInitiative', (token) => {
        console.log('Initiative: ' + token.name + ', ' + token.init)
        tokens.push(token)
        tokens = tokens.sort((a,b)=>{
            return b.init - a.init
        })
        console.log(tokens, "ACTIVE: " + active)
        io.emit('setInitiative', tokens)
        io.emit('setActive', active)
    })
})



server.listen(3000, () => {
    console.log('server running at http://localhost:3000')
})