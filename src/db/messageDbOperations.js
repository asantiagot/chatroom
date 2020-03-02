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

function saveMessage(data) {
    return new Promise((resolve, reject) => {
        connect()
            .then(() => {
                let message = new messageModel({
                    message: data.message,
                    username: data.username, 
                    date: data.date
                });
                message.save((err, res) => {
                    if (err) {
                        return reject(`Error saving message to db: ${err}`);
                    }
                    resolve(`Successfully saved message to DB! ${res}`);
                })
            })
            .catch(err => {
                throw (`Error establishing connection to DB: ${err}`);
            })    
    })
}

module.exports = { getMessages, saveMessage };