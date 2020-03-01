const messageDbOperations = require('../db/messageDbOperations');

module.exports = io => {
    io.on('connection', async (socket) => {
        socket.on('chat', data => {
            io.sockets.emit('chat', data);
        });

        let messages = await messageDbOperations.getMessages();
        
        if (messages.length > 0) {
            io.sockets.emit('loadDbMessages', messages);
        }
    });
}