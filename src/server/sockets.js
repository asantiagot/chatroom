module.exports = io => {
    io.on('connection', (socket) => {
        // console.log('socket connection', socket.id);
    
        socket.on('chat', data => {
            io.sockets.emit('chat', data);
        })
    });
}