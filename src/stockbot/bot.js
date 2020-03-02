const axios = require('axios').default;
const io = require('socket.io-client');

function requestStock (stockCode) {
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
            if (response.data !== null) {
                const data = response.data.split('\r\n')[1];        // TODO: if there's time, implement this parsing differently
                const val = data.split(',');
                const closingValue = val[6];
                if (closingValue === 'N/D') {
                    console.log(`The stock entity is invalid`);
                    return null;
                } else {
                    const stockMessage = `${val[0]} quote is $${val[6]} per share`;         // TODO: if there's time, implement this parsing differently
                    console.log(stockMessage);
                    // return stockMessage;
                    socket.emit('chat', {username: 'stockbot', date: Date.now, message: stockMessage});
                }

            } else {
                console.log(`The data received is null`);
                throw `The data received is null`;
            }
        })
        .catch((error) => {
            throw `Error occurred while retrieving stock data: ${error}`;
    });  

}

module.exports = requestStock;