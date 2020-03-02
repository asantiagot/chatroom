const messageDbOperations = require('../db/messageDbOperations');
const bot = require('../stockbot/bot');
const stock = '/stock=';

module.exports = io => {
    io.on('connection', async (socket) => {
        socket.on('chat', async (data) => {
            let message = data.message.trim();
            let isStockCommand = message.substr(0, stock.length) === stock ? true : false;
            if (isStockCommand) {
                let entity = message.slice(stock.length).trim();
                bot(entity);
            } else {
                let saveOperation = await messageDbOperations.saveMessage({
                    username: 'asantiagot',
                    message: message,
                    date: Date.now()
                });
                
                io.sockets.emit('chat', data);
            }
        });

        let messages = await messageDbOperations.getMessages();

        if (messages.length > 0) {
            io.sockets.emit('loadDbMessages', messages);
        }
    });
}