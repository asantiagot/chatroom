const express = require('express');
const socket = require('socket.io');

const app = express();
const server = app.listen(4000, () => {
    console.log("now listening");
});

app.use(express.static('public'));

const io = socket(server);
io.on('connection', (socket) => {
    console.log('socket connection', socket.id);

    socket.on('chat', data => {
        io.sockets.emit('chat', data);
    })
});