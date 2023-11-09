const socket = io('http://localhost:8000');

const form = document.getElementById('send-form');
const messageInput = document.getElementById('msgINP')
const messageContainer = document.querySelector('.container')

var audio = new Audio('sound.mp3');

const append =(message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText= message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position == 'left'){
      audio.play();
    }

}
form.addEventListener('submit',(e)=>{
  e.preventDefault();
  const message = messageInput.value;
  append(`You: ${message}`, 'right');
  socket.emit('send-msg', message);
  messageInput.value = ''
})
const name = prompt("Enter your name to Join this chat room");
socket.emit('new-user-joined', name);

socket.on('user-joined', name =>{
  append(`${name} joined the chat`, 'left')
})

socket.on('deliver-msg', data =>{
  append(`${data.name}: ${data.message}`, 'left')
})

socket.on('leave', name =>{
  append(`${name} left the Chat Room`, 'left')
})