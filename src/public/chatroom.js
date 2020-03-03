import { request } from "express";

const socket = io.connect('http://localhost:5000');

let messageOutput = document.getElementById('messageOutput');
let messageInput = document.getElementById('messageInput');
let sendMessage = document.getElementById('sendMessage');

let locale = navigator.language;

sendMessage.addEventListener('click', () => {
    if (messageInput.value !== "") {
        socket.emit('chat', {
            message: messageInput.value,
            username: request.session.userSessionId, //socket.id,
            date: Date.now()
        });
        messageInput.value = "";
    } 
});

socket.emit('first login');

socket.on('chat', data => {
    let humanDate = new Date(data.date).toLocaleString(locale);
    let color = data.username === 'stockbot' ? 'green' : 'black';
    console.log(`color: ${color}`);
    messageOutput.innerHTML += `<p><font color="${color}"><strong>${data.username}</strong></font> (${humanDate}): ${data.message}</p>`;
});

socket.on('loadDbMessages', messages => {
    let humanDate;
    for(msg in messages) {
        humanDate = new Date(messages[msg].date).toLocaleString(locale);
        messageOutput.innerHTML += `<p><strong> ${messages[msg].username}</strong> (${humanDate}): ${messages[msg].message}</p>`;
    };
});

if (messageOutput.children.length > 100) {
    messageOutput.removeChild(messageOutput.childNodes[0]);
}