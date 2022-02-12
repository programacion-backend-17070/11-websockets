const http = require('http')
const path = require('path')
const express = require('express')
const app = express()
const server = http.createServer(app)
const { Server } = require("socket.io");
const io = new Server(server);

app.use("/static", express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')))

io.on('connection', (socket) => {
  console.log(`a user connected: ${socket.id}`);
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.emit("m", "hola")
});

server.listen(8080, () => console.log('listening on http://localhost:8080'))
