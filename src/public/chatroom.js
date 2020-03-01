const socket = io.connect('http://localhost:5000');

let messageOutput = document.getElementById('messageOutput');
let messageInput = document.getElementById('messageInput');
let sendMessage = document.getElementById('sendMessage');

sendMessage.addEventListener('click', () => {
    if (messageInput.value !== "") {
        socket.emit('chat', {
            message: messageInput.value,
            username: socket.id // username.value
        });
        messageInput.value = "";
    } 
});

socket.on('chat', data => {
    messageOutput.innerHTML += `<p><strong> ${data.username}</strong>: ${data.message}</p>`
});

socket.on('loadDbMessages', messages => {
    console.log(`messages length: ${messages.length}`);
    // console.log(`Keys: ${Object.keys(messages)}`);
    for(msg in messages) {
        messageOutput.innerHTML += `<p><strong> ${messages[msg].username}</strong>: ${messages[msg].message}</p>`
    };
    // messageOutput.innerHTML = `<p>Hey!!! hardcoded from server</p>`;
})