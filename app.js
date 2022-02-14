const express = require('express');
const path = require('path')
const http = require('http')
const { Server } = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = new Server(server)
const movies = [
  { id: 1, name: 'Joker' },
  { id: 2, name: 'Good Fellas' },
  { id: 3, name: 'Matrix' },
  { id: 4, name: 'Shrek' },
  { id: 5, name: 'Memento' },
  { id: 6, name: 'The Grand Hotel Budapest' },
  { id: 7, name: 'Star Wars' },
  { id: 8, name: 'The Avengers' },
  { id: 9, name: 'Interstellar' },
  { id: 10, name: 'Harry Potter' },
  { id: 11, name: 'The departed' },
  { id: 12, name: 'Spiderman' },
  { id: 13, name: 'Pulp Fiction' },
  { id: 14, name: 'Jackass' }
];

app.use("/static", express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')))

const socketPool = {}

io.on('connection', (socket) => {
  console.log(`an user connected: ${socket.id}`)
  io.sockets.emit("new", "un nuevo usuario se conecto")
  socketPool[socket.id] = 0
  // {
  //  wBkrbc9HGnOrdbLBAAAB: 0
  // }
  const time = 1000
  // for(let i = 0; i < 3; i++) {
  //   // 0, 1, 2
  //   // setTimeout(() => socket.emit("movie", movies[i]), time * (i + 1))
  // }
  let i = 0
  setInterval(() => {
    if (i < 3) socket.emit("movie", movies[i]);
    else return;
    i = i + 1;
    socketPool[socket.id] = i
  }, time * (i + 1));

  socket.on("more", () => {
    console.log(socketPool[socket.id]) // 2
    const i = socketPool[socket.id]
    const next = i + 1
    setTimeout(() => socket.emit("movie", movies[next]), 1000)
    socketPool[socket.id] = next

    /// await DB.getAll()
  })
})

server.listen(8080, () => console.log(`listening on http://localhost:8080`))

