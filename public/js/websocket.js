const socket = io();
console.log(socket)

socket.on('m', data => {
  alert(data)
})
