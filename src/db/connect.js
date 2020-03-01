const mongoose = require('mongoose');
const dburl = require('./constants');

// Connect to db
function connect() {
    return (mongoose.connect(dburl, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }));
}

module.exports = connect;