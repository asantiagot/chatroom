const userModel = require('./userModel');
const connect = require('./connect');

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
                throw (`Error retrieving document at addUser(${username}). Error: ${err}`);
            }
        })
        .catch(err => {
            throw (`Error establishing connection to DB: ${err}`);
        });        
}

module.exports = { addUser };