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
    let locale = navigator.language;
    let humanDate;
    for(msg in messages) {
        humanDate = new Date(messages[msg].date).toLocaleString(locale);
        messageOutput.innerHTML += `<p><strong> ${messages[msg].username}</strong> (${humanDate}): ${messages[msg].message}</p>`;
    };
})

if (messageOutput.children.length > 1) {
    messageOutput.removeChild(messageOutput.childNodes[0]);
}