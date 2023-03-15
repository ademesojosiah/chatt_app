const socket = io();

const form = document.getElementById('chat-form')
const parentMessages = document.querySelector('.chat-messages')




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

  div.innerHTML = `<p class="meta">Brad <span>9:12pm</span></p>
  <p class="text">
    ${message}
  </p>`
  parentMessages.append(div)
}
