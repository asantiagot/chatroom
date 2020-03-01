const userModel = require('./userModel');
const mongoose = require('mongoose');
const dburl = require('./constants');

function connect() {
    return (mongoose.connect(dburl, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }));
        // .then(db => console.log(`connected to db`))
        // .catch(err => console.log(`an error occurred. See below: ${err}`)));
}

// Add user
function addUser (username, password) {
    connect()
        .then(async () => {
            try {
                await userModel.findOne({ username: username }).exec()
                    .then((doc) => {
                    if (doc === null) {
                        const newuser = new userModel({
                            username,
                            password
                        });
                        newuser.save(function (err) {
                            if (err) {
                                throw err;
                            }
                            console.log(`created user ${newuser.username} with password ${newuser.password}`);
                        });
                    }
                    else {
                        console.log(`user ${username} already exists`);
                    }
                })
            } catch (err) {
                throw (`Error retrieving document at getUser(${username}). Error: ${err}`);
            }
        })
        .catch(err => {
            console.log(`Error establishing connection to DB: ${err}`);
        });        
}

// Get user
function getUser(username) {
    connect()
        .then(async () => {
            try {
                const user = await userModel.findOne({ username: username }).exec(); //, function(err, doc) {
                return user;
            } catch (err) {
                return (`Error retrieving document at getUser(${username}). Error: ${err}`);
            }
            // .then((doc) => {
            //     console.log('Successful query. doc:');
            //     console.log(doc);
            //     return doc;
            // })
            // .catch(err => {
            //     console.log(`Error retrieving document at getUser(${username}). Error: ${err}`);
            // })
        })
        .catch(err => {
            console.log(`Error establishing connection to DB: ${err}`);
        });
}

module.exports = { addUser, getUser };