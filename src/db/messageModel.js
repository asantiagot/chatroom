const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    username: { type: String, required: true, index: { unique: false} },
    message: { type: String, required: true },
    date: { type: Date, required: true}
});

module.exports = mongoose.model('Message', messageSchema);