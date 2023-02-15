const path = require('path')
const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const {Server} = require('socket.io');
const io = new Server(server)




// set static folder
const PORT = 3001 || process.env.PORT


app.use(express.static('public'))


//run when client connects

io.on('connection', (socket) =>{
    
    //welcome current user
    socket.emit('message', " welcome to chat app")

    // BroadCast when auser connets
    socket.broadcast.emit('message','A user has joined the chat')


    //runs when client disconnects
    socket.on('disconnect',()=>{
        io.emit('message', 'a user has left the chat')
    })
})


server.listen(PORT,()=>{
    console.log(`server listening to port ${PORT}`);
})

