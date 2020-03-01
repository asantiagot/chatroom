const messageModel = require('./messageModel');
const connect = require('./connect');

function getMessages() {
    return new Promise((resolve, reject) => {
        connect()
            .then(() => {
                // console.log(`connected to db`);
                messageModel.find(({}), (err, res) => {
                    if (err) {
                        // console.log(`error executing query`);
                        return reject(err);
                    }
                    // console.log(`successful query. results: ${res}`);
                    resolve(res);
                }).limit(50).sort('-date');
            })
            .catch(err => {
                throw (`Error establishing connection to DB: ${err}`);
            })    
    })
}

module.exports = { getMessages };