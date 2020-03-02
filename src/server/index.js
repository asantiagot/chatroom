const app = require('./app');
const socket = require('socket.io');

const server = app.listen(app.get('port'), () => {
    console.log(`SERVER STARTED, listening on port ${app.get('port')}`);
});

const io = socket(server);
require('./sockets')(io);