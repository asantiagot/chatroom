const socket = io.connect('http://localhost:4000')

let messageOutput = document.getElementById('messageOutput');
let messageInput = document.getElementById('messageInput')
let sendMessage = document.getElementById('sendMessage')

sendMessage.addEventListener('click', () => {
    socket.emit('chat', {
        message: messageInput.value,
        username: socket.id // username.value
    });
    messageInput.value = "";
});

socket.on('chat', data => {
    messageOutput.innerHTML += `<p><strong> ${data.username}</strong>: ${data.message}</p>`
})