const express = require("express");
const http = require("http");
const app = express();

/**
* Create HTTP server and start the connect the socket
*/
const api = require('./server/routes/api');
const server = http.createServer(app);
// Socket.io for real time communication

var io = require("socket.io").listen(server);

io.sockets.on("connection", socket=>{
    socket.on(searchTweets, tweets=>{
    io.emit("searchTweets", tweets);
  });
});