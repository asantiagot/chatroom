const axios = require('axios').default;
const io = require('socket.io-client');

function requestStock (stockCode) {
    // const url = `${process.env.SERVER_PROTOCOL}://${process.env.SERVER_URL}:${process.env.SERVER_PORT}`;
    const url = 'http://localhost:5000';
    const socket = io(url, {
        secure: process.env.SERVER_PROTOCOL === 'https',
        reconnection: true,
        rejectUnauthorized: false,
        port: 5000
    });

    const stockService = `https://stooq.com/q/l/?s=${stockCode}&f=sd2t2ohlcv&h&e=csv`;
    axios.get(stockService)
        .then((response) => {
            console.log(`stock request fulfilled. response: `);
            console.log(response);
            
            // return response;
        })
        .catch((error) => {
            throw `${err}`;
    });

    socket.emit('chat', {username: 'bot', message: 'bot is here'});
    

}

module.exports = requestStock;