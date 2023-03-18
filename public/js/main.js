const socket = io();

const form = document.getElementById('chat-form')
const parentMessages = document.querySelector('.chat-messages')


const {username, room}= Qs.parse(location.search,{
  ignoreQueryPrefix:true
});

socket.emit('joinRoom',{username,room})


socket.on('roomUsers',(info)=>{
  outputRoomNames(info.room)
  outputUsers(info.users)
})

socket.on('message', (message) => {
  console.log(message);
  outputMessage(message)

parentMessages.scrollTop = parentMessages.scrollHeight
  
});



form.addEventListener('submit',(e)=>{
e.preventDefault()
const msg = e.target.elements.msg.value

socket.emit('chatMessage',msg)

e.target.elements.msg.value = ''
e.target.elements.msg.value.focus();
})

function outputMessage(message){
  const div = document.createElement('div')

  div.classList.add('message')

  div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
  <p class="text">
    ${message.message}
  </p>`
  parentMessages.append(div)
}

function outputRoomNames(room){

  document.getElementById('room-name').textContent = room

}


function outputUsers(users){
  const userss = users.map(user =>  `<li>${user.username}</li>`).join('')
  document.getElementById('users').innerHTML = userss

}



