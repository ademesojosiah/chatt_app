const path = require('path')
const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const {Server} = require('socket.io');
const io = new Server(server)
const {formatMessage} = require('./utils/messages')



// set static folder
const PORT = 3009 || process.env.PORT


app.use(express.static('public'))

const botName = 'bando'

//run when client connects

io.on('connection', (socket) =>{
    
    //welcome current user
    socket.emit('message',formatMessage(botName, " welcome to chat app"))

    // BroadCast when auser connets
    socket.broadcast.emit('message',formatMessage(botName,'A user has joined the chat'))


    //listen to event
    socket.on('chatMessage',(msg=>{
        socket.emit('message',formatMessage('jojo',msg))
    }))

    //runs when client disconnects
    socket.on('disconnect',()=>{
        io.emit('message',formatMessage(botName, 'a user has left the chat'))
    })
})


server.listen(PORT,()=>{
    console.log(`server listening to port ${PORT}`);
})

