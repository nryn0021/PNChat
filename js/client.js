const socket = io('http://localhost:8000');
//get DOM elements in rspective Js variables
const form = document.getElementById('send-form');
const messageInput = document.getElementById('msgINP')
const messageContainer = document.querySelector('.container')

var audio = new Audio('sound.mp3');

const append =(message, position)=>{  //Function which will append event info to the container
    const messageElement = document.createElement('div');
    messageElement.innerText= message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position == 'left'){
      audio.play();
    }

}
form.addEventListener('submit',(e)=>{     //If the form gets submitted, send server the message
  e.preventDefault();
  const message = messageInput.value;
  append(`You: ${message}`, 'right');
  socket.emit('send-msg', message);
  messageInput.value = ''
})
const name = prompt("Enter your name to Join this chat room");//Ask new user for their name and let the server know
socket.emit('new-user-joined', name);

socket.on('user-joined', name =>{   //If a new user joins,receive their name from the server
  append(`${name} joined the chat`, 'center')
})

socket.on('deliver-msg', data =>{   //If server sends a message, receive it
  append(`${data.name}: ${data.message}`, 'left')
})

socket.on('leave', name =>{         //If a user leave the chat, append the info to the container
  append(`${name} left the Chat Room`, 'center')
})