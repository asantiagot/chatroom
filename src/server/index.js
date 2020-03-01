const app = require('./app');
const socket = require('socket.io');

const server = app.listen(app.get('port'), () => {
    console.log(`SERVER STARTED, listening on port ${app.get('port')}`);
});

const io = socket(server);
const dbOperations = require('../db/userDbOperations');
require('./sockets')(io);

// addUser
dbOperations.addUser('asantiagot15', 'welcomezzzz');