const socket = io();
const list = document.querySelector('#movie-list')

socket.on('movie', movie => {
  console.log(movie)
  const liElement = document.createElement('li')
  liElement.innerHTML = movie.name
  liElement.classList.add('animate__animated')
  liElement.classList.add('animate__shakeX')
  list.appendChild(liElement)
})

const button = document.getElementById('button');

button.addEventListener('click', (e) => {
  e.preventDefault();
  console.log("click")
  socket.emit('more', null)
})