/*
/ Author: Loren Cerri
/ Date: 5/20/2018
/
/ This program is a basic chat application with join & send/recieve messages
/ Although, it contains no styling.
/
*/

// Require Packages
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = process.env.PORT;

// Listen To Port
server.listen(port, function() {
  console.log('Listening at port', port);
});

// Routing
app.use(express.static('public'));

// Pages 
app.get("/", function(request, response) {
  response.sendFile(__dirname + '/public/index.html');
});

// Socket.io Connections
io.on('connection', function(socket) {

  // This will have two primary functions
  // -> Choosing Username
  // -> Sending & Recieving Messages
  
  socket.on('setUsername', function(username) {
    socket.broadcast.emit('announceJoin', username);
  });
  
  socket.on('message', function(data) {
    socket.broadcast.emit('message', data)
  });
  
});