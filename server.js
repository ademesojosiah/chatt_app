const path = require("path");
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const { formatMessage } = require("./utils/messages");
const {
  joinUser,
  findUser,
  getRoomUsers,
  leaveUser,
} = require("./utils/users");

// set static folder
const PORT = 3009 || process.env.PORT;

app.use(express.static("public"));

const botName = "bando";

//run when client connects

io.on("connection", (socket) => {
  socket.on("joinRoom", ({ username, room }) => {
    const user = joinUser(socket.id, username, room);

    socket.join(user.room);

    //welcome current user
    socket.emit("message", formatMessage(botName, " welcome to chat app"));

    // BroadCast when a user connets
    socket.broadcast
      .to(user.room)
      .emit(
        "message",
        formatMessage(botName, `${user.username} has joined the chat`)
      );


    io.to(user.room).emit('roomUsers', {
        room:user.room,
          users: getRoomUsers(user.room)
      })
  });

  //listen to message event
  socket.on("chatMessage", (msg) => {
    const user = findUser(socket.id);

    io.to(user.room).emit("message", formatMessage(user.username, msg));
  });

  //runs when client disconnects
  socket.on("disconnect", () => {
    const user = leaveUser(socket.id);

    if (user) {
      io.to(user.room).emit(
        "message",
        formatMessage(botName, `${user.username} has left the chat`)
      );


      io.to(user.room).emit('roomUsers', {
        room:user.room,
          users: getRoomUsers(user.room)
      })
    }
  });
});

server.listen(PORT, () => {
  console.log(`server listening to port ${PORT}`);
});
