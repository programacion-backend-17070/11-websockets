const socket = io()

const list = document.querySelector("#movie-list") // ul
const button = document.querySelector("#button") // button

socket.on("movie", (movie) => {
  console.log(movie)

  // crear un elemento li
  // agregarlo a ul

  const liElement = document.createElement("li")
  liElement.innerHTML = movie.name // <li>Shrek</li>
  liElement.classList.add("animate__animated")
  liElement.classList.add("animate__shakeX") // <li class="animate__animated animate__shakeX">Shrek</li>

  list.appendChild(liElement)
})

socket.on("new", data => alert(data))

button.addEventListener("click", (e) => {
  e.preventDefault()
  console.log("click")
  socket.emit("more", null)
})